import fs from 'fs';

let content = fs.readFileSync('public/assets/index-62U8YsPh.js', 'utf8');
console.log('Original content length:', content.length);

// 1. Clean up Admin Panel Tq: Remove exotic editor, giveaways, suggestions
const tqStart = content.indexOf('function Tq({qc:e}){');
const tqNext = content.indexOf('var Eq=', tqStart);

if (tqStart !== -1 && tqNext !== -1) {
  const newTq = `function Tq({qc:e}){
  let{data:b}=rc({queryKey:[\`admin-stats\`],queryFn:async()=>({total:await Y.entities.Pet.count({catalog_status:\`active\`}),zero:await Y.entities.Pet.count({catalog_status:\`active\`,$or:[{amvgg_verified:{$ne:!0}},{elvebredd_verified:{$ne:!0}}]})})});
  return(0,L.jsxs)(\`div\`,{className:\`mx-auto max-w-3xl px-4 py-8 sm:px-6\`,children:[
    (0,L.jsxs)(\`div\`,{className:\`flex items-center justify-between\`,children:[
      (0,L.jsx)(\`h1\`,{className:\`text-2xl font-black tracking-tight glitch-text\`,\"data-text\":\`ADMIN PANEL\`,children:\`ADMIN PANEL\`}),
      (0,L.jsxs)(\`div\`,{className:\`flex gap-2 text-xs font-bold text-muted-foreground\`,children:[
        (0,L.jsxs)(\`span\`,{className:\`rounded-full bg-secondary px-3 py-1\`,children:[b?.total??\`—\`,\` items\`]}),
        (0,L.jsx)(\`span\`,{className:\`rounded-full bg-primary/20 text-primary px-3 py-1\`,children:\`Auto-Sync Active\`})
      ]})
    ]}),
    (0,L.jsx)(j_,{}),
    (0,L.jsx)(lq,{}),
    (0,L.jsx)(yq,{})
  ]});
}`;
  content = content.slice(0, tqStart) + newTq + content.slice(tqNext);
  console.log('Successfully updated Tq admin panel.');
} else {
  console.error('Failed to locate Tq boundaries.');
}

// 2. Update Music Tracks Nq and Synth Engine in Vq
const nqIdx = content.indexOf('var kq=`amgv_music_volume`');
const vqEndIdx = content.indexOf('return{ctx:e,master:t,filter:n,get playing()', nqIdx);

