import fs from 'fs';
import path from 'path';

const Kg = {
  amvgg: 'https://amvgg.com/calculator',
  elvebredd: 'https://elvebredd.com/adopt-me-calculator'
};

const Jg = e => String(e || '').normalize('NFKD').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
const Yg = e => e != null && String(e).trim() !== '' && Number.isFinite(Number(e)) && Number(e) >= 0 ? Number(e) : null;
const Xg = e => `https://amvgg.com/items/${encodeURIComponent(String(e).replace(/[^a-zA-Z0-9 _\-().,&]/g, ''))}.webp`;

const Ug = {
  11: { NP: 0.85, R: 0.95, F: 0.975, NNP: 0.975, NR: 0.99, NF: 0.995, MNP: 1, MR: 1, MF: 1 },
  33: { NP: 0.8, R: 0.9, F: 0.95, NNP: 0.95, NR: 0.975, NF: 0.98, MNP: 1, MR: 1, MF: 1 },
  55: { NP: 0.9, R: 0.95, F: 0.975, NNP: 1, NR: 1, NF: 1, MNP: 1.025, MR: 1, MF: 1 },
  75: { NP: 0.94, R: 0.96, F: 0.98, NNP: 1, NR: 1, NF: 1, MNP: 1, MR: 1, MF: 1 },
  79: { NP: 0.97, R: 0.98, F: 0.985, NNP: 1, NR: 1, NF: 1, MNP: 1.05, MR: 1, MF: 1 },
  81: { NP: 0.98, R: 0.985, F: 0.99, NNP: 1, NR: 1, NF: 1, MNP: 1.025, MR: 1, MF: 1 },
  97: { NP: 0.8, R: 0.9, F: 0.92, NNP: 0.95, NR: 0.975, NF: 0.98, MNP: 1.025, MR: 1, MF: 1 },
  98: { NP: 0.8, R: 0.9, F: 0.92, NNP: 0.95, NR: 0.975, NF: 0.98, MNP: 1.05, MR: 1, MF: 1 },
  99: { NP: 0.8, R: 0.9, F: 0.92, NNP: 0.95, NR: 0.975, NF: 0.98, MNP: 1, MR: 1, MF: 1 },
  111: { NP: 0.04, R: 0.5, F: 0.6, NNP: 0.125, NR: 0.6, NF: 0.75, MNP: 0.33, MR: 0.65, MF: 0.75 },
  222: { NP: 0.02, R: 0.45, F: 0.55, NNP: 0.07, NR: 0.5, NF: 0.65, MNP: 0.275, MR: 0.55, MF: 0.65 },
  333: { NP: 0.03, R: 0.5, F: 0.6, NNP: 0.1, NR: 0.55, NF: 0.7, MNP: 0.3, MR: 0.6, MF: 0.7 }
};

function Gg(e, t) {
  let n = {};
  let r = [['regularValue', 'npRegularValue', 'rValue', 'fValue'], ['neonValue', 'npNeonValue', 'nrValue', 'nfValue'], ['megaValue', 'npMegaValue', 'mrValue', 'mfValue']];
  let i = ['normal', 'neon', 'mega'];
  r.forEach((t, r) => t.forEach((t, a) => {
    e[t] !== void 0 && e[t] !== null && String(e[t]).trim() !== '' && Number.isFinite(Number(e[t])) && (n[`${i[r]}_${['fr', 'none', 'r', 'f'][a]}`] = Number(e[t]));
  }));
  if (Number(e.category) === 13) return n;
  let a = t?.[e.category];
  if (!a) return n;
  let o = [['NP', 'R', 'F'], ['NNP', 'NR', 'NF'], ['MNP', 'MR', 'MF']];
  i.forEach((t, r) => {
    let i = e[['regularValue', 'neonValue', 'megaValue'][r]];
    if (i == null || !Number.isFinite(Number(i))) return;
    let s = Number(i);
    o[r].forEach((i, o) => {
      let c = a[i];
      e.category === 11 && r === 0 && s > 0.08 && (c = o === 0 ? 0.95 : 0.975);
      let l = e.category === 11 && o > 0 && (r === 1 && s > 0.2 || r === 2 && s > 0.9);
      let u = s * c;
      let d = 10 ** Math.min(r === 0 && s >= 0.0175 ? 3 : 5, u !== 0 && Math.abs(u) < 0.001 ? 5 : 4);
      n[`${t}_${['none', 'r', 'f'][o]}`] = l ? s : Math.round((u + 2 ** -52) * d) / d;
    });
  });
  return n;
}

