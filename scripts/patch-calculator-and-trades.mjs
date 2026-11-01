import fs from 'fs';

const filePath = '/app/applet/public/assets/index-62U8YsPh.js';
let js = fs.readFileSync(filePath, 'utf8');

// 1. Patch a_ and l_ (Calculator & 18 slots with + to add more)
const targetAStart = "function a_({items:e,onAdd:t,onRemove:n,accent:r}){";
const targetLEnd = "var u_=[{key:`fly`";

const idxA = js.indexOf(targetAStart);
const idxU = js.indexOf(targetLEnd);

if (idxA === -1 || idxU === -1) {
  console.error("Could not find a_ or l_ in bundle!");
  process.exit(1);
}

const newAandL = `function a_({items:e,onAdd:t,onRemove:n,onDuplicate:r,accent:i}){
  let a=[];
  for(let o=0;o<18;o++){
    let s=e[o],c=o===e.length;
    if(s){
      a.push((0,L.jsxs)(\`div\`,{className:\`group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary/70 flex flex-col items-center justify-center p-1 hover:border-primary/50 transition-colors\`,children:[
        (0,L.jsx)(xg,{item:s,className:\`glitch-img h-full w-full object-contain\`}),
        (0,L.jsxs)(\`div\`,{className:\`absolute inset-x-0 bottom-0 flex items-center justify-center gap-0.5 bg-background/90 px-1 py-0.5 backdrop-blur-xs\`,children:[
          (0,L.jsx)(\`span\`,{className:\`max-w-[70%] truncate text-[9px] font-bold\`,children:s.name}),
          s.category===\`pets\`&&(0,L.jsx)(Fg,{potion:s.potion})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`absolute right-0.5 top-0.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10\`,children:[
          e.length<18&&(0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>r?.(s),title:\`Add another (\${e.length}/18)\`,className:\`rounded-md bg-primary p-1 text-primary-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Mi,{className:\`h-2.5 w-2.5\`})}),
          (0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>n(s.uid),title:\`Remove\`,className:\`rounded-md bg-destructive p-1 text-destructive-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Zi,{className:\`h-2.5 w-2.5\`})})
        ]})
      ]},s.uid));
    } else if(c&&e.length<18){
      a.push((0,L.jsx)(\`button\`,{type:\`button\`,onClick:t,title:\`Add pet or item (\${e.length}/18)\`,className:\`flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed transition-all hover:scale-102 \${i}\`,children:(0,L.jsx)(\`span\`,{className:\`flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30\`,children:(0,L.jsx)(Mi,{className:\`h-4 w-4\`})})},\`add\`));
    } else {
      a.push((0,L.jsx)(\`div\`,{className:\`aspect-square rounded-xl border border-dashed border-border/30 bg-secondary/15\`},\`empty-\${o}\`));
    }
  }
  return (0,L.jsxs)(\`div\`,{className:\`w-full max-w-[390px]\`,children:[
    (0,L.jsxs)(\`div\`,{className:\`mb-2 flex items-center justify-between text-[11px] font-extrabold tracking-wider text-muted-foreground uppercase\`,children:[
      (0,L.jsxs)(\`span\`,{className:\`flex items-center gap-1.5\`,children:[
        (0,L.jsx)(\`span\`,{className:\`h-2 w-2 rounded-full \${e.length>=18?\`bg-amber-400\`:\`bg-primary\`}\`}),
        e.length,\` / 18 items\`
      ]}),
      e.length>=18?(0,L.jsx)(\`span\`,{className:\`rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-300\`,children:\`Max reached\`}):(0,L.jsx)(\`span\`,{className:\`text-[10px] text-primary/80\`,children:\`Click + on pet to add more\`})
    ]}),
    (0,L.jsx)(\`div\`,{className:\`grid grid-cols-3 sm:grid-cols-6 gap-1.5\`,children:a})
  ]});
}
var o_={WIN:\`bg-gradient-to-r from-green-500 to-emerald-400 text-white\`,FAIR:\`bg-gradient-to-r from-amber-500 to-yellow-400 text-white\`,LOSE:\`bg-gradient-to-r from-red-500 to-rose-400 text-white\`,UNPRICED:\`bg-secondary text-muted-foreground\`};
function s_(e,t){let n=Math.max(e,t);return n<=0||Math.abs(e-t)/n<.1?\`FAIR\`:e>t?\`WIN\`:\`LOSE\`}
var c_=(e,t)=>e+t>0?Math.round(e/(e+t)*100):50;

function l_(){
  let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(null),[c,l]=(0,_.useState)(\`both\`),
  u=(e,t)=>e.reduce((e,n)=>e+(n[t]||0),0),
  d=u(e,\`elve\`),f=u(n,\`elve\`),p=u(e,\`amvgg\`),m=u(n,\`amvgg\`),
  h=s_(d,f),g=s_(p,m),
  v=(e,t)=>e>0||t>0,
  y=()=>Math.random().toString(36).slice(2),
  b=e=>t(t=>t.filter(t=>t.uid!==e)),
  x=e=>r(t=>t.filter(t=>t.uid!==e)),
  S=()=>{t([]),r([])},
  addMore=(item,side)=>{
    let list=side===\`you\`?e:n;
    if(list.length>=18)return;
    let copy={...item,uid:y()};
    if(side===\`you\`)t(prev=>[...prev,copy]);
    else r(prev=>[...prev,copy]);
  },
  C=e=>{
    let{pet:nItem,side:iSide}=o;
    let aVal=ng(nItem,e);
    let cItem={...nItem,potion:e,elve:aVal.elve,amvgg:aVal.amvgg,value:aVal.amvgg,uid:y()};
    iSide===\`you\`?t(prev=>prev.length<18?[...prev,cItem]:prev):r(prev=>prev.length<18?[...prev,cItem]:prev);
    s(null);
  };

  (0,_.useEffect)(()=>{
    let handler=evt=>{evt.key===\`Escape\`&&(a(null),s(null))};
    return window.addEventListener(\`keydown\`,handler),()=>window.removeEventListener(\`keydown\`,handler);
  },[]);

  let w=t=>[...e,...n].every(e=>typeof e[t]==\`number\`);
  let T=[
    {key:\`Amvgg\`,you:p,them:m,complete:w(\`amvgg\`),status:w(\`amvgg\`)?g:\`UNPRICED\`},
    {key:\`Elve\`,you:d,them:f,complete:w(\`elve\`),status:w(\`elve\`)?h:\`UNPRICED\`}
  ];
  let E=e.length>0||n.length>0;
  let D=T.filter(e=>c===\`both\`||(c===\`amvgg\`?e.key===\`Amvgg\`:e.key===\`Elve\`));

  return(0,L.jsxs)(\`div\`,{className:\`min-h-screen bg-background text-foreground\`,children:[
    (0,L.jsx)(Og,{}),
    (0,L.jsxs)(\`div\`,{className:\`mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-primary/5 to-pink-500/20 p-px shadow-xl\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`rounded-[2.5rem] bg-card px-6 py-6 sm:px-12 sm:py-8\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center justify-center gap-6\`,children:[
            (0,L.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-widest text-primary\`,children:\`Your offer value\`}),
            (0,L.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-widest text-pink-300\`,children:\`Their offer value\`})
          ]}),
          (0,L.jsx)(\`div\`,{className:\`mt-3 flex flex-wrap justify-center gap-2\`,children:[[\`both\`,\`Both scales\`],[\`amvgg\`,\`AMVGG scale\`],[\`elve\`,\`Elvebredd scale\`]].map(([eVal,tLabel])=>(0,L.jsx)(\`button\`,{onClick:()=>l(eVal),className:\`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors \${c===eVal?\`bg-primary text-primary-foreground\`:\`bg-secondary text-muted-foreground hover:text-foreground\`}\`,children:tLabel},eVal))}),
          D.map(item=>(0,L.jsxs)(\`div\`,{className:\`mt-5\`,children:[
            (0,L.jsxs)(\`div\`,{className:\`flex items-center justify-between\`,children:[
              (0,L.jsx)(\`span\`,{className:\`text-xs font-bold uppercase tracking-widest text-muted-foreground\`,children:item.key}),
              (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-3\`,children:[
                (0,L.jsx)(\`span\`,{className:\`text-sm font-black text-primary\`,children:tg(item.complete?item.you:null)}),
                (0,L.jsx)(\`span\`,{className:\`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest \${o_[item.status]}\`,children:item.status}),
                (0,L.jsx)(\`span\`,{className:\`text-sm font-black text-pink-300\`,children:tg(item.complete?item.them:null)})
              ]})
            ]}),
            (0,L.jsx)(\`div\`,{className:\`mt-1.5 flex h-3 gap-1 overflow-hidden rounded-full bg-secondary\`,children:item.complete&&v(item.you,item.them)?(0,L.jsxs)(L.Fragment,{children:[
              (0,L.jsx)(\`div\`,{className:\`h-full rounded-full bg-gradient-to-r from-primary to-cyan-300 transition-all duration-300\`,style:{width:\`\${c_(item.you,item.them)}%\`}}),
              (0,L.jsx)(\`div\`,{className:\`h-full flex-1 rounded-full bg-gradient-to-r from-pink-300/50 to-pink-400/50\`})
            ]}):null}),
            item.complete&&v(item.you,item.them)&&(0,L.jsxs)(\`div\`,{className:\`mt-1 flex justify-between text-[10px] font-bold uppercase tracking-widest\`,children:[
              (0,L.jsxs)(\`span\`,{className:\`text-primary\`,children:[\`You \`,c_(item.you,item.them),\`%\`]}),
              (0,L.jsxs)(\`span\`,{className:\`text-pink-300\`,children:[\`Them \`,100-c_(item.you,item.them),\`%\`]})
            ]})
          ]},item.key))
        ]}),
        (0,L.jsx)(\`div\`,{className:\`scan-sweep\`})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-6 rounded-[2.5rem] border border-border bg-card p-5 sm:p-10\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`grid items-start justify-items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`w-full flex flex-col items-center\`,children:[
            (0,L.jsx)(\`p\`,{className:\`mb-3 text-center text-xs font-bold uppercase tracking-widest text-primary\`,children:\`Your offer (max 18)\`}),
            (0,L.jsx)(a_,{items:e,onAdd:()=>a(\`you\`),onRemove:b,onDuplicate:item=>addMore(item,\`you\`),accent:\`border-primary/40 hover:bg-primary/10\`})
          ]}),
          (0,L.jsxs)(\`div\`,{className:\`flex flex-col items-center gap-3 self-center\`,children:[
            (0,L.jsx)(\`span\`,{className:\`text-3xl font-black tracking-tight text-primary sm:text-5xl\`,children:\`WFL\`}),
            (0,L.jsx)(\`button\`,{onClick:S,className:\`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-primary\`,title:\`Reset trade\`,children:(0,L.jsx)(Ni,{className:\`h-4 w-4\`})}),
            (0,L.jsx)(jt,{to:\`/trades\`,className:\`mt-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20\`,children:\`List on Trades\`})
          ]}),
          (0,L.jsxs)(\`div\`,{className:\`w-full flex flex-col items-center\`,children:[
            (0,L.jsx)(\`p\`,{className:\`mb-3 text-center text-xs font-bold uppercase tracking-widest text-pink-300\`,children:\`Their offer (max 18)\`}),
            (0,L.jsx)(a_,{items:n,onAdd:()=>a(\`them\`),onRemove:x,onDuplicate:item=>addMore(item,\`them\`),accent:\`border-pink-400/40 hover:bg-pink-400/10\`})
          ]})
        ]}),
        !E&&(0,L.jsxs)(\`p\`,{className:\`mt-8 text-center text-xs text-muted-foreground\`,children:[
          \`Tap the \`,
          (0,L.jsx)(Mi,{className:\`inline h-3.5 w-3.5 text-primary\`}),
          \` to add up to 18 pets or trading signs (Small Add, OP, Neons, etc.). Click + on any pet card to add more.\`
        ]})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-6 flex flex-wrap items-center justify-center gap-3\`,children:[
        (0,L.jsx)(jt,{to:\`/values\`,className:\`rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90\`,children:\`Browse Value List\`}),
        (0,L.jsx)(jt,{to:\`/trades\`,className:\`rounded-full border border-border bg-card px-6 py-2.5 text-xs font-bold text-foreground transition-colors hover:border-primary\`,children:\`Community Trades\`})
      ]})
    ]}),
    i&&(0,L.jsx)(i_,{
      onSelect:pet=>{
        if(pet.is_sign||pet.category===\`signs\`){
          let signItem={...pet,potion:{fly:!1,ride:!1,neon:!1,mega:!1},elve:0,amvgg:0,value:0,uid:y()};
          i===\`you\`?t(prev=>prev.length<18?[...prev,signItem]:prev):r(prev=>prev.length<18?[...prev,signItem]:prev);
          a(null);
        } else {
          s({pet,side:i});
        }
      },
      excludeIds:[],
      onClose:()=>a(null)
    }),
    o&&(0,L.jsx)(Lg,{pet:o.pet,mode:\`calculator\`,sideLabel:o.side===\`you\`?\`your offer\`:\`their offer\`,onConfirm:C,onClose:()=>s(null)}),
    (0,L.jsx)(kg,{})
  ]});
}
`;

js = js.substring(0, idxA) + newAandL + js.substring(idxU);
console.log("[OK] Patched a_ (18 slots, + add more) and l_ (calculator signs handling)");

fs.writeFileSync(filePath, js);
