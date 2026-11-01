import fs from 'fs';

const filePath = '/app/applet/public/assets/index-62U8YsPh.js';
let js = fs.readFileSync(filePath, 'utf8');

// 1. Header (Og) - Sleeker h-14, square GV icon links to /admin, brand text links to /, cleaner navigation
const targetOgStart = "function Og(){let[e,t]=(0,_.useState)(!1),n=Re();let a=null;try{a=Zh()}catch{}let isAuth=Boolean(a?.isAuthenticated&&a?.user);return(0,L.jsxs)(`header`,";
const targetOgEnd = "function kg(){";

const idxOgStart = js.indexOf(targetOgStart);
const idxOgEnd = js.indexOf(targetOgEnd);

if (idxOgStart === -1 || idxOgEnd === -1) {
  console.error("Could not find Og boundaries!");
  process.exit(1);
}

const newOg = `function Og(){
  let[e,t]=(0,_.useState)(!1),n=Re();
  let a=null;try{a=Zh()}catch{}
  let isAuth=Boolean(a?.isAuthenticated&&a?.user);
  return(0,L.jsxs)(\`header\`,{className:\`sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md\`,children:[
    (0,L.jsxs)(\`div\`,{className:\`mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-2.5\`,children:[
        (0,L.jsx)(jt,{to:\`/admin\`,title:\`Staff Admin Panel\`,onClick:()=>t(!1),className:\`flex items-center rounded-lg p-0.5 hover:ring-2 hover:ring-primary/50 transition-all\`,children:(0,L.jsx)(Tg,{size:30})}),
        (0,L.jsxs)(jt,{to:\`/\`,onClick:()=>t(!1),className:\`flex items-center gap-1.5 font-black text-sm tracking-tight\`,children:[
          \`GLITCH\`,
          (0,L.jsx)(\`span\`,{className:\`text-primary\`,children:\`VALUES\`}),
          (0,L.jsx)(\`span\`,{className:\`ml-0.5 text-[9px] font-bold text-muted-foreground\`,children:\`(AMGV)\`})
        ]})
      ]}),
      (0,L.jsx)(\`nav\`,{className:\`hidden items-center gap-1 md:flex\`,children:Eg.map(e=>{
        let r=Dg(e,n);
        return(0,L.jsxs)(jt,{to:e.path,className:\`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors \${r?\`bg-secondary text-primary\`:\`text-muted-foreground hover:text-foreground\`}\`,children:[(0,L.jsx)(e.icon,{className:\`h-3.5 w-3.5\`}),e.label]},e.path);
      })}),
      isAuth?(0,L.jsxs)(jt,{to:\`/settings\`,className:\`hidden items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/25 md:inline-flex\`,children:[(0,L.jsx)(\`span\`,{className:\`h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]\`}),\`Signed in\`]}):(0,L.jsxs)(jt,{to:\`/login\`,className:\`hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex\`,children:[(0,L.jsx)(Si,{className:\`h-3.5 w-3.5\`}),\`Log in\`]}),
      (0,L.jsx)(\`button\`,{className:\`rounded-lg p-1.5 text-foreground md:hidden\`,onClick:()=>t(e=>!e),\"aria-label\":\`Toggle menu\`,children:e?(0,L.jsx)(Zi,{className:\`h-5 w-5\`}):(0,L.jsx)(Ti,{className:\`h-5 w-5\`})})
    ]}),
    e&&(0,L.jsxs)(\`nav\`,{className:\`border-t border-border bg-background px-4 py-3 md:hidden\`,children:[
      Eg.map(e=>{
        let r=Dg(e,n);
        return(0,L.jsxs)(jt,{to:e.path,onClick:()=>t(!1),className:\`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider \${r?\`bg-secondary text-primary\`:\`text-muted-foreground\`}\`,children:[(0,L.jsx)(e.icon,{className:\`h-4 w-4\`}),e.label]},e.path);
      }),
      isAuth?(0,L.jsxs)(jt,{to:\`/settings\`,onClick:()=>t(!1),className:\`mt-2 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/15 px-3 py-2 text-xs font-bold text-primary\`,children:[(0,L.jsx)(\`span\`,{className:\`h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]\`}),\`Signed in\`]}):(0,L.jsxs)(jt,{to:\`/login\`,onClick:()=>t(!1),className:\`mt-2 flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground\`,children:[(0,L.jsx)(Si,{className:\`h-4 w-4\`}),\`Log in\`]})
    ]})
  ]});
}
`;