function Zg(e, t) {
  let n = [...e.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)].map(e => {
    try {
      let t = JSON.parse(e[1]);
      return t[0] === 1 && typeof t[1] == 'string' ? t[1] : '';
    } catch {
      return '';
    }
  }).join('');
  let r = e => {
    if (!e || typeof e != 'object') return null;
    if (Array.isArray(e[t])) return e;
    for (let i of Object.values(e)) {
      let o = r(i);
      if (o) return o;
    }
    return null;
  };
  for (let s of n.split('\n')) {
    if (!s.includes(`"${t}":[`)) continue;
    let colonIdx = s.indexOf(':');
    let jsonStr = s.slice(colonIdx + 1);
    try {
      let o = r(JSON.parse(jsonStr));
      if (o) return o;
    } catch (err) {}
  }
  throw Error(`The ${t} source format changed.`);
}

function $g(e) {
  let t = new Map();
  for (let n of e) {
    if (n.status !== 'Ready') continue;
    let type = n.type === 'pet wear' ? 'petwear' : n.type;
    for (let r of [`${type}:${Jg(n.name)}`, `*:${Jg(n.name)}`]) {
      t.set(r, [...(t.get(r) || []), n]);
    }
  }
  return t;
}

function t_(e, t) {
  if (!e) return {};
  let n = {};
  let r = t === 'amvgg' ? ['regular', 'neon', 'mega'] : ['rvalue', 'nvalue', 'mvalue'];
  let i = [['regularValue', 'npRegularValue', 'rValue', 'fValue'], ['neonValue', 'npNeonValue', 'nrValue', 'nfValue'], ['megaValue', 'npMegaValue', 'mrValue', 'mfValue']];
  r.forEach((r, a) => ['fr', 'none', 'r', 'f'].forEach((o, s) => {
    let c = Yg(e[t === 'amvgg' ? i[a][s] : `${r} - ${['fly&ride', 'nopotion', 'ride', 'fly'][s]}`]);
    c !== null && (n[`${['normal', 'neon', 'mega'][a]}_${o}`] = c);
  }));
  return n;
}

function e_(e, t, n) {
  let r = e.get(`${t}:${Jg(n)}`) || e.get(`*:${Jg(n)}`) || [];
  return new Set(r.map(e => JSON.stringify([Yg(e.rvalue ?? e.value), Yg(e.nvalue), Yg(e.mvalue), t_(e, 'elvebredd')]))).size === 1 ? r[0] : null;
}

function n_(e, t, n) {
  let r = $g(t.initialPets);
  let i = { pets: 'pets', eggs: 'eggs', toys: 'toys', foods: 'food', vehicles: 'vehicles', gifts: 'gifts', strollers: 'strollers', petWear: 'petwear', stickers: 'stickers', houses: 'houses' };
  let a = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', 'ultra rare': 'Ultra-Rare', legendary: 'Legendary' };

  return Object.entries(i).flatMap(([catKey, iVal]) => {
    if (!Array.isArray(e[catKey])) return [];
    return e[catKey].map(item => {
      let o = e_(r, iVal, item.name);
      let s = Yg(item.regularValue ?? item.value);
      let c = o?.status === 'Ready' ? Yg(o.rvalue ?? o.value) : null;
      let finalVal = c ?? s ?? 0;
      let l = {
        id: String(item.id || item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')),
        name: item.name,
        category: iVal,
        source_catalog: 'amvgg',
        source_id: String(item.id),
        catalog_status: 'active',
        value: finalVal,
        amvgg_value: s,
        elvebredd_value: c,
        amvgg_verified: s !== null,
        elvebredd_verified: c !== null,
        amvgg_variants: iVal === 'pets' ? Gg(item, Ug) : {},
        elvebredd_variants: iVal === 'pets' && c !== null ? t_(o, 'elvebredd') : {},
        amvgg_checked_at: n,
        elvebredd_checked_at: n,
        image_url: Xg(item.name),
        alternate_image_url: o?.image ? new URL(o.image, 'https://elvebredd.com').href : '',
        demand: { High: 3, Medium: 2, Low: 1 }[item.regularDemand ?? item.demand] ?? 2,
        updated_note: `Source checked ${new Date(n).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })} (UTC)`
      };
      if (a[o?.rarity]) {
        l.rarity = a[o.rarity];
      }
      return l;
    });
  });
}

async function sync() {
  console.log('Fetching AMVGG...');
  const amvggRes = await fetch(Kg.amvgg);
  const amvggHtml = await amvggRes.text();
  const amvggData = Zg(amvggHtml, 'pets');

  console.log('Fetching Elvebredd via Jina...');
  const elveRes = await fetch(`https://r.jina.ai/${Kg.elvebredd}`, {
    headers: { 'X-Respond-With': 'html', 'X-No-Cache': 'true' }
  });
  const elveHtml = await elveRes.text();
  const elveData = Zg(elveHtml, 'initialPets');

  const now = new Date().toISOString();
  console.log('Combining catalogs...');
  const items = n_(amvggData, elveData, now);
  console.log(`Generated ${items.length} items!`);

  fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync('./data/pets.json', JSON.stringify(items, null, 2));
  console.log('Saved to ./data/pets.json');
}

sync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
