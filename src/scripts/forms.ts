// Form submission: every form posts multipart/form-data to the Cloudflare
// Pages Function at /api/submit (functions/api/submit.js), which emails the
// lead through Resend. PUBLIC_FORM_ENDPOINT can override the endpoint.
export const FORM_ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT || '/api/submit';

// Honeypot + fill-time spam checks (see functions/api/submit.js).
const STARTED = Date.now();
document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  const trap = document.createElement('div');
  trap.setAttribute('aria-hidden', 'true');
  trap.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden';
  trap.innerHTML = '<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
  form.appendChild(trap);
});

export async function submitForm(kind: string, data: FormData): Promise<void> {
  data.set('form', kind); // "quote" | "contact" | "cta"
  data.set('page', location.pathname);
  data.set('_t', String(STARTED));
  data.delete('files'); // attachments are not emailed
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', { method: 'contact_form', form_id: kind, page_path: location.pathname, transport_type: 'beacon' });
  }
}
