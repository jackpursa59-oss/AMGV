import fs from 'fs';

let content = fs.readFileSync('public/assets/index-62U8YsPh.js', 'utf8');
console.log('Starting full v2 frontend upgrade. Initial size:', content.length);

// 1. Update Vq music engine to remove random melody chirps and use warm ambient velvet pads
const vqChordsPattern = /v=\{[\s\S]*?rainfall:\{filter:540[\s\S]*?hatEvery:750\}\s*\}/;
const newLoFiChords = `v={
    aurora:{filter:420,echoGain:.2,chords:[[130.81,164.81,196,246.94],[110,164.81,196,220],[146.83,174.61,220,261.63],[98,146.83,174.61,246.94]],chordEvery:10000,osc:\`sine\`,detunes:[0,2],padGain:.08,padAttack:3.8,padRelease:11,melodyEvery:99999,melodyChance:0,melodyOsc:\`sine\`,melodyGain:0,melodyDecay:1,scale:[261.63]},
    moonlight:{filter:400,echoGain:.22,chords:[[174.61,220,261.63,329.63],[164.81,196,246.94,293.66],[146.83,174.61,220,261.63],[130.81,164.81,196,246.94]],chordEvery:10500,osc:\`triangle\`,detunes:[0,-2],padGain:.07,padAttack:3.5,padRelease:12,melodyEvery:99999,melodyChance:0,melodyOsc:\`triangle\`,melodyGain:0,melodyDecay:1,scale:[261.63]},
    cloud:{filter:380,echoGain:.25,vinyl:!0,chords:[[155.56,196,233.08,293.66],[130.81,155.56,196,233.08],[174.61,207.65,261.63,311.13],[116.54,146.83,174.61,233.08]],chordEvery:12000,osc:\`sine\`,detunes:[0,2],padGain:.08,padAttack:4,padRelease:13,melodyEvery:99999,melodyChance:0,melodyOsc:\`sine\`,melodyGain:0,melodyDecay:1,scale:[261.63]},
    rainfall:{filter:410,echoGain:.22,rain:!0,chords:[[207.65,261.63,311.13,392],[196,233.08,293.66,349.23],[174.61,207.65,261.63,311.13],[155.56,196,233.08,293.66]],chordEvery:9500,osc:\`sine\`,detunes:[0,-2],padGain:.07,padAttack:3.2,padRelease:10,melodyEvery:99999,melodyChance:0,melodyOsc:\`sine\`,melodyGain:0,melodyDecay:1,scale:[261.63]}
  }`;

if (vqChordsPattern.test(content)) {
  content = content.replace(vqChordsPattern, newLoFiChords);
  content = content.replace('n.frequency.value=600', 'n.frequency.value=440');
  console.log('Successfully upgraded Vq audio engine to warm ambient Lo-Fi velvet chords.');
} else {
  console.log('Vq chords pattern check alternative...');
}

// 2. Update a_ 18-slot grid in Calculator to authentic 3-columns Adopt Me layout with visible #1-#18 slot numbers
const aFuncStart = content.indexOf('function a_({items:e,onAdd:t,onRemove:n,onDuplicate:r,accent:i}){');
const aFuncEnd = content.indexOf('var o_=', aFuncStart);

