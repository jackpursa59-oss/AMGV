import fs from 'fs';

let content = fs.readFileSync('public/assets/index-62U8YsPh.js', 'utf8');
console.log('Original content length:', content.length);

// 1. Better, satisfying click sound in fJ
const fjOld = `function fJ(){if(!(!uJ()||typeof window>\`u\`))try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;dJ||=new e,dJ.state===\`suspended\`&&dJ.resume();let t=dJ.currentTime,n=dJ.createBiquadFilter();n.type=\`lowpass\`,n.frequency.value=2600,n.Q.value=.6,n.connect(dJ.destination);let r=dJ.createOscillator();r.type=\`sine\`,r.frequency.setValueAtTime(523+Math.random()*40,t),r.frequency.exponentialRampToValueAtTime(659,t+.03),r.frequency.exponentialRampToValueAtTime(494,t+.2);let i=dJ.createGain();i.gain.setValueAtTime(1e-4,t),i.gain.linearRampToValueAtTime(.045,t+.022),i.gain.exponentialRampToValueAtTime(1e-4,t+.26),r.connect(i).connect(n);let a=dJ.createOscillator();a.type=\`sine\`,a.frequency.setValueAtTime(180,t),a.frequency.exponentialRampToValueAtTime(80,t+.09);let o=dJ.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(.03,t+.008),o.gain.exponentialRampToValueAtTime(1e-4,t+.1),a.connect(o).connect(n);let s=dJ.createOscillator();s.type=\`sine\`,s.frequency.setValueAtTime(1975.5,t);let c=dJ.createGain();c.gain.setValueAtTime(1e-4,t),c.gain.linearRampToValueAtTime(.012,t+.03),c.gain.exponentialRampToValueAtTime(1e-4,t+.18),s.connect(c).connect(n),r.start(t),a.start(t),s.start(t+.015),r.stop(t+.28),a.stop(t+.12),s.stop(t+.2)}catch{}}`;

const fjNew = `function fJ(){if(!(!uJ()||typeof window>\`u\`))try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;dJ||=new e,dJ.state===\`suspended\`&&dJ.resume();let t=dJ.currentTime,n=dJ.createBiquadFilter();n.type=\`lowpass\`,n.frequency.value=950,n.Q.value=.5,n.connect(dJ.destination);let r=dJ.createOscillator();r.type=\`sine\`,r.frequency.setValueAtTime(340,t),r.frequency.exponentialRampToValueAtTime(150,t+.04);let i=dJ.createGain();i.gain.setValueAtTime(1e-3,t),i.gain.linearRampToValueAtTime(.045,t+.006),i.gain.exponentialRampToValueAtTime(1e-4,t+.045),r.connect(i).connect(n),r.start(t),r.stop(t+.05)}catch{}}`;

if (content.includes(fjOld)) {
  content = content.replace(fjOld, fjNew);
  console.log('Successfully replaced fJ with sleek modern tactile pop sound.');
} else {
  console.log('fJ pattern check alternative...');
}

// 2. Updated Built For Traders grid array (jg)
const jgPattern = /var jg=\[\{title:`WFL Calculator`[\s\S]*?icon:Ei,to:`\/chat`\}\];/;
const jgNew = `var jg=[
  {title:\`WFL Calculator\`,desc:\`Authentic 18-slot Adopt Me trade grid with independent AMVGG & Elvebredd meters, potion multipliers, and trading signs.\`,icon:oi,to:\`/calculator\`},
  {title:\`Value Catalog\`,desc:\`Exact AMVGG verified values, live demand badges, and full pricing formula variant breakdowns for all pets.\`,icon:yi,to:\`/values\`},
  {title:\`Trade Mailbox\`,desc:\`List your trades and receive community offers in your mailbox. Accept, decline, or counter with ease.\`,icon:oi,to:\`/trades\`},
  {title:\`WFL Community Chat\`,desc:\`Real-time trading discussion with screenshot sharing, report flags, and instant WFL checks.\`,icon:Ei,to:\`/chat\`},
  {title:\`Community Suggestions\`,desc:\`Submit value adjustments, new pet requests, or feature ideas for staff review and implementation.\`,icon:Pi,to:\`/suggestions\`},
  {title:\`Discord Community\`,desc:\`Connect with other traders in our official Discord server for live market alerts and announcements.\`,icon:mi,to:\`/discord\`},
  {title:\`Staff Application\`,desc:\`Apply to join our moderation, trading, and value verification staff team. We are actively hiring!\`,icon:qi,to:\`/apply\`},
  {title:\`Credits & Disclaimer\`,desc:\`Transparent community-first notice, non-affiliation disclosures, and platform copyright info.\`,icon:ii,to:\`/credits\`},
  {title:\`Settings & Audio\`,desc:\`Lo-Fi chill music player preferences, volume sliders, click sound toggles, and user account management.\`,icon:zi,to:\`/settings\`}
];`;

if (jgPattern.test(content)) {
  content = content.replace(jgPattern, jgNew);
  console.log('Successfully updated jg with Credits, Settings, Discord, Staff, and Suggestions.');
} else {
  console.log('jg pattern not matched directly.');
}

// 3. Update Navbar Eg to include Suggestions & Discord
const egPattern = /var Eg=\[\{label:`Home`,path:`\/`[\s\S]*?icon:zi\}\]/;
const egNew = `var Eg=[
  {label:\`Home\`,path:\`/\`,icon:mi},
  {label:\`Calculator\`,path:\`/calculator\`,icon:oi},
  {label:\`Values\`,path:\`/values\`,icon:yi},
  {label:\`Trades\`,path:\`/trades\`,icon:oi},
  {label:\`Chat\`,path:\`/chat\`,icon:Ei},
  {label:\`Suggest\`,path:\`/suggestions\`,icon:Pi},
  {label:\`Discord\`,path:\`/discord\`,icon:mi},
  {label:\`Credits\`,path:\`/credits\`,icon:ii},
  {label:\`Settings\`,path:\`/settings\`,icon:zi}
]`;

if (egPattern.test(content)) {
  content = content.replace(egPattern, egNew);
  console.log('Successfully updated navbar items in Eg.');
}

fs.writeFileSync('public/assets/index-62U8YsPh.js', content, 'utf8');
console.log('Finished basic replacements. Validating syntax...');