js = js.substring(0, idxOgStart) + newOg + js.substring(idxOgEnd);
console.log("[OK] Patched Og (cleaner header, square GV admin link)");

// 2. Footer (kg) - Add full copyright & non-affiliation disclaimer
const targetKgStart = "function kg(){return(0,L.jsx)(`footer`,";
const targetKgEnd = "var Ag=";

const idxKgStart = js.indexOf(targetKgStart);
const idxKgEnd = js.indexOf(targetKgEnd);

if (idxKgStart === -1 || idxKgEnd === -1) {
  console.error("Could not find kg boundaries!");
  process.exit(1);
}

const newKg = `function kg(){
  return(0,L.jsx)(\`footer\`,{className:\`border-t border-border bg-card/80\`,children:
    (0,L.jsxs)(\`div\`,{className:\`mx-auto max-w-7xl px-4 py-10 sm:px-6\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`grid gap-8 md:grid-cols-4\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`md:col-span-2\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-2\`,children:[
            (0,L.jsx)(Tg,{size:32}),
            (0,L.jsxs)(\`span\`,{className:\`text-base font-extrabold tracking-tight\`,children:[\`GLITCH\`,(0,L.jsx)(\`span\`,{className:\`text-primary\`,children:\`VALUES\`}),(0,L.jsx)(\`span\`,{className:\`ml-1 text-[10px] font-bold text-muted-foreground\`,children:\`(AMGV)\`})]})
          ]}),
          (0,L.jsx)(\`p\`,{className:\`mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground\`,children:\`The community-trusted Adopt Me value list and 18-slot WFL calculator. Compare trades side by side with live updates and trading signs.\`})
        ]}),
        (0,L.jsxs)(\`div\`,{children:[
          (0,L.jsx)(\`h4\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Navigation\`}),
          (0,L.jsxs)(\`ul\`,{className:\`mt-3 space-y-2 text-xs font-medium\`,children:[
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Home\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/calculator\`,className:\`text-foreground/80 hover:text-primary\`,children:\`WFL Calculator\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/values\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Value List\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/trades\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Community Trades & Mailbox\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/chat\`,className:\`text-foreground/80 hover:text-primary\`,children:\`WFL Chat\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/credits\`,className:\`text-primary hover:underline font-bold\`,children:\`Credits & Disclaimer\`})})
          ]})
        ]}),
        (0,L.jsxs)(\`div\`,{children:[
          (0,L.jsx)(\`h4\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Categories\`}),
          (0,L.jsxs)(\`ul\`,{className:\`mt-3 space-y-2 text-xs font-medium\`,children:[
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/values?category=pets\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Pets\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/values?category=signs\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Trading Signs / Adds\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/values?category=vehicles\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Vehicles\`})}),
            (0,L.jsx)(\`li\`,{children:(0,L.jsx)(jt,{to:\`/values?category=petwear\`,className:\`text-foreground/80 hover:text-primary\`,children:\`Pet Wear\`})})
          ]})
        ]})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-8 border-t border-border pt-6 text-center space-y-2 text-xs text-muted-foreground\`,children:[
        (0,L.jsx)(\`p\`,{className:\`font-bold text-foreground/80\`,children:\`© 2026 GLITCH VALUES (AMGV). All rights reserved.\`}),
        (0,L.jsx)(\`p\`,{className:\`max-w-3xl mx-auto leading-relaxed text-[11px]\`,children:\`Adopt Me! is a registered trademark of Uplift Games LLC. Roblox is a registered trademark of Roblox Corporation. GLITCH VALUES (AMGV) is an independent, non-commercial fan community tool and is NOT partnered, affiliated, or sponsored by Uplift Games, Roblox, AMVGG, or Elvebredd.\`})
      ]})
    ]})
  );
}
`;

js = js.substring(0, idxKgStart) + newKg + js.substring(idxKgEnd);
console.log("[OK] Patched kg (Footer with copyright and disclaimer)");

fs.writeFileSync(filePath, js);