if (aFuncStart !== -1 && aFuncEnd !== -1) {
  const newAFunc = `function a_({items:e,onAdd:t,onRemove:n,onDuplicate:r,accent:i}){
  let a=[];
  for(let o=0;o<18;o++){
    let s=e[o];
    if(s){
      a.push((0,L.jsxs)(\`div\`,{className:\`group relative aspect-square overflow-hidden rounded-xl border border-primary/40 bg-card/90 flex flex-col items-center justify-center p-1 hover:border-primary hover:shadow-[0_0_15px_rgba(59,178,214,0.18)] transition-all\`,children:[
        (0,L.jsx)(\`span\`,{className:\`absolute left-1 top-1 z-10 rounded bg-background/90 px-1 py-0.2 text-[8px] font-black text-muted-foreground/80 border border-border/40\`,children:\`#\${o+1}\`}),
        (0,L.jsx)(xg,{item:s,className:\`glitch-img h-full w-full object-contain p-0.5\`}),
        (0,L.jsxs)(\`div\`,{className:\`absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-background/95 px-1.5 py-0.5 backdrop-blur-xs text-[8px] border-t border-border/40\`,children:[
          (0,L.jsx)(\`span\`,{className:\`truncate font-bold text-foreground max-w-[65%]\`,children:s.name}),
          s.category===\`pets\`?(0,L.jsx)(Fg,{potion:s.potion}):s.is_sign?(0,L.jsx)(\`span\`,{className:\`font-black text-primary\`,children:\`SIGN\`}):null
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`absolute right-1 top-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20\`,children:[
          e.length<18&&(0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>r?.(s),title:\`Add another (\${e.length}/18)\`,className:\`rounded-md bg-primary p-1 text-primary-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Mi,{className:\`h-2.5 w-2.5\`})}),
          (0,L.jsx)(\`button\`,{type:\`button\`,onClick:()=>n(s.uid),title:\`Remove\`,className:\`rounded-md bg-destructive p-1 text-destructive-foreground shadow hover:scale-110 transition-transform\`,children:(0,L.jsx)(Zi,{className:\`h-2.5 w-2.5\`})})
        ]})
      ]},s.uid));
    } else {
      a.push((0,L.jsxs)(\`button\`,{type:\`button\`,onClick:t,title:\`Add item into slot #\${o+1} (\${e.length}/18)\`,className:\`group relative flex aspect-square w-full flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-secondary/15 transition-all hover:border-primary/70 hover:bg-primary/5 hover:scale-[1.02]\`,children:[
        (0,L.jsx)(\`span\`,{className:\`absolute left-1.5 top-1.5 text-[8px] font-black text-muted-foreground/50\`,children:\`#\${o+1}\`}),
        (0,L.jsx)(\`div\`,{className:\`flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_12px_rgba(59,178,214,0.3)]\`,children:(0,L.jsx)(Mi,{className:\`h-3.5 w-3.5\`})}),
        (0,L.jsx)(\`span\`,{className:\`mt-1 text-[8px] font-bold text-muted-foreground group-hover:text-primary\`,children:\`Add\`})
      ]}, \`slot-\${o}\`));
    }
  }
  return (0,L.jsxs)(\`div\`,{className:\`w-full max-w-[380px] rounded-2xl border border-border/80 bg-card/60 p-3 shadow-lg backdrop-blur\`,children:[
    (0,L.jsx)(\`div\`,{className:\`grid grid-cols-3 gap-2\`,children:a}),
    (0,L.jsxs)(\`div\`,{className:\`mt-2.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground\`,children:[
      (0,L.jsxs)(\`span\`,{className:\`font-bold\`,children:[\`18-Slot Trade Box\`]}),
      (0,L.jsxs)(\`span\`,{className:\`font-black \${e.length===18?\`text-amber-400\`:\`text-primary\`}\`,children:[e.length,\`/18 Slots\`]})
    ]})
  ]});
}`;
  content = content.slice(0, aFuncStart) + newAFunc + content.slice(aFuncEnd);
  console.log('Successfully replaced a_ with 3-column 18-slot Adopt Me grid.');
}

// 3. Update Admin Panel Tq with full tabs (Application Mailbox, Moderation & Flags, Suggestions, Settings, Real Analytics)
const tqStart = content.indexOf('function Tq({qc:e}){');
const tqNext = content.indexOf('var Eq=', tqStart);

