// Client behavior that the prototype implemented with React state
// (renderVals() in project/JBG Homepage.dc.html). Hooks are data-* attributes
// emitted by tools/convert.mjs.
import { submitForm } from './forms';

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

// --- Mobile menu ------------------------------------------------------------
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
$$('[data-act="menu"]').forEach((b) => {
  b.setAttribute('aria-expanded', 'false');
  b.addEventListener('click', () => {
    if (!menu) return;
    menu.hidden = !menu.hidden;
    b.setAttribute('aria-expanded', String(!menu.hidden));
  });
});

// --- Reviews: "See more" and "Load more" -----------------------------------
document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLElement>('[data-act="rev-toggle"]');
  if (!btn) return;
  const text = btn.closest('[data-item]')?.querySelector<HTMLElement>('[data-full]');
  if (!text) return;
  if (!text.dataset.short) text.dataset.short = text.textContent ?? '';
  const open = btn.dataset.open === '1';
  text.textContent = open ? text.dataset.short : text.dataset.full ?? '';
  btn.dataset.open = open ? '0' : '1';
  btn.textContent = open ? 'See more' : 'See less';
});

// Same truncation as src/data/vals.ts (homepage cards only).
const shortReview = (t: string) => (t.length > 260 ? t.slice(0, 240).replace(/\s+\S*$/, '') + '…' : t);
let allReviews: Promise<{ name: string; text: string }[]> | null = null;

$$('[data-act="more"]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const list = btn.dataset.list!;
    const step = Number(btn.dataset.step) || 6;
    const items = $$(`[data-item="${list}"]`);
    const template = items[0];
    if (!template) return;
    allReviews ??= fetch('/reviews.json').then((r) => r.json());
    const reviews = await allReviews;
    const truncate = list === 'visibleReviews';
    const frag = document.createDocumentFragment();
    for (const r of reviews.slice(items.length, items.length + step)) {
      const card = template.cloneNode(true) as HTMLElement;
      card.querySelector('[data-name]')!.textContent = r.name;
      const text = card.querySelector<HTMLElement>('[data-text]')!;
      const toggle = card.querySelector<HTMLElement>('[data-act="rev-toggle"]');
      const long = truncate && r.text.length > 260;
      text.textContent = long ? shortReview(r.text) : r.text;
      delete text.dataset.short;
      if (long) text.dataset.full = r.text; else delete text.dataset.full;
      if (toggle) {
        if (long) { toggle.textContent = 'See more'; toggle.dataset.open = '0'; } else toggle.remove();
      } else if (long) {
        // Template card was short; borrow a rendered toggle (keeps its generated hover class).
        const src = document.querySelector('[data-act="rev-toggle"]');
        const b = (src?.cloneNode(true) as HTMLElement | undefined) ?? document.createElement('button');
        if (!src) {
          b.dataset.act = 'rev-toggle';
          b.style.cssText = "margin-top:10px;padding:0;border:none;background:none;cursor:pointer;font-family:'Lato',sans-serif;font-weight:700;font-size:14px;color:#716558";
        }
        b.textContent = 'See more';
        b.dataset.open = '0';
        text.after(b);
      }
      frag.append(card);
    }
    items[items.length - 1].after(frag);
    const shown = items.length + Math.min(step, Math.max(0, reviews.length - items.length));
    btn.closest('section')?.querySelectorAll('[data-shown]').forEach((s) => { s.textContent = String(shown); });
    if (shown >= reviews.length) btn.hidden = true;
  });
});

// --- Services hero: rotating "We're great at" word --------------------------
const rot = $$('[data-rot]');
if (rot.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % rot.length;
    rot.forEach((item, j) => {
      const word = item.firstElementChild as HTMLElement | null;
      if (!word) return;
      const on = i === j;
      word.style.fontWeight = on ? '900' : '500';
      word.style.color = on ? '#fff' : '#D9CFC6';
      word.style.borderBottomColor = on ? '#BD1E2D' : 'transparent';
    });
  }, 1800);
}

// --- Forms --------------------------------------------------------------------
const REQUIRED = 'This field is required.';
const BAD_EMAIL = 'Please enter a valid email address.';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BORDER = '#C9BFB5';
const BORDER_ERR = '#BD1E2D';

/** Option groups rendered as buttons: data-item -> submitted field name. */
const GROUPS: Record<string, string> = { wtOpts: 'wt', cmOpts: 'method' };

function setError(form: HTMLFormElement, key: string, msg: string) {
  const err = form.querySelector<HTMLElement>(`[data-err="${key}"]`);
  if (err) { err.textContent = msg; err.hidden = !msg; }
  const field = form.querySelector<HTMLElement>(`[name="${key}"]`);
  if (field && field.style.borderColor) field.style.borderColor = msg ? BORDER_ERR : BORDER;
}

