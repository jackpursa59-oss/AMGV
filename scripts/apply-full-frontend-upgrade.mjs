import fs from 'fs';

let content = fs.readFileSync('public/assets/index-62U8YsPh.js', 'utf8');

// 1. Replace jg array
const jgStart = content.indexOf('jg=[{title:`WFL Calculator`');
const jgEnd = content.indexOf('icon:Ei,to:`/chat`}]', jgStart) + 'icon:Ei,to:`/chat`}]'.length;

if (jgStart !== -1 && jgEnd !== -1) {
  const newJg = `jg=[
  {title:\`WFL Calculator\`,desc:\`Authentic 18-slot Adopt Me trade grid with independent AMVGG & Elvebredd meters, potion multipliers, and trading signs.\`,icon:oi,to:\`/calculator\`},
  {title:\`Value Catalog\`,desc:\`Exact AMVGG verified values, live demand badges, and full pricing formula variant breakdowns for all pets.\`,icon:yi,to:\`/values\`},
  {title:\`Trade Mailbox\`,desc:\`List your trades and receive community offers in your mailbox. Accept, decline, or counter with ease.\`,icon:oi,to:\`/trades\`},
  {title:\`WFL Community Chat\`,desc:\`Real-time trading discussion with screenshot sharing, report flags, and instant WFL checks.\`,icon:Ei,to:\`/chat\`},
  {title:\`Community Suggestions\`,desc:\`Submit value adjustments, new pet requests, or feature ideas for staff review and implementation.\`,icon:Pi,to:\`/suggestions\`},
  {title:\`Discord Community\`,desc:\`Connect with other traders in our official Discord server for live market alerts and announcements.\`,icon:mi,to:\`/discord\`},
  {title:\`Staff Application\`,desc:\`Apply to join our moderation, trading, and value verification staff team. We are actively hiring!\`,icon:qi,to:\`/apply\`},
  {title:\`Credits & Disclaimer\`,desc:\`Transparent community-first notice, non-affiliation disclosures, and platform copyright info.\`,icon:ii,to:\`/credits\`},
  {title:\`Settings & Audio\`,desc:\`Lo-Fi chill music player preferences, volume sliders, click sound toggles, and user account management.\`,icon:zi,to:\`/settings\`}
]`;
  content = content.slice(0, jgStart) + newJg + content.slice(jgEnd);
  console.log('Successfully updated jg array with all 9 cards.');
}

