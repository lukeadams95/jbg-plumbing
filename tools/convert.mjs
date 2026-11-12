#!/usr/bin/env node
// Converts the Claude Design prototype (design/project/JBG Homepage.dc.html) into
// Astro components under src/components/generated/.
//
// The prototype is a single Design Components file: an HTML template with
// {{ bindings }}, <sc-if>/<sc-for> blocks, style-hover/style-focus attributes
// and React event handlers, driven by a renderVals() class. This script maps
// that template onto static Astro markup:
//   * page <sc-if isX> blocks      -> one component per page
//   * width-dependent bindings     -> CSS variables (src/styles/responsive.css)
//   * isMobile / isDesktop blocks  -> .bp-* wrappers toggled by media queries
//   * style-hover / style-focus    -> generated classes (src/styles/generated.css)
//   * event handlers               -> data-* hooks for src/scripts/site.ts
//   * hash routes (#/about-us/)    -> real paths (/about-us/)
// Re-run with `npm run convert` after re-exporting the design.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'htmlparser2';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.argv[2] || join(ROOT, 'design', 'project', 'JBG Homepage.dc.html');
const OUT = join(ROOT, 'src', 'components', 'generated');

let html = readFileSync(SRC, 'utf8');
const start = html.indexOf('<x-dc>') + '<x-dc>'.length;
const end = html.indexOf('</x-dc>');
let tpl = html.slice(start, end);

// The CTA badge is rendered twice (mobile + desktop variants); both are now in
// the DOM at once, so the desktop copy needs its own SVG path id.
tpl = tpl.replace(/(<sc-if value="\{\{ ctaDesk \}\}">[\s\S]*?<\/sc-if>)/, (m) => m.replace(/ctaRing/g, 'ctaRingD'));

const PAGES = {
  isHome: ['home', 'Home'], isAbout: ['about', 'About'], isLocations: ['locations', 'Locations'],
  isProjects: ['projects', 'Projects'], isQuote: ['quote', 'Quote'], isReviews: ['reviews', 'Reviews'],
  isServices: ['services', 'Services'], isGrease: ['grease', 'GreaseTrap'], isExp: ['expansion', 'ExpansionTank'],
  isBackflow: ['backflow', 'Backflow'], isBoilers: ['boilers', 'Boilers'], isGas: ['gasline', 'GasLine'],
  isSump: ['sump', 'SumpPump'], isWH: ['heaters', 'WaterHeaters'], isSewer: ['sewer', 'SewerDrainSeptic'],
  isLeak: ['leak', 'LeakDetection'], isPressure: ['pressure', 'WaterPressure'], isToilets: ['toilets', 'ToiletsFaucets'],
  isContact: ['contact', 'Contact'], isTerms: ['terms', 'Terms'], isPrivacy: ['privacy', 'Privacy'], isThanks: ['thanks', 'ThankYou'],
};

// Bindings that depend on viewport width in the prototype -> CSS variables.
const RESPONSIVE = new Set(['svcCols', 'svcGap', 'svcImgH', 'svcPull', 'svcPad', 'svcInner', 'svcIconBox', 'svcIconTop', 'svcName', 'svcCta',
  'cwCols', 'cfCols', 'fb3', 'gt2', 'brandCols', 'gtCols', 'featCols', 'revCols', 'qCols', 'qPair', 'qAddr', 'ctaPad', 'ctaCols',
  'clipSlant', 'slantPull', 'footGrid']);
// Bindings whose value is an SVG string.
const isIcon = (p) => /^(s\.iconBig|s\.iconW|f\.icon|o\.icon|phoneIcon|menuIcon|phoneDark|icons\.\w+)$/.test(p);
// Handlers that only performed client-side routing; links are real now.
const NAV_HANDLERS = new Set(['openQuote', 'n.click', 's.click', 'l.click', 'n.leave', 'qDrag', 'stop', 'closeQuote']);
const FORMS = { qSubmit: 'quote', cSubmit: 'contact', submitCta: 'cta', submitHero: 'hero' };
const BP = { isDesktop: 'bp-desk', isMobile: 'bp-mob', ctaDesk: 'bp-cta-desk', ctaMob: 'bp-cta-mob' };
const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area', 'col', 'embed', 'wbr', 'track']);

