// Line icons from the prototype's ic() helper, rendered to SVG strings.
const P: Record<string, string> = {
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  wrench: 'M14.5 6.5a4 4 0 0 0 5 5L11 20a2.1 2.1 0 0 1-3-3l8.5-8.5',
  check: 'M5 12.5l5 5 9-11',
  pipe: 'M4 7h9v10h7',
  tank: 'M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 9h6',
  gauge: 'M4 16a8 8 0 1 1 16 0M12 16l4-5',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  filter: 'M4 5h16l-6 8v6l-4-2v-4z',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
  shield: 'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z',
  truck: 'M2 7h11v9H2zM13 10h4l3 3v3h-7M6 18.5a1.5 1.5 0 1 0 0 .1M16 18.5a1.5 1.5 0 1 0 0 .1',
  broom: 'M5 20l5-9 4 2-4 7zM12 11l3-7',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 20c1-4 4-6 8-6s7 2 8 6',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
  slab: 'M3 17h18M6 17l2-5 3 3 3-6 3 8',
  pump: 'M9 3h6M12 3v5M7 8h10v6H7zM5 14h14v4H5zM3 21h18',
  home: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
  building: 'M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3',
  crane: 'M4 21h16M7 21V8h4v13M11 10l8-3M19 7v6M17 13h4v3h-4z',
  toilet: 'M6 4h8v6M4 10h16c0 5-3 8-8 8s-8-3-8-8zM9 21h6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  leak: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l5 5M11 8s2.5 2.8 2.5 4.5a2.5 2.5 0 0 1-5 0C8.5 10.8 11 8 11 8z',
  septic: 'M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM7 9V5h4v4M5 14c2-1.5 3 1.5 5 0s3 1.5 5 0 3 1.5 4 0',
  grease: 'M4 5h16v7H4zM8 12v4M12 12v6M16 12v4M7 8h10',
  menu: 'M4 7h16M4 12h16M4 17h16',
};

export function icon(name: string, color = '#716558', size = 28, cls = ''): string {
  const c = cls ? ` class="${cls}"` : '';
  return `<svg${c} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name]}"></path></svg>`;
}