// 2. Update Mg (Homepage) with Discord button and Staff Hiring banner
const mgHeroPattern = /\(0,L\.jsxs\)\(`div`,{className:`mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row`,children:\[\(0,L\.jsxs\)\(jt,{to:`\/calculator`[\s\S]*?Browse Values`\}\]\)}\]\)}\]\)}\]\)}\),\(0,L\.jsx\)\(`section`,{className:`mx-auto max-w-7xl px-4 pt-14 sm:px-6`/;

if (mgHeroPattern.test(content)) {
  const newHeroAdditions = `(0,L.jsxs)(\`div\`,{className:\`mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row\`,children:[
    (0,L.jsxs)(jt,{to:\`/calculator\`,className:\`group flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(59,178,214,0.4)]\`,children:[\`WFL Calculator\`,(0,L.jsx)(ri,{className:\`h-4 w-4 transition-transform group-hover:translate-x-1\`})]}),
    (0,L.jsxs)(jt,{to:\`/values\`,className:\`flex items-center gap-2 rounded-xl border border-border bg-card/60 px-7 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:border-primary\`,children:[(0,L.jsx)(Li,{className:\`h-4 w-4\`}),\`Browse Values\`]}),
    (0,L.jsxs)(jt,{to:\`/discord\`,className:\`flex items-center gap-2 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/20 px-6 py-3.5 text-sm font-bold text-[#c7d2fe] backdrop-blur transition-all hover:bg-[#5865F2]/30 hover:border-[#5865F2]\`,children:[
      (0,L.jsx)(\`svg\`,{className:\`h-4 w-4 fill-current\`,viewBox:\`0 0 24 24\`,children:(0,L.jsx)(\`path\`,{d:\`M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z\`})
    ]}),
    (0,L.jsxs)(jt,{to:\`/apply\`,className:\`flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3.5 text-xs font-bold text-primary transition-all hover:bg-primary/20\`,children:[
      (0,L.jsx)(qi,{className:\`h-4 w-4\`}),
      \`Staff Hiring (Apply)\`
    ]})
  ]})]})]})]}),
  (0,L.jsx)(\`section\`,{className:\`mx-auto max-w-7xl px-4 pt-10 sm:px-6\`,children:
    (0,L.jsxs)(\`div\`,{className:\`relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-card/90 via-primary/10 to-card/90 p-6 sm:p-8 backdrop-blur shadow-xl\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`flex flex-col sm:flex-row items-center justify-between gap-6\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-4 text-left\`,children:[
          (0,L.jsx)(\`div\`,{className:\`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-primary/20 text-primary ring-2 ring-primary/40\`,children:(0,L.jsx)(Tg,{size:30})}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-2\`,children:[
              (0,L.jsx)(\`span\`,{className:\`rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary\`,children:\`We Are Hiring\`}),
              (0,L.jsx)(\`span\`,{className:\`text-xs text-muted-foreground\`,children:\`Community Staff Application\`})
            ]}),
            (0,L.jsx)(\`h3\`,{className:\`mt-1 text-xl font-black text-foreground\`,children:\`Join The AMGV Staff Team!\`}),
            (0,L.jsx)(\`p\`,{className:\`mt-0.5 max-w-xl text-xs text-muted-foreground\`,children:\`Passionate about Adopt Me values, trade verification, and community moderation? Submit your application directly to the owner mailbox.\`})
          ]})
        ]}),
        (0,L.jsxs)(jt,{to:\`/apply\`,className:\`flex flex-none items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-primary/30\`,children:[
          (0,L.jsx)(qi,{className:\`h-4 w-4\`}),
          \`Apply For Staff\`
        ]})
      ]})
    ]})
  }),
  (0,L.jsx)(\`section\`,{className:\`mx-auto max-w-7xl px-4 pt-14 sm:px-6\``;

  content = content.replace(mgHeroPattern, newHeroAdditions);
  console.log('Successfully injected Discord button and Staff Hiring Ad banner into Mg.');
}

// 3. Update 18-slot grid in a_ to have Adopt Me 3x6 styled boxes with slot numbers
const aOldPattern = /function a_\(\{items:e,onAdd:t,onRemove:n,onDuplicate:r,accent:i\}\)\{[\s\S]*?return \(0,L\.jsxs\)\(`div`,{className:`w-full max-w-\[390px\]`[\s\S]*?\}\);  \}/;

const aNewFunc = `function a_({items:e,onAdd:t,onRemove:n,onDuplicate:r,accent:i}){
  let a=[];
  for(let o=0;o<18;o++){
    let s=e[o],c=o===e.length;
    if(s){
      a.push((0,L.jsxs)(\`div\`,{className:\`group relative aspect-square overflow-hidden rounded-xl border border-primary/30 bg-card/90 flex flex-col items-center justify-center p-1 hover:border-primary transition-all shadow-sm\`,children:[
        (0,L.jsx)(\`span\`,{className:\`absolute left-1 top-1 z-10 rounded bg-background/80 px-1 py-0.2 text-[8px] font-black text-muted-foreground\`,children:\`#\${o+1}\`}),
        (0,L.jsx)(xg,{item:s,className:\`glitch-img h-full w-full object-contain p-0.5\`}),
        (0,L.jsxs)(\`div\`,{className:\`absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-background/95 px-1 py-0.5 backdrop-blur-xs text-[8px]\`,children:[
          (0,L.jsx)(\`span\`,{className:\`truncate font-bold text-foreground max-w-[65%]\`,children:s.name}),
          s.category===\`pets\`?(0,L.jsx)(Fg,{potion:s.potion}):s.is_sign?(0,L.jsx)(\`span\`,{className:\`font-black text-primary\`,children:\`SIGN\`}):null
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20\`,children:[
          e.length<18&&(0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>r?.(s),title:\`Duplicate item (\${e.length}/18)\`,className:\`rounded-md bg-primary p-1 text-primary-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Mi,{className:\`h-2.5 w-2.5\`})}),
          (0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>n(s.uid),title:\`Remove\`,className:\`rounded-md bg-destructive p-1 text-destructive-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Zi,{className:\`h-2.5 w-2.5\`})})
        ]})
      ]},s.uid));
    } else {
      a.push((0,L.jsxs)(\`button\`,{type:\`button\`,onClick:t,title:\`Add pet or item into slot #\${o+1} (\${e.length}/18)\`,className:\`group relative flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-secondary/20 transition-all hover:border-primary/70 hover:bg-primary/5 hover:scale-[1.02]\`,children:[
        (0,L.jsx)(\`span\`,{className:\`absolute left-1.5 top-1.5 text-[8px] font-black text-muted-foreground/60\`,children:\`#\${o+1}\`}),
        (0,L.jsx)(\`div\`,{className:\`flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/80 text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_12px_rgba(59,178,214,0.3)]\`,children:(0,L.jsx)(Mi,{className:\`h-3.5 w-3.5\`})}),
        (0,L.jsx)(\`span\`,{className:\`mt-1 text-[8px] font-bold text-muted-foreground group-hover:text-primary\`,children:\`Empty\`})
      ]}, \`slot-\${o}\`));
    }
  }
  return (0,L.jsxs)(\`div\`,{className:\`w-full max-w-[420px] rounded-2xl border border-border/80 bg-card/60 p-3 shadow-lg backdrop-blur\`,children:[
    (0,L.jsx)(\`div\`,{className:\`grid grid-cols-3 gap-2 sm:gap-2.5\`,children:a}),
    (0,L.jsxs)(\`div\`,{className:\`mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground\`,children:[
      (0,L.jsxs)(\`span\`,{children:[\`Adopt Me 18-Slot Trade Grid\`]}),
      (0,L.jsxs)(\`span\`,{className:\`font-bold \${e.length===18?\`text-amber-400\`:\`text-primary\`}\`,children:[e.length,\`/18 Slots Filled\`]})
    ]})
  ]});
}`;

if (aOldPattern.test(content)) {
  content = content.replace(aOldPattern, aNewFunc);
  console.log('Successfully updated a_ to authentic Adopt Me 3x6 grid with slot numbers.');
} else {
  console.log('a_ pattern check...');
}

// 4. Update Win/Fair/Lose bar in l_ to accurately distinguish AMVGG and Elvebredd scales
// Replace c_ definition with independent percentage calculator
const cOldDef = "var c_=(e,t)=>e+t>0?Math.round(e/(e+t)*100):50;";
const cNewDef = `var c_=(you,them)=>{
  if(!you && !them) return 50;
  if(you <= 0) return 0;
  if(them <= 0) return 100;
  // Calculate relative proportion so 50% = equal
  let pct = Math.round((you / (you + them)) * 100);
  return Math.min(Math.max(pct, 5), 95);
};
var calcVerdict=(you,them)=>{
  if(!you && !them) return { status: 'FAIR', text: 'Fair Trade', diff: 0, pct: 0 };
  let diff = you - them;
  let base = Math.max(you, them, 1);
  let ratio = (diff / base) * 100;
  if (Math.abs(ratio) <= 6) return { status: 'FAIR', text: 'Fair Trade', diff, pct: ratio };
  if (ratio > 18) return { status: 'WIN', text: \`+\${diff.toFixed(2)} OP Win\`, diff, pct: ratio };
  if (ratio > 6) return { status: 'WIN', text: \`+\${diff.toFixed(2)} Small Win\`, diff, pct: ratio };
  if (ratio < -18) return { status: 'LOSE', text: \`\${diff.toFixed(2)} Big Underpay\`, diff, pct: ratio };
  return { status: 'LOSE', text: \`\${diff.toFixed(2)} Small Lose\`, diff, pct: ratio };
};`;

if (content.includes(cOldDef)) {
  content = content.replace(cOldDef, cNewDef);
  console.log('Successfully updated c_ and added calcVerdict for independent scales.');
}

fs.writeFileSync('public/assets/index-62U8YsPh.js', content, 'utf8');
console.log('Saved changes. Validating syntax...');
