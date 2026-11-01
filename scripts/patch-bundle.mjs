import fs from 'fs';

const filePath = '/app/applet/public/assets/index-62U8YsPh.js';
let js = fs.readFileSync(filePath, 'utf8');
let patchCount = 0;

function replaceExact(name, target, replacement) {
  if (js.includes(target)) {
    js = js.replace(target, replacement);
    console.log(`[OK] Patched: ${name}`);
    patchCount++;
    return true;
  } else {
    console.warn(`[WARN] Target NOT found for: ${name}`);
    return false;
  }
}

// 1. Navigation items (Eg and Dg) - Remove Exotics, Giveaways, Suggestions; Add Trades and Credits
const targetEg = `var Eg=[{label:\`Home\`,path:\`/\`,icon:mi},{label:\`Calculator\`,path:\`/calculator\`,icon:oi},{label:\`Value List\`,path:\`/values\`,icon:yi},{label:\`Giveaways\`,path:\`/giveaways\`,icon:fi},{label:\`Exotics\`,path:\`/values?category=exotic\`,icon:Bi,exotic:!0},{label:\`Chat\`,path:\`/chat\`,icon:Ei},{label:\`Suggest\`,path:\`/suggestions\`,icon:vi},{label:\`Settings\`,path:\`/settings\`,icon:zi}],Dg=(e,t)=>{let n=new URLSearchParams(t.search).get(\`category\`);return e.exotic?t.pathname===\`/values\`&&n===\`exotic\`:e.path===\`/values\`?t.pathname===\`/values\`&&n!==\`exotic\`:t.pathname===e.path};`;

const newEg = `var Eg=[{label:\`Home\`,path:\`/\`,icon:mi},{label:\`Calculator\`,path:\`/calculator\`,icon:oi},{label:\`Value List\`,path:\`/values\`,icon:yi},{label:\`Trades\`,path:\`/trades\`,icon:oi},{label:\`Chat\`,path:\`/chat\`,icon:Ei},{label:\`Credits\`,path:\`/credits\`,icon:ii},{label:\`Settings\`,path:\`/settings\`,icon:zi}],Dg=(e,t)=>t.pathname===e.path;`;

replaceExact("Navigation Eg & Dg", targetEg, newEg);

// 2. Categories Rg in Value List - Remove Exotic category
const targetRg = `var Rg=[{name:\`Exotic\`,slug:\`exotic\`},{name:\`All\`,slug:\`all\`},{name:\`Pets\`,slug:\`pets\`},`;
const newRg = `var Rg=[{name:\`All\`,slug:\`all\`},{name:\`Signs / Adds\`,slug:\`signs\`},{name:\`Pets\`,slug:\`pets\`},`;
replaceExact("Value List Rg Categories", targetRg, newRg);

// 3. Categories qg in Item Picker Modal - Add signs category
const targetQg = `qg=[\`pets\`,\`eggs\`,\`petwear\`,\`strollers\`,\`food\`,\`vehicles\`,\`toys\`,\`gifts\`,\`stickers\`,\`houses\`]`;
const newQg = `qg=[\`signs\`,\`pets\`,\`eggs\`,\`petwear\`,\`strollers\`,\`food\`,\`vehicles\`,\`toys\`,\`gifts\`,\`stickers\`,\`houses\`]`;
replaceExact("Picker qg Categories", targetQg, newQg);

// 4. Item Picker Modal (i_) placeholder and not removing items
const targetI1 = `placeholder:\`Search the AMVGG catalog…\``;
const newI1 = `placeholder:\`Search The Catalog...\``;
replaceExact("Picker Placeholder", targetI1, newI1);

const targetI2 = `t.length&&(l.id={$nin:t}),`;
const newI2 = ``; // Do not exclude added pets! Allows adding multiple!
replaceExact("Picker Allow Multiple of Same Pet", targetI2, newI2);

// 5. Item Picker Result Grid (r_) - Include demand indicator
const targetR1 = `(0,L.jsx)(\`p\`,{className:\`mt-2 truncate text-xs font-bold\`,children:e.name})]},e.id))`;
const newR1 = `(0,L.jsx)(\`p\`,{className:\`mt-2 truncate text-xs font-bold\`,children:e.name}),(0,L.jsx)(\`div\`,{className:\`mt-1 flex items-center justify-center\`,children:e.is_sign?(0,L.jsx)(\`span\`,{className:\`rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-indigo-300\`,children:\`SIGN\`}):(0,L.jsx)(\`span\`,{className:\`rounded px-1.5 py-0.5 text-[9px] font-black uppercase \${e.demand===3?\`bg-emerald-500/20 text-emerald-400\`:e.demand===1?\`bg-slate-500/20 text-slate-400\`:\`bg-amber-500/20 text-amber-400\`}\`,children:e.demand===3?\`🔥 High\`:e.demand===1?\`❄ Low\`:\`⚡ Med\`})})]},e.id))`;
replaceExact("Demand Indicator in Picker r_", targetR1, newR1);

// 6. Homepage Feature Cards (jg) - Update cards to Calculator, Values, Trades, Chat
const targetJg = `jg=[{title:\`WFL Calculator\`,desc:\`Add items to both sides, pick Fly, Ride, Neon or Mega, and get a verdict on both scales.\`,icon:oi,to:\`/calculator\`},{title:\`Value List\`,desc:\`The AMVGG calculator catalog with exact source values side by side.\`,icon:yi,to:\`/values\`},{title:\`Value Updates\`,desc:\`Admin-triggered source checks, with unavailable values clearly marked.\`,icon:Ui,to:\`/suggestions\`}]`;

const newJg = `jg=[{title:\`WFL Calculator\`,desc:\`18-slot trade scale with live Win / Fair / Lose verdict, potion calculations, and trading signs.\`,icon:oi,to:\`/calculator\`},{title:\`Value Catalog\`,desc:\`Exact AMVGG verified values, demand tiers, and variant multipliers for every pet.\`,icon:yi,to:\`/values\`},{title:\`Trade Mailbox\`,desc:\`List your trades and receive community offers in your mailbox to accept, decline, or counter.\`,icon:oi,to:\`/trades\`},{title:\`Community Chat\`,desc:\`Real-time trading discussion with other Adopt Me players to check values and find trades.\`,icon:Ei,to:\`/chat\`}]`;
replaceExact("Homepage Feature Cards jg", targetJg, newJg);

fs.writeFileSync(filePath, js);
console.log(`Total initial patches applied: ${patchCount}`);
