// Form submission stub.
//
// The Request a Quote, Contact Us and CTA-band forms all post here. Set
// PUBLIC_FORM_ENDPOINT (see .env.example) to any endpoint that accepts a
// multipart POST, e.g. Formspree, Basin, Netlify/Cloudflare function or a
// WordPress handler. Until then submissions are logged to the console only
// and the visitor still sees the thank-you state, as in the prototype.
export const FORM_ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';

export async function submitForm(kind: string, data: FormData): Promise<void> {
  data.set('form', kind); // "quote" | "contact" | "cta"
  if (!FORM_ENDPOINT) {
    console.info(`[forms] PUBLIC_FORM_ENDPOINT is not set; "${kind}" submission was not sent.`, Object.fromEntries(data));
    return;
  }
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
}