const hover = new Map(); // style string -> class
const focus = new Map();
const BIND = /\{\{\s*([^}]+?)\s*\}\}/g;
const onlyBinding = (v) => { const m = /^\{\{\s*([^}]+?)\s*\}\}$/.exec(v.trim()); return m ? m[1] : null; };

function jsPath(p, scope) {
  if (p === 'true' || p === 'false') return p;
  const head = p.split('.')[0];
  return scope.has(head) ? p : `V.${p}`;
}
const escText = (s) => s.replace(/[{}]/g, (c) => `{'${c}'}`);
const escTpl = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const fixHref = (v) => v.replace(/^#(\/.*)$/, '$1').replace(/^uploads\//, '/uploads/');

function styleValue(v, scope) {
  v = v.replace(/url\((['"]?)uploads\//g, 'url($1/uploads/');
  v = v.replace(/\{\{\s*(\w+)\s*\}\}(px)?/g, (m, name) => (RESPONSIVE.has(name) ? `var(--${name})` : m));
  if (!BIND.test(v)) { BIND.lastIndex = 0; return { str: v }; }
  BIND.lastIndex = 0;
  let out = '', last = 0;
  for (const m of v.matchAll(BIND)) {
    out += escTpl(v.slice(last, m.index)) + '${' + jsPath(m[1], scope) + '}';
    last = m.index + m[0].length;
  }
  return { expr: '`' + out + escTpl(v.slice(last)) + '`' };
}

function decls(s) {
  return s.split(';').map((d) => d.trim()).filter(Boolean).map((d) => d.replace(/\s*!important\s*$/, '') + '!important').join(';');
}

/** Converts an element's attributes. Returns the attribute string. */
function attrs(el, scope, extra = {}) {
  const out = [];
  const classes = [...(extra.classes || [])];
  const add = (k, v) => out.push(v === true ? k : `${k}=${v}`);
  for (const [k0, v] of Object.entries(el.attribs)) {
    const k = k0;
    if (k.startsWith('hint-')) continue;
    const b = onlyBinding(v);
    if (/^on[A-Z]/.test(k)) {
      if (!b) throw new Error(`static handler ${k}=${v}`);
      if (NAV_HANDLERS.has(b)) continue;
      if (b === 'n.enter') { classes.push('dd-host'); continue; }
      if (/^(qh|ch)\.\w+$/.test(b)) { if (!el.attribs.name) add('name', `"${b.split('.')[1]}"`); continue; }
      if (b === 'qFiles') { add('name', '"files"'); add('data-files', true); continue; }
      if (b === 'qDrop') { add('data-drop', true); continue; }
      if (FORMS[b]) { add('data-form', `"${FORMS[b]}"`); continue; }
      const acts = { toggleMenu: 'menu', 'r.toggle': 'rev-toggle', 'o.pick': 'pick', loadMore: 'more', loadMoreAll: 'more' };
      if (acts[b]) {
        add('data-act', `"${acts[b]}"`);
        if (b === 'loadMore') { add('data-list', '"visibleReviews"'); add('data-step', '{6}'); }
        if (b === 'loadMoreAll') { add('data-list', '"allReviews"'); add('data-step', '{30}'); }
        continue;
      }
      throw new Error(`unmapped handler ${k}=${v}`);
    }
    if (k === 'value' && b && /^(qv|cv)\./.test(b)) continue;
    if (k === 'style-hover' || k === 'style-focus') {
      const map = k === 'style-hover' ? hover : focus;
      if (!map.has(v)) map.set(v, `${k === 'style-hover' ? 'h' : 'f'}${map.size + 1}`);
      classes.push(map.get(v));
      continue;
    }
    if (k === 'style') {
      const s = styleValue(v, scope);
      add('style', s.expr ? `{${s.expr}}` : `"${s.str}"`);
      continue;
    }
    if (k === 'class') { classes.push(...v.split(/\s+/)); continue; }
    if (k === 'noValidate') { add('novalidate', true); continue; }
    if (b) {
      const e = jsPath(b, scope);
      add(k, k.startsWith('aria-') ? `{${e} ? 'true' : 'false'}` : `{${e}}`);
      continue;
    }
    if (BIND.test(v)) {
      BIND.lastIndex = 0;
      throw new Error(`mixed binding in ${k}=${v}`);
    }
    add(k, `"${k === 'href' || k === 'src' ? fixHref(v) : v}"`);
  }
  for (const [k, v] of Object.entries(extra.attrs || {})) add(k, v);
  if (classes.length) out.unshift(`class="${classes.join(' ')}"`);
  return out.length ? ' ' + out.join(' ') : '';
}

function textNode(t, scope, parentExtra) {
  let out = '', last = 0;
  for (const m of t.matchAll(BIND)) {
    out += escText(t.slice(last, m.index));
    last = m.index + m[0].length;
    const p = m[1];
    if (/^(qm|cm)\./.test(p)) continue; // validation message, filled by JS
    if (p === 'shownCount' || p === 'allShown') { out += `<span data-shown>{${jsPath(p, scope)}}</span>`; continue; }
    if (p === 'r.shownText' && parentExtra) { parentExtra.attrs['data-full'] = '{r.fullText}'; parentExtra.attrs['data-text'] = true; }
    if (p === 'r.text' && parentExtra) parentExtra.attrs['data-text'] = true;
    if (p === 'r.name' && parentExtra) parentExtra.attrs['data-name'] = true;
    if (p === 'r.toggleLabel' && parentExtra) parentExtra.attrs['data-label'] = true;
    out += isIcon(p) ? `<Fragment set:html={${jsPath(p, scope)}} />` : `{${jsPath(p, scope)}}`;
  }
  return out + escText(t.slice(last));
}

const elems = (node) => (node.children || []).filter((c) => c.type === 'tag');

function children(node, scope, parentExtra) {
  return (node.children || []).map((c) => render(c, scope, parentExtra)).join('');
}

function render(node, scope, parentExtra, extra = {}) {
  if (node.type === 'text') return textNode(node.data, scope, parentExtra);
  if (node.type === 'comment') return '';
  if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') return '';
  const name = node.name;

  if (name === 'helmet') return '';
  if (name === 'sc-if') {
    const p = onlyBinding(node.attribs.value);
    if (p === 'quoteOpen') return ''; // modal never opened in the final design
    if (BP[p]) return `<div class="${BP[p]}">${children(node, scope)}</div>`;
    if (p === 'mobileOpen') return `<div class="bp-mob" data-mobile-menu hidden>${children(node, scope)}</div>`;
    // Prototype: isOpen = hovered && kids.length > 0, so items without sub-links get no panel.
    if (p === 'n.isOpen') return `{n.hasKids && (<div class="dd">${children(node, scope)}</div>)}`;
    const err = /^(qs|cs)\.(\w+)$/.exec(p);
    if (err) return elems(node).map((c) => render(c, scope, null, { attrs: { hidden: true, 'data-err': `"${err[2]}"` } })).join('');
    if (/^(qSent|cSent|ctaSent|heroSent)$/.test(p)) return `<div data-state="sent" hidden>${children(node, scope)}</div>`;
    if (/^(qForm|cForm|ctaForm|heroForm)$/.test(p)) return `<div data-state="form">${children(node, scope)}</div>`;
    return `{${jsPath(p, scope)} && (<Fragment>${children(node, scope)}</Fragment>)}`;
  }
  if (name === 'sc-for') {
    const list = onlyBinding(node.attribs.list);
    const as = node.attribs.as;
    if (list === 'qFileList') return '<span data-file-list style="display:contents"></span>';
    const inner = new Set(scope); inner.add(as);
    const itemAttrs = { 'data-item': `"${list}"` };
    if (list === 'visibleReviews' || list === 'allReviews') itemAttrs.hidden = `{${as}.hidden}`;
    if (list === 'wtOpts' || list === 'cmOpts') itemAttrs['data-val'] = `{${as}.label}`;
    if (list === 'rotWords') itemAttrs['data-rot'] = true;
    const body = (node.children || []).map((c) => (c.type === 'tag' ? render(c, inner, null, { attrs: itemAttrs }) : render(c, inner))).join('');
    return `{${jsPath(list, scope)}.map((${as}) => (<Fragment>${body}</Fragment>))}`;
  }
  const own = { attrs: { ...(extra.attrs || {}) }, classes: extra.classes || [] };
  const inner = children(node, scope, own); // may add data-full etc. to own
  const a = attrs(node, scope, own);
  if (VOID.has(name)) return `<${name}${a} />`;
  return `<${name}${a}>${inner}</${name}>`;
}

// ---------------------------------------------------------------------------
const doc = parseDocument(tpl, { lowerCaseTags: false, lowerCaseAttributeNames: false, decodeEntities: false, recognizeSelfClosing: true });
const wrapper = elems(doc).find((e) => e.name === 'div');
const parts = { pages: [], header: null, cta: null, footer: null, bottom: null };
for (const c of elems(wrapper)) {
  if (c.name === 'header') parts.header = c;
  else if (c.name === 'footer') parts.footer = c;
  else if (c.name === 'sc-if') {
    const p = onlyBinding(c.attribs.value);
    if (PAGES[p]) parts.pages.push([PAGES[p], c]);
    else if (p === 'showCta') parts.cta = c;
    else if (p === 'isMobile') parts.bottom = c;
    else throw new Error(`unexpected top-level sc-if ${p}`);
  } else throw new Error(`unexpected top-level <${c.name}>`);
}

const HEAD = (src, usesV) => `---
// GENERATED by tools/convert.mjs from the Claude Design prototype. Do not edit
// by hand: change the design (or the converter) and run \`npm run convert\`.
import ${usesV ? '{ vals, type PageKey }' : '{ type PageKey }'} from '${src}';
interface Props { page: PageKey }
${usesV ? 'const { page } = Astro.props;\nconst V = vals(page);' : ''}
---
`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'pages'), { recursive: true });
const write = (file, body, depth) => {
  const out = HEAD(depth === 2 ? '../../../data/vals' : '../../data/vals', /\bV\./.test(body)) + body.trim() + '\n';
  writeFileSync(join(OUT, file), out);
  const ids = [...out.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) console.warn(`  ! duplicate ids in ${file}: ${[...new Set(dup)].join(', ')}`);
  console.log(`  ${file}  ${(out.length / 1024).toFixed(1)} KB`);
};

console.log(`Converting ${SRC}`);
write('Header.astro', render(parts.header, new Set()), 1);
write('Cta.astro', children(parts.cta, new Set()), 1);
write('Footer.astro', render(parts.footer, new Set()), 1);
write('MobileCallBar.astro', render(parts.bottom, new Set()), 1);
const index = [];
for (const [[key, comp], node] of parts.pages) {
  write(`pages/${comp}.astro`, children(node, new Set()), 2);
  index.push(`  ${key}: ${comp},`);
}
writeFileSync(join(OUT, 'pages', 'index.ts'),
  `// GENERATED by tools/convert.mjs\n${parts.pages.map(([[, c]]) => `import ${c} from './${c}.astro';`).join('\n')}\n\nexport const PAGE_COMPONENTS = {\n${index.join('\n')}\n} as const;\n`);

const css = ['/* GENERATED by tools/convert.mjs: style-hover / style-focus from the prototype. */'];
for (const [s, c] of hover) css.push(`.${c}:hover{${decls(s)}}`);
for (const [s, c] of focus) css.push(`.${c}:focus{${decls(s)}}`);
writeFileSync(join(ROOT, 'src', 'styles', 'generated.css'), css.join('\n') + '\n');
console.log(`  styles/generated.css  ${hover.size} hover, ${focus.size} focus classes`);