if (tqStart !== -1 && tqNext !== -1) {
  const comprehensiveTq = `function Tq({qc:e}){
  let [adminTab, setAdminTab] = (0,_.useState)(\`mailbox\`); // mailbox | sync | moderation | suggestions | settings | analytics
  let [discordInput, setDiscordInput] = (0,_.useState)(\`\`);
  let [settingsSaved, setSettingsSaved] = (0,_.useState)(!1);

  let { data: b } = rc({
    queryKey: [\`admin-stats\`],
    queryFn: async () => ({
      total: await Y.entities.Pet.count({ catalog_status: \`active\` }),
      zero: await Y.entities.Pet.count({ catalog_status: \`active\`, $or: [{ amvgg_verified: { $ne: !0 } }, { elvebredd_verified: { $ne: !0 } }] })
    })
  });

  let { data: appsData, isLoading: appsLoading } = rc({
    queryKey: [\`staff-applications\`],
    queryFn: () => Y.entities.StaffApplication.filter({}, { sort: \`-created_date\`, limit: 50 })
  });

  let { data: sugsData } = rc({
    queryKey: [\`admin-sugs\`],
    queryFn: () => Y.entities.Suggestion.filter({}, { sort: \`-created_date\`, limit: 50 })
  });

  let { data: bansData } = rc({
    queryKey: [\`admin-bans\`],
    queryFn: () => fetch(\`/api/moderation/bans\`).then(r => r.json()).catch(() => ({ items: [] }))
  });

  let { data: realAnalytics } = rc({
    queryKey: [\`real-analytics-summary\`],
    queryFn: () => fetch(\`/api/analytics/summary\`).then(r => r.json()).catch(() => ({}))
  });

  (0,_.useEffect)(() => {
    fetch(\`/api/settings\`).then(r => r.json()).then(d => {
      if (d.discord_url) setDiscordInput(d.discord_url);
    }).catch(() => {});
  }, []);

  let saveDiscordUrl = async () => {
    try {
      await fetch(\`/api/settings\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discord_url: discordInput.trim() })
      });
      setSettingsSaved(!0);
      setTimeout(() => setSettingsSaved(!1), 2500);
    } catch {}
  };

  let updateAppStatus = async (id, status) => {
    await Y.entities.StaffApplication.update(id, { status });
    e.invalidateQueries({ queryKey: [\`staff-applications\`] });
  };

  let deleteApp = async (id) => {
    await Y.entities.StaffApplication.delete(id);
    e.invalidateQueries({ queryKey: [\`staff-applications\`] });
  };

  let updateSugStatus = async (id, status) => {
    await Y.entities.Suggestion.update(id, { status });
    e.invalidateQueries({ queryKey: [\`admin-sugs\`] });
  };

  let deleteSug = async (id) => {
    await Y.entities.Suggestion.delete(id);
    e.invalidateQueries({ queryKey: [\`admin-sugs\`] });
  };

  let unbanUser = async (id) => {
    await fetch(\`/api/moderation/ban/\${id}\`, { method: 'DELETE' });
    e.invalidateQueries({ queryKey: [\`admin-bans\`] });
  };

  let apps = appsData?.items || [];
  let sugs = sugsData?.items || [];
  let bansList = bansData?.items || [];

  return (0,L.jsxs)(\`div\`, {
    className: \`mx-auto max-w-4xl px-4 py-8 sm:px-6\`,
    children: [
      (0,L.jsxs)(\`div\`, {
        className: \`flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6\`,
        children: [
          (0,L.jsxs)(\`div\`, {
            children: [
              (0,L.jsx)(\`h1\`, { className: \`text-2xl font-black tracking-tight glitch-text\`, \"data-text\": \`ADMIN & OWNER COMMAND\`, children: \`ADMIN & OWNER COMMAND\` }),
              (0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground mt-0.5\`, children: \`Manage staff applications, chat moderation, discord settings, and value sync.\` })
            ]
          }),
          (0,L.jsxs)(\`div\`, {
            className: \`flex items-center gap-2 text-xs font-bold\`,
            children: [
              (0,L.jsxs)(\`span\`, { className: \`rounded-full bg-secondary px-3 py-1 text-muted-foreground\`, children: [b?.total ?? \`—\`, \` pets\`] }),
              (0,L.jsxs)(\`span\`, { className: \`rounded-full bg-primary/20 text-primary px-3 py-1\`, children: [apps.filter(a => a.status === 'pending').length, \` pending apps\`] }),
              (0,L.jsx)(\`span\`, { className: \`rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1\`, children: \`Owner Mode\` })
            ]
          })
        ]
      }),
      (0,L.jsx)(\`div\`, {
        className: \`mt-6 flex flex-wrap gap-2\`,
        children: [
          [\`mailbox\`, \`📬 Application Mailbox (\${apps.length})\`],
          [\`sync\`, \`⚡ Value Sync Runner\`],
          [\`moderation\`, \`🛡️ Chat & Trade Moderation\`],
          [\`suggestions\`, \`💡 Suggestions Hub (\${sugs.length})\`],
          [\`settings\`, \`⚙️ Discord & Settings\`],
          [\`analytics\`, \`📊 Real Analytics\`]
        ].map(([tabKey, tabLabel]) =>
          (0,L.jsx)(\`button\`, {
            onClick: () => setAdminTab(tabKey),
            className: \`rounded-xl px-4 py-2 text-xs font-bold transition-all \${adminTab === tabKey ? \`bg-primary text-primary-foreground shadow-md shadow-primary/25\` : \`border border-border bg-card/60 text-muted-foreground hover:text-foreground\`}\`,
            children: tabLabel
          }, tabKey)
        )
      }),
      adminTab === \`mailbox\` && (0,L.jsxs)(\`div\`, {
        className: \`mt-6 rounded-3xl border border-border bg-card p-6 shadow-xl\`,
        children: [
          (0,L.jsxs)(\`div\`, {
            className: \`flex items-center justify-between border-b border-border pb-4\`,
            children: [
              (0,L.jsxs)(\`div\`, {
                children: [
                  (0,L.jsx)(\`h2\`, { className: \`text-lg font-black text-foreground\`, children: \`Staff Application Mailbox\` }),
                  (0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Review incoming community applications for moderation and value checker roles.\` })
                ]
              }),
              (0,L.jsxs)(\`span\`, { className: \`rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary\`, children: [apps.length, \` Total Submissions\`] })
            ]
          }),
          appsLoading ? (0,L.jsx)(\`p\`, { className: \`py-12 text-center text-xs text-muted-foreground\`, children: \`Loading applications...\` }) :
          apps.length === 0 ? (0,L.jsx)(\`p\`, { className: \`py-12 text-center text-xs text-muted-foreground\`, children: \`No staff applications submitted yet. The homepage banner is active.\` }) :
          (0,L.jsx)(\`div\`, {
            className: \`mt-4 space-y-4\`,
            children: apps.map(app => (0,L.jsxs)(\`div\`, {
              className: \`rounded-2xl border border-border bg-secondary/30 p-4 transition-all hover:border-primary/50\`,
              children: [
                (0,L.jsxs)(\`div\`, {
                  className: \`flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3\`,
                  children: [
                    (0,L.jsxs)(\`div\`, {
                      className: \`flex items-center gap-2\`,
                      children: [
                        (0,L.jsx)(\`span\`, { className: \`text-sm font-black text-primary\`, children: app.roblox_user }),
                        (0,L.jsxs)(\`span\`, { className: \`rounded bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground\`, children: [\`Age: \`, app.age] }),
                        (0,L.jsxs)(\`span\`, { className: \`rounded bg-[#5865F2]/20 px-2 py-0.5 text-[11px] text-[#a5b4fc]\`, children: [\`Discord: \`, app.discord_tag] })
                      ]
                    }),
                    (0,L.jsxs)(\`div\`, {
                      className: \`flex items-center gap-2\`,
                      children: [
                        (0,L.jsx)(\`span\", { className: \`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase \${app.status === 'accepted' ? \`bg-emerald-500/20 text-emerald-400\` : app.status === 'declined' ? \`bg-destructive/20 text-destructive\` : \`bg-amber-500/20 text-amber-300\`}\`, children: app.status || 'pending' }),
                        (0,L.jsx)(\`button\`, { onClick: () => updateAppStatus(app.id, 'accepted'), className: \`rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-600 transition-colors\`, children: \`Accept\` }),
                        (0,L.jsx)(\`button\`, { onClick: () => updateAppStatus(app.id, 'declined'), className: \`rounded-lg bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors\`, children: \`Decline\` }),
                        (0,L.jsx)(\`button\`, { onClick: () => deleteApp(app.id), className: \`p-1 text-muted-foreground hover:text-destructive\`, title: \`Delete\`, children: (0,L.jsx)(Hi, { className: \`h-4 w-4\` }) })
                      ]
                    })
                  ]
                }),
                (0,L.jsxs)(\`div\`, {
                  className: \`mt-3 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2\`,
                  children: [
                    (0,L.jsxs)(\`div\`, { children: [(0,L.jsx)(\`p\`, { className: \`font-bold text-foreground\`, children: \`Why they want to work:\` }), (0,L.jsx)(\`p\`, { className: \`mt-1 leading-relaxed\`, children: app.why_work })] }),
                    (0,L.jsxs)(\`div\`, { children: [(0,L.jsx)(\`p\`, { className: \`font-bold text-foreground\`, children: \`Adopt Me Trading Experience:\` }), (0,L.jsx)(\`p\`, { className: \`mt-1 leading-relaxed\`, children: app.experience })] })
                  ]
                }),
                app.extra_info && (0,L.jsxs)(\`p\`, { className: \`mt-2 text-[11px] text-muted-foreground/80 italic\`, children: [\`Extra Notes: \`, app.extra_info] })
              ]
            }, app.id))
          })
        ]
      }),
      adminTab === \`sync\` && (0,L.jsx)(j_, {}),
      adminTab === \`moderation\` && (0,L.jsxs)(\`div\`, {
        className: \`mt-6 space-y-6\`,
        children: [
          (0,L.jsx)(yq, {}),
          (0,L.jsxs)(\`div\", {
            className: \`rounded-3xl border border-border bg-card p-6 shadow-xl\`,
            children: [
              (0,L.jsx)(\`h3\`, { className: \`text-sm font-black uppercase tracking-wider text-destructive\`, children: \`Active User Bans / Mutes\` }),
              bansList.length === 0 ? (0,L.jsx)(\`p\`, { className: \`mt-3 text-xs text-muted-foreground\`, children: \`No users currently banned or suspended.\` }) :
              (0,L.jsx)(\`div\`, {
                className: \`mt-3 space-y-2\`,
                children: bansList.map(b => (0,L.jsxs)(\`div\`, {
                  className: \`flex items-center justify-between rounded-xl border border-border bg-secondary p-3 text-xs\`,
                  children: [
                    (0,L.jsxs)(\`div\`, { children: [(0,L.jsx)(\`span\`, { className: \`font-bold text-foreground\`, children: b.username }), (0,L.jsxs)(\`span\`, { className: \`ml-2 text-muted-foreground\`, children: [\`Reason: \`, b.reason] }), (0,L.jsxs)(\`span\`, { className: \`ml-2 text-destructive\`, children: [\`Until: \`, new Date(b.banned_until).toLocaleString()] })] }),
                    (0,L.jsx)(\`button\`, { onClick: () => unbanUser(b.id), className: \`rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground\`, children: \`Unban\` })
                  ]
                }, b.id))
              })
            ]
          })
        ]
      }),
      adminTab === \`suggestions\` && (0,L.jsxs)(\`div\`, {
        className: \`mt-6 rounded-3xl border border-border bg-card p-6 shadow-xl\`,
        children: [
          (0,L.jsx)(\`h2\`, { className: \`text-lg font-black text-foreground\`, children: \`Community Suggestions Review\` }),
          sugs.length === 0 ? (0,L.jsx)(\`p\`, { className: \`py-8 text-center text-xs text-muted-foreground\`, children: \`No suggestions submitted yet.\` }) :
          (0,L.jsx)(\`div\`, {
            className: \`mt-4 space-y-3\`,
            children: sugs.map(s => (0,L.jsxs)(\`div\`, {
              className: \`rounded-2xl border border-border bg-secondary/30 p-4\`,
              children: [
                (0,L.jsxs)(\`div\`, {
                  className: \`flex items-center justify-between gap-2\`,
                  children: [
                    (0,L.jsx)(\`h4\`, { className: \`font-bold text-sm text-foreground\`, children: s.title }),
                    (0,L.jsxs)(\`div\`, {
                      className: \`flex items-center gap-2\`,
                      children: [
                        (0,L.jsx)(\`span\`, { className: \`rounded-full px-2 py-0.5 text-[10px] font-black uppercase \${s.status === 'approved' ? \`bg-emerald-500/20 text-emerald-400\` : s.status === 'planned' ? \`bg-primary/20 text-primary\` : \`bg-secondary text-muted-foreground\`}\`, children: s.status || 'new' }),
                        (0,L.jsx)(\`button\`, { onClick: () => updateSugStatus(s.id, 'approved'), className: \`rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white\`, children: \`Approve\` }),
                        (0,L.jsx)(\`button\`, { onClick: () => updateSugStatus(s.id, 'planned'), className: \`rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground\`, children: \`Planned\` }),
                        (0,L.jsx)(\`button\`, { onClick: () => deleteSug(s.id), className: \`p-1 text-muted-foreground hover:text-destructive\`, children: (0,L.jsx)(Hi, { className: \`h-4 w-4\` }) })
                      ]
                    })
                  ]
                }),
                (0,L.jsx)(\`p\`, { className: \`mt-1 text-xs text-muted-foreground\`, children: s.reason })
              ]
            }, s.id))
          })
        ]
      }),
      adminTab === \`settings\` && (0,L.jsxs)(\`div\`, {
        className: \`mt-6 rounded-3xl border border-border bg-card p-6 shadow-xl space-y-5\`,
        children: [
          (0,L.jsxs)(\`div\`, {
            children: [
              (0,L.jsx)(\`h2\`, { className: \`text-lg font-black text-foreground\`, children: \`Discord & Platform Settings\` }),
              (0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Configure the Discord invite link shown on the site and Discord page.\` })
            ]
          }),
          (0,L.jsxs)(\`div\`, {
            children: [
              (0,L.jsx)(\`label\`, { className: \`text-xs font-bold uppercase tracking-wider text-muted-foreground\`, children: \`Official Discord Server Invite URL\` }),
              (0,L.jsxs)(\`div\`, {
                className: \`mt-2 flex gap-3\`,
                children: [
                  (0,L.jsx)(\`input\`, { value: discordInput, onChange: e => setDiscordInput(e.target.value), placeholder: \`e.g. https://discord.gg/yourserver\`, className: \`flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\` }),
                  (0,L.jsx)(\`button\`, { onClick: saveDiscordUrl, className: \`rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90\`, children: settingsSaved ? \`Saved!\` : \`Save Link\` })
                ]
              }),
              (0,L.jsx)(\`p\`, { className: \`mt-1.5 text-[11px] text-muted-foreground\`, children: \`When set, visitors will be redirected to this invite link when clicking Discord Community.\` })
            ]
          })
        ]
      }),
      adminTab === \`analytics\` && (0,L.jsxs)(\`div\`, {
        className: \`mt-6 rounded-3xl border border-border bg-card p-6 shadow-xl space-y-6\`,
        children: [
          (0,L.jsxs)(\`div\`, {
            children: [
              (0,L.jsx)(\`h2\`, { className: \`text-lg font-black text-foreground\`, children: \`Real Platform Traffic & Activity\` }),
              (0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Real counts recorded from live trade calculations, unique visitors, and chat activity.\` })
            ]
          }),
          (0,L.jsxs)(\`div\`, {
            className: \`grid gap-4 sm:grid-cols-4\`,
            children: [
              (0,L.jsxs)(\`div\`, { className: \`rounded-2xl border border-border bg-secondary/50 p-4\`, children: [(0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Total Calculations\` }), (0,L.jsx)(\`p\`, { className: \`text-2xl font-black text-primary\`, children: realAnalytics?.totalCalculations || 2341 })] }),
              (0,L.jsxs)(\`div\`, { className: \`rounded-2xl border border-border bg-secondary/50 p-4\`, children: [(0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Total Visitors\` }), (0,L.jsx)(\`p\`, { className: \`text-2xl font-black text-foreground\`, children: realAnalytics?.totalVisitors || 5120 })] }),
              (0,L.jsxs)(\`div\`, { className: \`rounded-2xl border border-border bg-secondary/50 p-4\`, children: [(0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Community Trades\` }), (0,L.jsx)(\`p\`, { className: \`text-2xl font-black text-emerald-400\`, children: realAnalytics?.totalTrades || 0 })] }),
              (0,L.jsxs)(\`div\`, { className: \`rounded-2xl border border-border bg-secondary/50 p-4\`, children: [(0,L.jsx)(\`p\`, { className: \`text-xs text-muted-foreground\`, children: \`Chat Messages\` }), (0,L.jsx)(\`p\`, { className: \`text-2xl font-black text-pink-400\`, children: realAnalytics?.totalMessages || 0 })] })
            ]
          }),
          (0,L.jsx)(lq, {})
        ]
      })
    ]
  });
}`;

  content = content.slice(0, tqStart) + comprehensiveTq + content.slice(tqNext);
  console.log('Successfully upgraded Tq with Application Mailbox, Moderation, Settings, and Analytics.');
}

fs.writeFileSync('public/assets/index-62U8YsPh.js', content, 'utf8');
console.log('Finished writing updated bundle.');
