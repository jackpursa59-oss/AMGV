import fs from 'fs';

let content = fs.readFileSync('public/assets/index-62U8YsPh.js', 'utf8');

// 1. Define new components right before CreditsPage
const creditsPageStart = content.indexOf('function CreditsPage(){');
if (creditsPageStart === -1) {
  console.error('Could not find CreditsPage start');
  process.exit(1);
}

const newComponents = `function DiscordPage(){
  let{data:settings}=rc({queryKey:[\`app-settings\`],queryFn:async()=>{try{let res=await fetch(\`/api/settings\`);return await res.json();}catch{return{};}}});
  let discordUrl=settings?.discord_url?.trim();
  return(0,L.jsxs)(\`div\`,{className:\`min-h-screen bg-background flex flex-col\`,children:[
    (0,L.jsx)(Og,{}),
    (0,L.jsxs)(\`main\`,{className:\`mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`relative overflow-hidden rounded-3xl border border-[#5865F2]/40 bg-gradient-to-b from-[#5865F2]/10 via-card to-background p-8 text-center sm:p-14 shadow-2xl\`,children:[
        (0,L.jsx)(\`div\`,{className:\`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#5865F2] text-white shadow-[0_0_40px_rgba(88,101,242,0.4)]\`,children:
          (0,L.jsx)(\`svg\`,{className:\`h-10 w-10 fill-current\`,viewBox:\`0 0 24 24\`,children:(0,L.jsx)(\`path\`,{d:\`M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z\`})})
        }),
        (0,L.jsxs)(\`div\`,{className:\`mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[#5865F2]/40 bg-[#5865F2]/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-[#a5b4fc]\`,children:[
          (0,L.jsx)(\`span\`,{className:\`h-2 w-2 rounded-full bg-[#5865F2] animate-pulse\`}),
          discordUrl?\`Server Live\`:\`Coming Soon\`
        ]}),
        (0,L.jsx)(\`h1\`,{className:\`mt-4 text-3xl font-black tracking-tight sm:text-5xl\`,children:\`Official AMGV Discord Community\`}),
        (0,L.jsx)(\`p\`,{className:\`mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base\`,children:discordUrl?\`Join thousands of Adopt Me traders! Live market alerts, instant WFL checks, value discussions, and staff updates.\`:\`The official AMGV Discord server is currently being finalized! Live trade alerts, verification bots, and community voice lounges are coming soon.\`}),
        (0,L.jsxs)(\`div\`,{className:\`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row\`,children:[
          discordUrl?(0,L.jsxs)(\`a\`,{href:discordUrl,target:\`_blank\`,rel:\`noopener noreferrer\`,className:\`flex items-center gap-2.5 rounded-2xl bg-[#5865F2] px-8 py-4 text-sm font-black text-white shadow-lg shadow-[#5865F2]/30 transition-transform hover:scale-105\`,children:[
            (0,L.jsx)(\`svg\`,{className:\`h-5 w-5 fill-current\`,viewBox:\`0 0 24 24\`,children:(0,L.jsx)(\`path\`,{d:\`M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z\`})}),
            \`Join Official Discord Server\`
          ]}):(0,L.jsxs)(\`div\`,{className:\`inline-flex items-center gap-2 rounded-2xl border border-border bg-secondary/80 px-6 py-3.5 text-xs font-bold text-muted-foreground\`,children:[
            (0,L.jsx)(\`span\`,{className:\`h-2 w-2 rounded-full bg-amber-400\`}),
            \`Discord Server Coming Soon — Links will update here & in Admin Panel\`
          ]}),
          (0,L.jsx)(jt,{to:\`/\`,className:\`rounded-2xl border border-border bg-card px-6 py-3.5 text-xs font-bold text-foreground hover:border-primary transition-colors\`,children:\`Back To Home\`})
        ]})
      ]})
    ]}),
    (0,L.jsx)(kg,{})
  ]});
}

function ApplyPage(){
  let[roblox,setRoblox]=(0,_.useState)(\`\`);
  let[discord,setDiscord]=(0,_.useState)(\`\`);
  let[age,setAge]=(0,_.useState)(\`\`);
  let[why,setWhy]=(0,_.useState)(\`\`);
  let[freeOk,setFreeOk]=(0,_.useState)(!0);
  let[experience,setExperience]=(0,_.useState)(\`\`);
  let[hours,setHours]=(0,_.useState)(\`5-10 hours/week\`);
  let[extra,setExtra]=(0,_.useState)(\`\`);
  let[loading,setLoading]=(0,_.useState)(!1);
  let[success,setSuccess]=(0,_.useState)(!1);
  let[error,setError]=(0,_.useState)(\`\`);

  let handleSubmit=async e=>{
    e.preventDefault();
    setError(\`\`);
    if(!roblox.trim())return setError(\`Roblox username is required.\`);
    if(!discord.trim())return setError(\`Discord tag is required.\`);
    if(!age.trim())return setError(\`Age is required.\`);
    if(!why.trim())return setError(\`Please explain why you want to work for AMGV.\`);
    if(!experience.trim())return setError(\`Please describe your Adopt Me trading & value knowledge.\`);
    if(!freeOk)return setError(\`You must confirm that you understand this is a voluntary community role.\`);

    setLoading(!0);
    try{
      await Y.entities.StaffApplication.create({
        roblox_user:roblox.trim(),
        discord_tag:discord.trim(),
        age:age.trim(),
        why_work:why.trim(),
        free_role_ok:!0,
        experience:experience.trim(),
        availability:hours,
        extra_info:extra.trim(),
        status:\`pending\`
      });
      setSuccess(!0);
    }catch(err){
      setError(err?.message||\`Failed to submit application. Try again.\`);
    }finally{
      setLoading(!1);
    }
  };

  return(0,L.jsxs)(\`div\`,{className:\`min-h-screen bg-background flex flex-col\`,children:[
    (0,L.jsx)(Og,{}),
    (0,L.jsxs)(\`main\`,{className:\`mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`text-center\`,children:[
        (0,L.jsxs)(\`div\`,{className:\`mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-primary\`,children:[
          (0,L.jsx)(Tg,{size:16}),
          \`We Are Hiring Staff\`
        ]}),
        (0,L.jsx)(\`h1\`,{className:\`text-3xl font-black tracking-tight sm:text-4xl glitch-text\`,\"data-text\":\`STAFF APPLICATION\`,children:\`STAFF APPLICATION\`}),
        (0,L.jsx)(\`p\`,{className:\`mt-2 text-xs sm:text-sm text-muted-foreground\`,children:\`Help verify values, moderate community trades & chat, and assist players. Submissions are sent directly to the owner mailbox.\`})
      ]}),
      success?(0,L.jsxs)(\`div\`,{className:\`mt-8 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center\`,children:[
        (0,L.jsx)(\`div\`,{className:\`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400\`,children:(0,L.jsx)(qi,{className:\`h-8 w-8\`})}),
        (0,L.jsx)(\`h2\`,{className:\`mt-4 text-xl font-bold text-foreground\`,children:\`Application Received!\`}),
        (0,L.jsx)(\`p\`,{className:\`mx-auto mt-2 max-w-md text-xs sm:text-sm text-muted-foreground\`,children:\`Thank you for applying. The owner and senior staff will review your application in the Application Mailbox and reach out via Discord/Roblox.\`}),
        (0,L.jsx)(jt,{to:\`/\`,className:\`mt-6 inline-block rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground\`,children:\`Return to Home\`})
      ]}):(0,L.jsxs)(\`form\`,{onSubmit:handleSubmit,className:\`mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl\`,children:[
        error&&(0,L.jsx)(\`div\`,{className:\`rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive\`,children:error}),
        (0,L.jsxs)(\`div\`,{className:\`grid gap-4 sm:grid-cols-2\`,children:[
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Roblox Username *\`}),
            (0,L.jsx)(\`input\`,{value:roblox,onChange:e=>setRoblox(e.target.value),placeholder:\`e.g. Ocean_AdoptMe\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\`})
          ]}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Discord Username / Tag *\`}),
            (0,L.jsx)(\`input\`,{value:discord,onChange:e=>setDiscord(e.target.value),placeholder:\`e.g. ocean#0001 or ocean_trader\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\`})
          ]})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`grid gap-4 sm:grid-cols-2\`,children:[
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Your Age *\`}),
            (0,L.jsx)(\`input\`,{value:age,onChange:e=>setAge(e.target.value),placeholder:\`e.g. 15\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\`})
          ]}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Weekly Availability\`}),
            (0,L.jsxs)(\`select\`,{value:hours,onChange:e=>setHours(e.target.value),className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\`,children:[
              (0,L.jsx)(\`option\`,{value:\`2-5 hours/week\`,children:\`2-5 hours/week\`}),
              (0,L.jsx)(\`option\`,{value:\`5-10 hours/week\`,children:\`5-10 hours/week\`}),
              (0,L.jsx)(\`option\`,{value:\`10-20 hours/week\`,children:\`10-20 hours/week\`}),
              (0,L.jsx)(\`option\`,{value:\`20+ hours/week\`,children:\`20+ hours/week\`})
            ]})
          ]})
        ]}),
        (0,L.jsxs)(\`div\`,{children:[
          (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Why do you want to work at AMGV? *\`}),
          (0,L.jsx)(\`textarea\`,{rows:3,value:why,onChange:e=>setWhy(e.target.value),placeholder:\`Tell us what motivates you to join the team...\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary p-3 text-sm outline-none focus:border-primary\`})
        ]}),
        (0,L.jsxs)(\`div\`,{children:[
          (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`What is your Adopt Me trading & value knowledge experience? *\`}),
          (0,L.jsx)(\`textarea\`,{rows:3,value:experience,onChange:e=>setExperience(e.target.value),placeholder:\`How long have you traded? What high-tier/mega pets do you trade? Which value lists do you use?\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary p-3 text-sm outline-none focus:border-primary\`})
        ]}),
        (0,L.jsxs)(\`div\`,{children:[
          (0,L.jsx)(\`label\`,{className:\`text-xs font-bold uppercase tracking-wider text-muted-foreground\`,children:\`Extra information / Notes\`}),
          (0,L.jsx)(\`input\`,{value:extra,onChange:e=>setExtra(e.target.value),placeholder:\`Anything else you would like the owner to know...\`,className:\`mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary\`})
        ]}),
        (0,L.jsxs)(\`label\`,{className:\`flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-3 text-xs text-muted-foreground cursor-pointer\`,children:[
          (0,L.jsx)(\`input\`,{type:\`checkbox\`,checked:freeOk,onChange:e=>setFreeOk(e.target.checked),className:\`mt-0.5 h-4 w-4 rounded accent-primary\`}),
          (0,L.jsx)(\`span\`,{children:\`I understand and confirm that this is a voluntary / unpaid community staff role created to help everyday Adopt Me players.\`})
        ]}),
        (0,L.jsx)(\`button\`,{type:\`submit\`,disabled:loading,className:\`mt-4 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50\`,children:loading?\`Submitting...\`:\`Submit Application\`})
      ]})
    ]}),
    (0,L.jsx)(kg,{})
  ]});
}

function SuggestionsPage(){
  let[title,setTitle]=(0,_.useState)(\`\`);
  let[category,setCategory]=(0,_.useState)(\`value\`);
  let[reason,setReason]=(0,_.useState)(\`\`);
  let[valChange,setValChange]=(0,_.useState)(\`\`);
  let[loading,setLoading]=(0,_.useState)(!1);
  let[message,setMessage]=(0,_.useState)(\`\`);
  let qc=Hs();

  let{data:sugs,isLoading}=rc({
    queryKey:[\`suggestions\`],
    queryFn:()=>Y.entities.Suggestion.filter({},{sort:\`-created_date\`,limit:30})
  });

  let items=sugs?.items||[];

  let handleSubmit=async e=>{
    e.preventDefault();
    if(!title.trim()||!reason.trim())return setMessage(\`Please provide a title/item and reason.\`);
    setLoading(!0);
    try{
      await Y.entities.Suggestion.create({
        title:title.trim(),
        category,
        reason:reason.trim(),
        suggested_value:valChange?Number(valChange):null,
        status:\`new\`,
        upvotes:0
      });
      setTitle(\`\`);
      setReason(\`\`);
      setValChange(\`\`);
      setMessage(\`Suggestion submitted! Staff will review it shortly.\`);
      qc.invalidateQueries({queryKey:[\`suggestions\`]});
    }catch(err){
      setMessage(err?.message||\`Could not submit suggestion.\`);
    }finally{
      setLoading(!1);
    }
  };

  return(0,L.jsxs)(\`div\`,{className:\`min-h-screen bg-background flex flex-col\`,children:[
    (0,L.jsx)(Og,{}),
    (0,L.jsxs)(\`main\`,{className:\`mx-auto max-w-4xl flex-1 px-4 py-10 sm:px-6\`,children:[
      (0,L.jsxs)(\`div\`,{className:\`text-center\`,children:[
        (0,L.jsx)(\`h1\`,{className:\`text-3xl font-black tracking-tight sm:text-4xl glitch-text\`,\"data-text\":\`COMMUNITY SUGGESTIONS\`,children:\`COMMUNITY SUGGESTIONS\`}),
        (0,L.jsx)(\`p\`,{className:\`mt-2 text-xs sm:text-sm text-muted-foreground\`,children:\`Submit value adjustments, suggest new pets, or pitch new features directly to our team.\`})
      ]}),
      (0,L.jsxs)(\`div\`,{className:\`mt-8 grid gap-8 md:grid-cols-3\`,children:[
        (0,L.jsxs)(\`form\`,{onSubmit:handleSubmit,className:\`rounded-3xl border border-border bg-card p-6 shadow-xl md:col-span-1 space-y-4 h-fit\`,children:[
          (0,L.jsx)(\`h3\`,{className:\`text-sm font-black uppercase text-primary\`,children:\`Submit Suggestion\`}),
          message&&(0,L.jsx)(\`p\`,{className:\`text-xs font-bold text-primary rounded-lg bg-primary/10 p-2\`,children:message}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold text-muted-foreground\`,children:\`Title / Pet Name *\`}),
            (0,L.jsx)(\`input\`,{value:title,onChange:e=>setTitle(e.target.value),placeholder:\`e.g. Frost Dragon Value Adjust\`,className:\`mt-1 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-xs outline-none focus:border-primary\`})
          ]}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold text-muted-foreground\`,children:\`Category\`}),
            (0,L.jsxs)(\`select\`,{value:category,onChange:e=>setCategory(e.target.value),className:\`mt-1 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-xs outline-none focus:border-primary\`,children:[
              (0,L.jsx)(\`option\`,{value:\`value\`,children:\`Value Adjustment\`}),
              (0,L.jsx)(\`option\`,{value:\`pet\`,children:\`New Pet Request\`}),
              (0,L.jsx)(\`option\`,{value:\`feature\`,children:\`Feature Idea\`}),
              (0,L.jsx)(\`option\`,{value:\`bug\`,children:\`Bug Report\`})
            ]})
          ]}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold text-muted-foreground\`,children:\`Proposed Value (optional)\`}),
            (0,L.jsx)(\`input\`,{type:\`number\`,step:\`any\`,value:valChange,onChange:e=>setValChange(e.target.value),placeholder:\`e.g. 320\`,className:\`mt-1 w-full rounded-xl border border-border bg-secondary px-3 py-2 text-xs outline-none focus:border-primary\`})
          ]}),
          (0,L.jsxs)(\`div\`,{children:[
            (0,L.jsx)(\`label\`,{className:\`text-xs font-bold text-muted-foreground\`,children:\`Detailed Reason *\`}),
            (0,L.jsx)(\`textarea\`,{rows:3,value:reason,onChange:e=>setReason(e.target.value),placeholder:\`Explain market trades you observed...\`,className:\`mt-1 w-full rounded-xl border border-border bg-secondary p-2.5 text-xs outline-none focus:border-primary\`})
          ]}),
          (0,L.jsx)(\`button\`,{type:\`submit\`,disabled:loading,className:\`w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50\`,children:loading?\`Submitting...\`:\`Post Suggestion\`})
        ]}),
        (0,L.jsxs)(\`div\`,{className:\`md:col-span-2 space-y-3\`,children:[
          (0,L.jsxs)(\`h3\`,{className:\`text-sm font-black uppercase tracking-wider text-muted-foreground\`,children:[\`Recent Community Ideas (\`,items.length,\`)\`]}),
          isLoading?(0,L.jsx)(\`p\`,{className:\`py-10 text-center text-xs\`,children:\`Loading ideas...\`}):items.length===0?(0,L.jsx)(\`p\`,{className:\`rounded-2xl border border-border bg-card p-8 text-center text-xs text-muted-foreground\`,children:\`No suggestions yet. Be the first to share an idea!\`}):items.map(item=>(0,L.jsxs)(\`div\`,{className:\`rounded-2xl border border-border bg-card p-4 shadow-sm\`,children:[
            (0,L.jsxs)(\`div\`,{className:\`flex items-center justify-between gap-2\`,children:[
              (0,L.jsx)(\`h4\`,{className:\`text-sm font-bold text-foreground\`,children:item.title}),
              (0,L.jsx)(\`span\`,{className:\`rounded-full px-2 py-0.5 text-[10px] font-black uppercase \${item.status===\`approved\`?\`bg-emerald-500/20 text-emerald-400\`:item.status===\`planned\`?\`bg-primary/20 text-primary\`:\`bg-secondary text-muted-foreground\`}\`,children:item.status||\`new\`})
            ]}),
            (0,L.jsx)(\`p\`,{className:\`mt-1.5 text-xs leading-relaxed text-muted-foreground\`,children:item.reason}),
            item.suggested_value!=null&&(0,L.jsxs)(\`p\`,{className:\`mt-2 text-[11px] font-bold text-primary\`,children:[\`Proposed Value: \`,item.suggested_value]})
          ]},item.id))
        ]})
      ]})
    ]}),
    (0,L.jsx)(kg,{})
  ]});
}
`;

content = content.slice(0, creditsPageStart) + newComponents + content.slice(creditsPageStart);
console.log('Inserted DiscordPage, ApplyPage, and SuggestionsPage.');

// 2. Mount routes in GY
content = content.replace(
  `(0,L.jsx)(mt,{path:\`/credits\`,element:(0,L.jsx)(CreditsPage,{})}),(0,L.jsx)(mt,{path:\`/settings\`,element:(0,L.jsx)(jJ,{})}),(0,L.jsx)(mt,{path:\`/suggestions\`,element:(0,L.jsx)(ft,{to:\`/\`,replace:!0})}),(0,L.jsx)(mt,{path:\`/giveaways\`,element:(0,L.jsx)(ft,{to:\`/\`,replace:!0})})`,
  `(0,L.jsx)(mt,{path:\`/discord\`,element:(0,L.jsx)(DiscordPage,{})}),(0,L.jsx)(mt,{path:\`/apply\`,element:(0,L.jsx)(ApplyPage,{})}),(0,L.jsx)(mt,{path:\`/suggestions\`,element:(0,L.jsx)(SuggestionsPage,{})}),(0,L.jsx)(mt,{path:\`/credits\`,element:(0,L.jsx)(CreditsPage,{})}),(0,L.jsx)(mt,{path:\`/settings\`,element:(0,L.jsx)(jJ,{})}),(0,L.jsx)(mt,{path:\`/giveaways\`,element:(0,L.jsx)(ft,{to:\`/\`,replace:!0})})`
);

fs.writeFileSync('public/assets/index-62U8YsPh.js', content, 'utf8');
console.log('Successfully mounted routes in GY.');