if (nqIdx !== -1 && vqEndIdx !== -1) {
  const targetBlock = content.slice(nqIdx, vqEndIdx);
  // Replace Nq tracks
  let updatedBlock = targetBlock.replace(
    /Nq=\[\{id:`aurora`[\s\S]*?\{id:`rainfall`[\s\S]*?\}\]/,
    `Nq=[{id:\`aurora\`,name:\`Lo-Fi Coffee Chill\`,description:\`Warm cozy jazz keys & mellow acoustic chill\`},{id:\`moonlight\`,name:\`Midnight Cyber Beats\`,description:\`Velvety neo-soul chords with soft sub-groove\`},{id:\`cloud\`,name:\`Rainy Window Glow\`,description:\`Dreamy Rhodes progression with warm vinyl flutter\`},{id:\`rainfall\`,name:\`Tokyo Study Chill\`,description:\`Soothing ambient chillhop with gentle tape warmth\`}]`
  );

  // Update v chords and filter frequencies inside Vq
  // Find v={aurora:...} inside updatedBlock
  const vChordsPattern = /v=\{aurora:\{filter:1700[\s\S]*?hatEvery:750\}\}/;
  const newVChords = `v={
    aurora:{filter:580,echoGain:.25,chords:[[130.81,164.81,196,246.94],[110,164.81,196,220],[146.83,174.61,220,261.63],[98,146.83,174.61,246.94]],chordEvery:9000,osc:\`sine\`,detunes:[0,3],padGain:.07,padAttack:3.2,padRelease:10,melodyEvery:3200,melodyChance:.45,melodyOsc:\`sine\`,melodyGain:.04,melodyDecay:2.4,scale:[261.63,293.66,329.63,392,440,523.25]},
    moonlight:{filter:520,echoGain:.25,chords:[[174.61,220,261.63,329.63],[164.81,196,246.94,293.66],[146.83,174.61,220,261.63],[130.81,164.81,196,246.94]],chordEvery:9500,osc:\`triangle\`,detunes:[0,-3],padGain:.065,padAttack:3,padRelease:11,melodyEvery:2600,melodyChance:.5,melodyOsc:\`triangle\`,melodyGain:.04,melodyDecay:2,scale:[261.63,329.63,392,440,523.25]},
    cloud:{filter:480,echoGain:.3,vinyl:!0,chords:[[155.56,196,233.08,293.66],[130.81,155.56,196,233.08],[174.61,207.65,261.63,311.13],[116.54,146.83,174.61,233.08]],chordEvery:11000,osc:\`sine\`,detunes:[0,3],padGain:.075,padAttack:3.5,padRelease:12,melodyEvery:4000,melodyChance:.35,melodyOsc:\`sine\`,melodyGain:.035,melodyDecay:2.8,scale:[311.13,349.23,392,466.16,523.25]},
    rainfall:{filter:540,echoGain:.25,rain:!0,chords:[[207.65,261.63,311.13,392],[196,233.08,293.66,349.23],[174.61,207.65,261.63,311.13],[155.56,196,233.08,293.66]],chordEvery:8500,osc:\`sine\`,detunes:[0,-3],padGain:.065,padAttack:2.8,padRelease:9,melodyEvery:2800,melodyChance:.4,melodyOsc:\`sine\`,melodyGain:.035,melodyDecay:2,scale:[261.63,311.13,349.23,392,466.16]}
  }`;

  updatedBlock = updatedBlock.replace(vChordsPattern, newVChords);
  // Also adjust master filter in Vq from 1400 to 600
  updatedBlock = updatedBlock.replace('n.frequency.value=1400', 'n.frequency.value=600');

  content = content.slice(0, nqIdx) + updatedBlock + content.slice(vqEndIdx);
  console.log('Successfully updated Music Engine & Lo-Fi tracks.');
} else {
  console.error('Failed to locate Music Engine blocks.');
}

// 3. Add CreditsPage component and route in GY
const gyIdx = content.indexOf('var GY=()=>');
if (gyIdx !== -1) {
  const creditsPageComponent = `function CreditsPage(){
  return(0,L.jsxs)(\`div\`,{className:\`min-h-screen bg-background flex flex-col\`,children:[
    (0,L.jsx)(Og,{}),
    (0,L.jsxs)(\`main\`,{className:\`mx-auto max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`text-center\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary\`,children:[
          (0,L.jsx)(Tg,{size:18}),
          \`Transparency & Community Disclaimer\`
        ]}),
        (0,L.jsxs)(\`h1\`,{className:\`text-4xl font-black tracking-tight sm:text-5xl glitch-text\`,\"data-text\":\`CREDITS & DISCLAIMER\`,children:[
          \`CREDITS & \`,
          (0,L.jsx)(\`span\`,{className:\`text-primary\`,children:\`DISCLAIMER\`})
        ]}),
        (0,L.jsx)(\`p\`,{className:\`mx-auto mt-4 max-w-2xl text-base text-muted-foreground\`,children:\`Glitch Values (AMGV) is an independent, non-commercial community tool crafted for the Roblox Adopt Me player community. We are not a corporate entity — we are players providing an honest, transparent trading utility.\`})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-10 grid gap-6 md:grid-cols-2\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`rounded-3xl border border-primary/20 bg-card p-6 shadow-lg\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-3\`,children:[
            (0,L.jsx)(\`div\`,{className:\`flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary\`,children:(0,L.jsx)(Tg,{size:20})}),
            (0,L.jsx)(\`h2\`,{className:\`text-lg font-bold text-foreground\`,children:\`Not Affiliated with AMVGG or Elvebredd\`})
          ]}),
          (0,L.jsx)(\`p\`,{className:\`mt-3 text-sm leading-relaxed text-muted-foreground\`,children:\`AMGV references publicly accessible market estimates and trading consensus from community value lists (including amvgg.com and elvebredd.com) to provide honest W/F/L comparisons. AMGV is NOT officially endorsed by, affiliated with, sponsored by, or partner-contracted with amvgg.com or elvebredd.com.\`})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`rounded-3xl border border-border bg-card p-6 shadow-lg\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-3\`,children:[
            (0,L.jsx)(\`div\`,{className:\`flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400\`,children:(0,L.jsx)(ii,{className:\`h-5 w-5\`})}),
            (0,L.jsx)(\`h2\`,{className:\`text-lg font-bold text-foreground\`,children:\`Roblox & Uplift Games Notice\`})
          ]}),
          (0,L.jsx)(\`p\`,{className:\`mt-3 text-sm leading-relaxed text-muted-foreground\`,children:\`Adopt Me! and Roblox are registered trademarks of Uplift Games LLC and Roblox Corporation respectively. All pet icons, character models, item artwork, and game titles are the intellectual property of their respective copyright holders. This website is a free fan-made companion calculator.\`})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`rounded-3xl border border-border bg-card p-6 shadow-lg\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-3\`,children:[
            (0,L.jsx)(\`div\`,{className:\`flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400\`,children:(0,L.jsx)(oi,{className:\`h-5 w-5\`})}),
            (0,L.jsx)(\`h2\`,{className:\`text-lg font-bold text-foreground\`,children:\`Free & Built For The Players\`})
          ]}),
          (0,L.jsx)(\`p\`,{className:\`mt-3 text-sm leading-relaxed text-muted-foreground\`,children:\`Our purpose is to give everyday traders a fast, clean, and reliable tool: 18-slot Roblox trading capacity, pet duplication (+) without losing catalog search, trading signs (OP, HTT, Big Add, etc.), community trade mailbox, and live Win/Fair/Lose analysis with zero paywalls.\`})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`rounded-3xl border border-border bg-card p-6 shadow-lg\`,children:[
          (0,L.jsxs)(\`div\`,{className:\`flex items-center gap-3\`,children:[
            (0,L.jsx)(\`div\`,{className:\`flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400\`,children:(0,L.jsx)(zi,{className:\`h-5 w-5\`})}),
            (0,L.jsx)(\`h2\`,{className:\`text-lg font-bold text-foreground\`,children:\`Staff & Community Creators\`})
          ]}),
          (0,L.jsx)(\`p\`,{className:\`mt-3 text-sm leading-relaxed text-muted-foreground\`,children:\`Maintained with love by ocean and dedicated community contributors. Automated catalog scrapers run every 30 minutes to fetch new pet releases, while staff oversee values to prevent manipulation and keep calculations accurate.\`})
        ]})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-8 rounded-3xl border border-primary/30 bg-primary/5 p-6 text-center sm:p-8\`,children:[
        (0,L.jsx)(\`h3\`,{className:\`text-lg font-bold text-primary\`,children:\`Fair Trading Pledge\`}),
        (0,L.jsx)(\`p\`,{className:\`mx-auto mt-2 max-w-xl text-sm text-muted-foreground\`,children:\`Never get scammed or lose value on a trade. Always double-check values and demand, verify in-game trade slots, and enjoy trading!\`})
      ]})
    ]}),
    (0,L.jsx)(kg,{})
  ]});
}
`;
  content = content.slice(0, gyIdx) + creditsPageComponent + content.slice(gyIdx);
  console.log('Successfully inserted CreditsPage component.');

  // Now route /credits and redirect /suggestions, /giveaways
  content = content.replace(
    `(0,L.jsx)(mt,{path:\`/suggestions\`,element:(0,L.jsx)(Dq,{})}),(0,L.jsx)(mt,{path:\`/settings\`,element:(0,L.jsx)(jJ,{})}),(0,L.jsx)(mt,{path:\`/giveaways\`,element:(0,L.jsx)(RJ,{})})`,
    `(0,L.jsx)(mt,{path:\`/credits\`,element:(0,L.jsx)(CreditsPage,{})}),(0,L.jsx)(mt,{path:\`/settings\`,element:(0,L.jsx)(jJ,{})}),(0,L.jsx)(mt,{path:\`/suggestions\`,element:(0,L.jsx)(ft,{to:\`/\`,replace:!0})}),(0,L.jsx)(mt,{path:\`/giveaways\`,element:(0,L.jsx)(ft,{to:\`/\`,replace:!0})})`
  );
  console.log('Successfully updated router with /credits and redirects for suggestions & giveaways.');
}

// 4. Update Chat __ send function with optimistic update
const chatSendIdx = content.indexOf('w=async()=>{if(!(!e.trim()||i)){a(!0);try{await Y.entities.ChatMessage.create(C({text:e.trim()})),t(``),r(null)}finally{a(!1)}}};');
if (chatSendIdx !== -1) {
  const newChatSend = `w=async()=>{
    let txt=e.trim();
    if(!txt||i)return;
    a(!0);
    let optMsg={id:\`msg_\`+Date.now()+\`_\`+Math.random().toString(36).slice(2,6),created_date:new Date().toISOString(),...C({text:txt})};
    l(prev=>prev.some(m=>m.id===optMsg.id)?prev:[...prev,optMsg]);
    t(\`\`);
    r(null);
    try{
      let res=await Y.entities.ChatMessage.create(C({text:txt}));
      if(res?.id){l(prev=>prev.map(m=>m.id===optMsg.id?res:m))}
    }catch(err){console.warn(\`Chat create notice\`,err)}finally{a(!1)}
  };`;
  content = content.replace(
    'w=async()=>{if(!(!e.trim()||i)){a(!0);try{await Y.entities.ChatMessage.create(C({text:e.trim()})),t(``),r(null)}finally{a(!1)}}};',
    newChatSend
  );
  console.log('Successfully updated Chat send with optimistic rendering.');
} else {
  console.log('Chat send pattern check alternative...');
}

// Write back to public/assets/index-62U8YsPh.js
fs.writeFileSync('public/assets/index-62U8YsPh.js', content, 'utf8');
console.log('Finished writing updated bundle. New length:', content.length);
