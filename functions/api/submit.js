/**
 * Cloudflare Pages Function: POST /api/submit
 *
 * Delivers JBG Plumbing website form requests (contact, CTA band, quote)
 * through Resend.
 *   From: JBG Plumbing Website <leads@newleadrelay.com>
 *   Live site (bcsplumber.com): to jordan@ and brad@jbgplumbingtx.com,
 *     bcc our internal lead backup.
 *   Any other host (pages.dev previews): internal backup address ONLY, so
 *     tests never reach the client.
 * The request body is never used for to, cc, bcc, or from.
 *
 * Spam: hidden honeypot field (website) plus a minimum fill time; bot hits
 * get a fake {ok:true} and nothing is sent.
 *
 * Env: RESEND_API_KEY (secret). If it is missing or the send fails, this
 * returns an error so the front end does not show success.
 */

const LIVE_HOSTS = new Set(['bcsplumber.com', 'www.bcsplumber.com']);
const CLIENT_TO = ['jordan@jbgplumbingtx.com', 'brad@jbgplumbingtx.com'];
const INTERNAL_COPY = 'lwa.assistant@mail.grokbot.com';
const MAIL_FROM = 'JBG Plumbing Website <leads@newleadrelay.com>';

const FORM_NAMES = { contact: 'Contact form', cta: 'Quick quote form', quote: 'Quote request form' };

const FIELD_LABELS = {
  name: 'Name',
  first: 'First Name',
  last: 'Last Name',
  phone: 'Phone',
  email: 'Email',
  contact_method: 'Preferred Contact Method',
  work_type: 'Work Type',
  service: 'Service',
  street: 'Street Address',
  zip: 'ZIP',
  message: 'Message',
  details: 'Details',
  page: 'Page',
};

const IGNORED = new Set(['to', 'cc', 'bcc', 'from', 'recipient', 'recipients', 'mail_to', 'mail_from', 'reply_to']);
const HONEYPOT = 'website';
const MIN_FILL_MS = 2500;
const MAX_LEN = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sameOrigin(request) {
  const self = new URL(request.url).origin;
  const origin = request.headers.get('Origin');
  if (origin) return origin === self;
  try {
    return new URL(request.headers.get('Referer') || '').origin === self;
  } catch {
    return false;
  }
}

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  const data = {};
  if (type.includes('application/json')) {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid');
    for (const [k, v] of Object.entries(parsed)) if (typeof v === 'string' || typeof v === 'number') data[k] = String(v);
    return data;
  }
  const form = await request.formData();
  for (const [k, v] of form.entries()) if (typeof v === 'string') data[k] = v;
  return data;
}

const trimField = (v) => String(v || '').trim().slice(0, MAX_LEN);

function buildEmail(data, kind, isTest) {
  const name = trimField(data.name) || [trimField(data.first), trimField(data.last)].filter(Boolean).join(' ') || 'no name';
  const subject = (isTest ? '[TEST] ' : '') + 'New website lead from ' + name + ' (' + (FORM_NAMES[kind] || 'Website form') + ')';
  const keys = Object.keys(FIELD_LABELS).filter((k) => trimField(data[k]) !== '');
  const rows = keys
    .map((k) =>
      '<tr><td style="padding:6px 14px 6px 0;color:#716558;font:13px/1.5 Helvetica,Arial,sans-serif;white-space:nowrap;vertical-align:top">' +
      escapeHtml(FIELD_LABELS[k]) +
      '</td><td style="padding:6px 0;color:#2B2622;font:14px/1.5 Helvetica,Arial,sans-serif">' +
      escapeHtml(trimField(data[k])).replace(/\n/g, '<br>') +
      '</td></tr>')
    .join('');
  const text = keys.map((k) => FIELD_LABELS[k] + ': ' + trimField(data[k])).join('\n');
  const html =
    '<div style="background:#F4F1EE;padding:24px">' +
    '<h1 style="font:700 20px/1.3 Helvetica,Arial,sans-serif;color:#2B2622;margin:0 0 6px">New website lead</h1>' +
    '<p style="font:13px/1.5 Helvetica,Arial,sans-serif;color:#716558;margin:0 0 16px">' + escapeHtml(FORM_NAMES[kind] || 'Website form') + ' on bcsplumber.com</p>' +
    '<table cellpadding="0" cellspacing="0">' + rows + '</table></div>';
  return { subject, html, text };
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json(403, { error: 'forbidden' });

  let data;
  try {
    data = await readBody(request);
  } catch {
    return json(400, { error: 'invalid_body' });
  }
  for (const k of IGNORED) delete data[k];

  // Spam: honeypot filled, or submitted faster than a person can type.
  const started = Number(data._t || 0);
  if (trimField(data[HONEYPOT]) || !started || Date.now() - started < MIN_FILL_MS) {
    return json(200, { ok: true });
  }

  const kind = FORM_NAMES[data.form] ? data.form : 'contact';
  const email = trimField(data.email);
  const phone = trimField(data.phone);
  if (!phone && !email) return json(400, { error: 'missing_fields' });
  if (email && !EMAIL_RE.test(email)) return json(400, { error: 'invalid_email' });

  if (!env.RESEND_API_KEY) return json(503, { error: 'email_not_configured' });

  const isLive = LIVE_HOSTS.has(new URL(request.url).hostname);
  const { subject, html, text } = buildEmail(data, kind, !isLive);
  const payload = isLive
    ? { from: MAIL_FROM, to: CLIENT_TO, bcc: [INTERNAL_COPY], subject, html, text }
    : { from: MAIL_FROM, to: [INTERNAL_COPY], subject, html, text };
  if (email) payload.reply_to = email;

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return json(502, { error: 'send_failed' });
  }
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true });
}

export const onRequestGet = () => json(405, { error: 'method_not_allowed' });