$$('[data-act="pick"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.item!;
    const form = btn.closest('form') as HTMLFormElement;
    $$(`[data-item="${group}"]`, form).forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-pressed', String(on));
      b.style.borderColor = on ? '#716558' : BORDER;
      b.style.background = on ? '#716558' : '#fff';
      b.style.color = on ? '#fff' : '#2B2622';
      b.querySelector('svg')?.setAttribute('stroke', on ? '#fff' : '#716558');
    });
    form.dataset[GROUPS[group]] = btn.dataset.val;
    setError(form, GROUPS[group], '');
  });
});

// Clear a field's error as soon as it is edited (prototype: onChange).
$$<HTMLFormElement>('form[data-form]').forEach((form) => {
  form.addEventListener('input', (e) => {
    const name = (e.target as HTMLInputElement).name;
    if (name) setError(form, name, '');
  });
});

// File picker + drag and drop on the quote form.
const fileInput = document.querySelector<HTMLInputElement>('[data-files]');
const fileList = document.querySelector<HTMLElement>('[data-file-list]');
function showFiles() {
  if (!fileInput || !fileList) return;
  fileList.replaceChildren(...Array.from(fileInput.files ?? []).map((f) => {
    const s = document.createElement('span');
    s.style.cssText = 'font-size:15px;font-weight:700;color:#716558';
    s.textContent = f.name;
    return s;
  }));
}
fileInput?.addEventListener('change', showFiles);
const drop = document.querySelector<HTMLElement>('[data-drop]');
drop?.addEventListener('dragover', (e) => e.preventDefault());
drop?.addEventListener('drop', (e) => {
  e.preventDefault();
  if (fileInput && e.dataTransfer?.files.length) { fileInput.files = e.dataTransfer.files; showFiles(); }
});

type Rules = { required: string[]; groups: string[]; email: 'required' | 'optional' };
const RULES: Record<string, Rules> = {
  // Prototype qSubmit: work type, street, ZIP and service are required; email is checked only if given.
  quote: { required: ['street', 'zip', 'service'], groups: ['wt'], email: 'optional' },
  // Prototype cSubmit: everything is required.
  contact: { required: ['first', 'last', 'phone', 'email', 'message'], groups: ['method'], email: 'required' },
};

function validate(form: HTMLFormElement, rules: Rules) {
  const data = new FormData(form);
  const errors: Record<string, string> = {};
  for (const g of rules.groups) if (!form.dataset[g]) errors[g] = REQUIRED;
  for (const k of rules.required) if (!String(data.get(k) ?? '').trim()) errors[k] = REQUIRED;
  const email = String(data.get('email') ?? '').trim();
  if (!errors.email && email && !EMAIL_RE.test(email)) errors.email = BAD_EMAIL;
  for (const g of rules.groups) setError(form, g, errors[g] ?? '');
  for (const el of $$<HTMLInputElement>('[name]', form)) if (el.name !== 'files') setError(form, el.name, errors[el.name] ?? '');
  return errors;
}

async function send(form: HTMLFormElement, kind: string) {
  const data = new FormData(form);
  for (const g of Object.values(GROUPS)) if (form.dataset[g]) data.set(g === 'wt' ? 'work_type' : 'contact_method', form.dataset[g]!);
  const button = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (button) button.disabled = true;
  try {
    await submitForm(kind, data);
    return true;
  } catch (err) {
    console.error(err);
    alert('Sorry, we could not send your request. Please call us at (979) 777-4420.');
    return false;
  } finally {
    if (button) button.disabled = false;
  }
}

$$<HTMLFormElement>('form[data-form]').forEach((form) => {
  const kind = form.dataset.form!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (kind === 'cta') {
      // CTA band form: native required-field validation, then an inline thank-you.
      if (!(await send(form, kind))) return;
      const box = form.closest('[data-state="form"]')?.parentElement;
      box?.querySelector<HTMLElement>('[data-state="sent"]')?.removeAttribute('hidden');
      box?.querySelector<HTMLElement>('[data-state="form"]')?.setAttribute('hidden', '');
      return;
    }
    const errors = validate(form, RULES[kind]);
    if (Object.keys(errors).length) {
      const first = form.querySelector<HTMLElement>('[data-err]:not([hidden])');
      first?.parentElement?.scrollIntoView({ block: 'center' });
      return;
    }
    if (await send(form, kind)) location.href = '/thank-you/';
  });
});
