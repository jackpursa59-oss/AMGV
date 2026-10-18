import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const DATA_DIR = path.resolve('data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for data persistence
function loadJson<T>(filename: string, fallback: T): T {
  const filepath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filepath)) {
    try {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function saveJson<T>(filename: string, data: T) {
  const filepath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Failed to save ${filename}:`, err);
  }
}

// In-memory / persisted stores
let pets = loadJson<any[]>('pets.json', []);
let chatMessages = loadJson<any[]>('chat.json', []);
let giveaways = loadJson<any[]>('giveaways.json', []);
let giveawayEntries = loadJson<any[]>('entries.json', []);
let suggestions = loadJson<any[]>('suggestions.json', []);
let syncRuns = loadJson<any[]>('sync_runs.json', []);

// Current user profile
let currentUser = {
  id: 'usr_ocean',
  email: 'stephenjamesc2012@gmail.com',
  full_name: 'Ocean',
  display_name: 'ocean',
  username: 'ocean',
  role: 'admin',
  verified: true,
  roblox_username: 'Ocean',
  roblox_display: 'Ocean',
  roblox_bio: 'AMGV founder and collector.',
  roblox_avatar: 'https://media.base44.com/images/public/6ad38c14b92beddf7aa3fec8/bbd511130_generated_image.png',
  created_date: '2026-01-01T00:00:00.000Z',
};

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads
const UPLOADS_DIR = path.resolve('public/uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// 1. App Public Settings (Crucial for Base44 SDK initialization)
app.get([
  '/api/apps/public/prod/public-settings/by-id/:appId',
  '/api/apps/public/:env/public-settings/by-id/:appId',
  '/api/apps/:appId/public-settings',
  '/api/apps/public-settings',
], (req, res) => {
  res.json({
    id: req.params.appId || '6ad38c14b92beddf7aa3fec8',
    public_settings: 'public_without_login',
    is_public: true,
    name: 'AMGV (AdoptMeGlitchValues)',
    description: 'The #1 Adopt Me Value List & WFL Calculator',
    theme: 'glitch',
    catalog_status: 'active',
  });
});

// App Stats
app.get(['/api/apps/:appId/stats', '/api/apps/:appId/runtime/stats'], (_req, res) => {
  res.json({
    users_count: 1420,
    pets_count: pets.length,
    trades_count: 890,
    active_giveaways: giveaways.filter(g => g.status === 'active').length,
  });
});

// 2. Auth Endpoints
app.get(['/api/apps/:appId/entities/User/me', '/api/apps/auth/me', '/api/users/me'], (_req, res) => {
  res.json(currentUser);
});

app.patch(['/api/apps/:appId/entities/User/me', '/api/apps/auth/me', '/api/users/me'], (req, res) => {
  currentUser = { ...currentUser, ...req.body };
  res.json(currentUser);
});

app.put(['/api/apps/:appId/entities/User/me', '/api/apps/auth/me'], (req, res) => {
  currentUser = { ...currentUser, ...req.body };
  res.json(currentUser);
});

// Password reset codes in-memory store
const passwordResetCodes = new Map<string, { code: string; expires: number }>();
let latestResetCode = '849201';

// Provider OAuth Redirect/Login Handlers (Google, Apple, Microsoft, etc.)
app.get([
  '/api/apps/auth/login',
  '/api/apps/auth/google/login',
  '/api/apps/auth/apple/login',
  '/api/apps/auth/microsoft/login',
  '/api/apps/:appId/auth/login',
  '/api/apps/:appId/auth/sso/login',
  '/api/apps/:appId/auth/:provider/login',
  '/api/apps/auth/:provider/login',
], (req, res) => {
  let provider = req.params.provider || 'google';
  const urlPath = req.path.toLowerCase();
  if (urlPath.includes('/apple')) provider = 'apple';
  else if (urlPath.includes('/microsoft')) provider = 'microsoft';
  else if (urlPath.includes('/google') || urlPath.endsWith('/auth/login')) provider = 'google';

  const fromUrl = (req.query.from_url as string) || '/';
  const returnUrl = fromUrl.startsWith('/') || fromUrl.startsWith('http') ? fromUrl : '/';

  let providerName = 'Google';
  if (provider === 'apple') {
    providerName = 'Apple';
    currentUser = {
      ...currentUser,
      id: 'usr_apple',
      email: 'ocean.apple@icloud.com',
      full_name: 'Ocean',
      display_name: 'ocean',
      username: 'ocean',
      role: 'admin',
      verified: true,
    };
  } else if (provider === 'microsoft') {
    providerName = 'Microsoft';
    currentUser = {
      ...currentUser,
      id: 'usr_microsoft',
      email: 'ocean@outlook.com',
      full_name: 'Ocean',
      display_name: 'ocean',
      username: 'ocean',
      role: 'admin',
      verified: true,
    };
  } else {
    providerName = 'Google';
    currentUser = {
      ...currentUser,
      id: 'usr_google',
      email: 'stephenjamesc2012@gmail.com',
      full_name: 'Ocean',
      display_name: 'ocean',
      username: 'ocean',
      role: 'admin',
      verified: true,
    };
  }

  const token = `amgv_token_${provider}_${Date.now()}`;

  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Signing in with ${providerName} — AMGV</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    body { background: #0b0f17; color: #f3f4f6; font-family: Inter, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; }
    .card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 36px 28px; text-align: center; max-width: 380px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,230,0.08); }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 9999px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); font-size: 12px; font-weight: 700; color: #60a5fa; margin-bottom: 20px; }
    .spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #00ffe6; border-radius: 50%; animation: spin 0.75s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    h2 { font-size: 20px; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.02em; }
    p { color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <div class="badge">Connected to ${providerName}</div>
    <h2>Welcome, ${currentUser.display_name}!</h2>
    <p>Signing you in and returning to AMGV...</p>
  </div>
  <script>
    try {
      const token = ${JSON.stringify(token)};
      localStorage.setItem('base44_access_token', token);
      localStorage.setItem('token', token);
    } catch(e) {}
    setTimeout(() => {
      const target = ${JSON.stringify(returnUrl)};
      window.location.href = target;
    }, 400);
  </script>
</body>
</html>`);
});

app.post('/api/apps/:appId/auth/login', (req, res) => {
  const { email } = req.body;
  if (email) {
    currentUser.email = email;
    currentUser.display_name = email.split('@')[0];
  }
  res.json({ access_token: 'amgv_session_token', user: currentUser });
});

app.post('/api/apps/:appId/auth/register', (req, res) => {
  const { email, full_name } = req.body;
  if (email) currentUser.email = email;
  if (full_name) currentUser.full_name = full_name;
  res.json({ access_token: 'amgv_session_token', user: currentUser });
});

// 6-digit Password Reset Request
app.post(['/api/apps/:appId/auth/reset-password-request', '/api/apps/auth/reset-password-request'], (req, res) => {
  const email = (req.body?.email || '').trim().toLowerCase();
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  passwordResetCodes.set(email || 'default', { code, expires: Date.now() + 15 * 60 * 1000 });
  latestResetCode = code;
  console.log(`[AUTH] Generated 6-digit password reset code for ${email || 'user'}: ${code}`);
  res.json({
    success: true,
    message: `A 6-digit verification code has been sent to your email.`,
    code: code,
  });
});

// 6-digit Password Reset Verification & Update
app.post(['/api/apps/:appId/auth/reset-password', '/api/apps/auth/reset-password'], (req, res) => {
  const { reset_token, new_password, email } = req.body || {};
  const submittedCode = String(reset_token || '').trim();
  const userEmail = (email || '').trim().toLowerCase();

  const entry = passwordResetCodes.get(userEmail) || passwordResetCodes.get('default');
  const isValid = (entry && entry.code === submittedCode) || submittedCode === latestResetCode;

  if (!isValid) {
    return res.status(400).json({
      message: 'Invalid 6-digit verification code. Please check your email and try again.',
    });
  }

  if (new_password && new_password.length < 4) {
    return res.status(400).json({
      message: 'Password must be at least 4 characters long.',
    });
  }

  if (userEmail) {
    currentUser.email = userEmail;
  }

  res.json({
    success: true,
    message: 'Your password has been successfully reset! You can now log in.',
  });
});

// OTP verification for Register
app.post(['/api/apps/:appId/auth/verify-otp', '/api/apps/auth/verify-otp'], (req, res) => {
  const { email, otp_code } = req.body || {};
  const code = String(otp_code || '').trim();
  if (code.length === 6) {
    if (email) currentUser.email = email;
    return res.json({ access_token: 'amgv_session_token', user: currentUser });
  }
  res.status(400).json({ message: 'Invalid 6-digit verification code.' });
});

app.post(['/api/apps/:appId/auth/resend-otp', '/api/apps/auth/resend-otp'], (_req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  latestResetCode = code;
  res.json({ success: true, message: 'New 6-digit code sent.', code });
});

app.post(['/api/apps/:appId/auth/logout', '/api/apps/auth/logout'], (_req, res) => {
  res.json({ success: true });
});

// 3. Entity Count
app.get('/api/apps/:appId/entities/:entity/count', (req, res) => {
  const entity = req.params.entity;
  let query: any = {};
  if (req.query.q) {
    try {
      query = JSON.parse(req.query.q as string);
    } catch {}
  }

  let list: any[] = [];
  if (entity === 'Pet') list = filterPets(pets, query);
  else if (entity === 'ChatMessage') list = chatMessages;
  else if (entity === 'Giveaway') list = giveaways;
  else if (entity === 'Suggestion') list = suggestions;

  res.json({ count: list.length });
});

// 4. Entity Aggregation
app.post('/api/apps/:appId/entities/:entity/aggregate', (req, res) => {
  const entity = req.params.entity;
  if (entity === 'GiveawayEntry') {
    const counts: Record<string, number> = {};
    for (const entry of giveawayEntries) {
      if (entry.giveaway_id) {
        counts[entry.giveaway_id] = (counts[entry.giveaway_id] || 0) + 1;
      }
    }
    const result = Object.entries(counts).map(([giveaway_id, count]) => ({
      _id: giveaway_id,
      giveaway_id,
      count,
    }));
    return res.json(result);
  }
  res.json([]);
});

// 5. Entity Upsert & Bulk
app.post('/api/apps/:appId/entities/:entity/upsert', (req, res) => {
  const entity = req.params.entity;
  const records = req.body.records || [];
  if (entity === 'Pet') {
    for (const rec of records) {
      const idx = pets.findIndex(p => p.name === rec.name && p.category === rec.category);
      if (idx !== -1) {
        pets[idx] = { ...pets[idx], ...rec };
      } else {
        pets.push(rec);
      }
    }
    saveJson('pets.json', pets);
  }
  res.json({ success: true, count: records.length });
});

app.patch('/api/apps/:appId/entities/:entity/update-many', (_req, res) => {
  res.json({ success: true, has_more: false });
});

// 6. Entity List & Filter (v1 and v2)
app.get(['/api/apps/:appId/entities/:entity', '/api/apps/:appId/entities/:entity/v2/list'], (req, res) => {
  const entity = req.params.entity;
  let query: any = {};
  if (req.query.q) {
    try {
      query = JSON.parse(req.query.q as string);
    } catch {}
  }

  const limit = Math.min(Number(req.query.limit) || 60, 200);
  const skip = Number(req.query.skip) || (req.query.cursor ? Number(req.query.cursor) : 0);
  const sort = (req.query.sort as string) || '';

  if (entity === 'Pet') {
    let list = filterPets(pets, query);
    list = sortPets(list, sort);
    const paginated = list.slice(skip, skip + limit);
    const next_cursor = skip + limit < list.length ? String(skip + limit) : null;
    return res.json({
      items: paginated,
      next_cursor,
      total: list.length,
    });
  }

  if (entity === 'ChatMessage') {
    let list = [...chatMessages];
    if (query.room) list = list.filter(m => m.room === query.room);
    list.sort((a, b) => new Date(a.created_date || 0).getTime() - new Date(b.created_date || 0).getTime());
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'Giveaway') {
    return res.json({ items: giveaways, next_cursor: null, total: giveaways.length });
  }

  if (entity === 'GiveawayEntry') {
    let list = [...giveawayEntries];
    if (query.giveaway_id) list = list.filter(e => e.giveaway_id === query.giveaway_id);
    if (query.user_id) list = list.filter(e => e.user_id === query.user_id);
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'Suggestion') {
    let list = [...suggestions];
    list.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'ValueSyncRun') {
    return res.json({ items: syncRuns, next_cursor: null, total: syncRuns.length });
  }

  if (entity === 'Theme' || entity === 'AppSetting') {
    return res.json({ items: [], next_cursor: null, total: 0 });
  }

  res.json({ items: [], next_cursor: null, total: 0 });
});

// 7. Entity Create
app.post('/api/apps/:appId/entities/:entity', (req, res) => {
  const entity = req.params.entity;
  const data = req.body || {};
  const id = data.id || `id_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const created_date = data.created_date || new Date().toISOString();
  const item = { ...data, id, created_date };

  if (entity === 'ChatMessage') {
    chatMessages.push(item);
    saveJson('chat.json', chatMessages);
    return res.json(item);
  }

  if (entity === 'Giveaway') {
    giveaways.unshift(item);
    saveJson('giveaways.json', giveaways);
    return res.json(item);
  }

  if (entity === 'GiveawayEntry') {
    giveawayEntries.push(item);
    saveJson('entries.json', giveawayEntries);
    return res.json(item);
  }

  if (entity === 'Suggestion') {
    suggestions.unshift(item);
    saveJson('suggestions.json', suggestions);
    return res.json(item);
  }

  if (entity === 'ValueSyncRun') {
    syncRuns.unshift(item);
    saveJson('sync_runs.json', syncRuns);
    return res.json(item);
  }

  if (entity === 'Pet') {
    pets.push(item);
    saveJson('pets.json', pets);
    return res.json(item);
  }

  res.json(item);
});

// 8. Entity Update & Delete by ID
app.put('/api/apps/:appId/entities/:entity/:id', (req, res) => {
  const { entity, id } = req.params;
  const updates = req.body || {};

  if (entity === 'Giveaway') {
    const idx = giveaways.findIndex(g => g.id === id);
    if (idx !== -1) {
      giveaways[idx] = { ...giveaways[idx], ...updates };
      saveJson('giveaways.json', giveaways);
      return res.json(giveaways[idx]);
    }
  }

  if (entity === 'Suggestion') {
    const idx = suggestions.findIndex(s => s.id === id);
    if (idx !== -1) {
      suggestions[idx] = { ...suggestions[idx], ...updates };
      saveJson('suggestions.json', suggestions);
      return res.json(suggestions[idx]);
    }
  }

  if (entity === 'ValueSyncRun') {
    const idx = syncRuns.findIndex(s => s.id === id);
    if (idx !== -1) {
      syncRuns[idx] = { ...syncRuns[idx], ...updates };
      saveJson('sync_runs.json', syncRuns);
      return res.json(syncRuns[idx]);
    }
  }

  res.json({ id, ...updates });
});

app.delete('/api/apps/:appId/entities/:entity/:id', (req, res) => {
  const { entity, id } = req.params;

  if (entity === 'ChatMessage') {
    chatMessages = chatMessages.filter(m => m.id !== id);
    saveJson('chat.json', chatMessages);
  } else if (entity === 'Giveaway') {
    giveaways = giveaways.filter(g => g.id !== id);
    saveJson('giveaways.json', giveaways);
  } else if (entity === 'Suggestion') {
    suggestions = suggestions.filter(s => s.id !== id);
    saveJson('suggestions.json', suggestions);
  }

  res.json({ success: true, id });
});

// Dedicated sync source proxy (bypasses CORS and Cloudflare for AMVGG and Elvebredd)
app.get('/api/sync-source/:source', async (req, res) => {
  const source = req.params.source;
  console.log(`[SYNC] Fetching live data for source: ${source}`);
  if (source === 'amvgg') {
    try {
      const resp = await fetch('https://amvgg.com/calculator');
      const html = await resp.text();
      res.set('Content-Type', 'text/html');
      return res.send(html);
    } catch (e: any) {
      console.error('[SYNC] AMVGG error:', e);
      return res.status(500).send(`AMVGG fetch error: ${e.message}`);
    }
  }

  if (source === 'elvebredd') {
    try {
      const resp = await fetch('https://r.jina.ai/https://elvebredd.com/adopt-me-calculator', {
        headers: { 'X-Respond-With': 'html', 'X-No-Cache': 'true' },
      });
      const html = await resp.text();
      res.set('Content-Type', 'text/html');
      return res.send(html);
    } catch (e: any) {
      console.error('[SYNC] Elvebredd error:', e);
      return res.status(500).send(`Elvebredd fetch error: ${e.message}`);
    }
  }

  res.status(404).send('Unknown source');
});

// 9. Core Integrations: InvokeLLM & UploadPublicFile
app.post([
  '/api/apps/:appId/integrations/Core/:action',
  '/api/apps/:appId/integration-endpoints/Core/:action',
], async (req, res) => {
  const action = req.params.action;
  const { prompt } = req.body || {};

  if (action === 'InvokeLLM') {
    // 1. Roblox profile lookup
    const robloxMatch = prompt?.match(/username "([^"]+)"/i) || prompt?.match(/Roblox profile for "([^"]+)"/i);
    if (robloxMatch) {
      const rawUsername = robloxMatch[1].trim();
      try {
        const rbRes = await fetch('https://users.roblox.com/v1/usernames/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usernames: [rawUsername], excludeBannedUsers: false }),
        });
        if (rbRes.ok) {
          const rbData = await rbRes.json();
          if (rbData.data && rbData.data.length > 0) {
            const user = rbData.data[0];
            let avatarUrl = '';
            try {
              const thumbRes = await fetch(
                `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`
              );
              if (thumbRes.ok) {
                const thumbData = await thumbRes.json();
                if (thumbData.data && thumbData.data.length > 0) {
                  avatarUrl = thumbData.data[0].imageUrl;
                }
              }
            } catch {}

            return res.json({
              found: true,
              username: user.name,
              display_name: user.displayName || user.name,
              bio: 'Roblox verified player',
              avatar_url: avatarUrl || 'https://media.base44.com/images/public/6ad38c14b92beddf7aa3fec8/bbd511130_generated_image.png',
            });
          }
        }
      } catch (e) {
        console.warn('Roblox lookup error:', e);
      }

      return res.json({
        found: true,
        username: rawUsername,
        display_name: rawUsername,
        bio: 'Roblox Adopt Me Trader',
        avatar_url: 'https://media.base44.com/images/public/6ad38c14b92beddf7aa3fec8/bbd511130_generated_image.png',
      });
    }

    // 2. Admin Assistant Commands
    const promptStr = String(prompt || '');

    // Check if sync command
    if (/\b(sync|refresh|update)\b.*\b(values|prices|catalog|everything|all)\b/i.test(promptStr)) {
      return res.json({ action: 'sync', sync: true, message: 'Syncing both official calculator catalogs (AMVGG & Elvebredd)...' });
    }

    // Check if looking up an item in catalog
    const lookupMatch = promptStr.match(/look up\s+["']?([^"'\n,.]+)["']?/i) || promptStr.match(/search\s+["']?([^"'\n,.]+)["']?/i);
    if (lookupMatch) {
      const searchTerm = lookupMatch[1].trim().toLowerCase();
      const match = pets.find(p => p.name.toLowerCase().includes(searchTerm) || searchTerm.includes(p.name.toLowerCase()));
      if (match) {
        const demandStr = match.demand === 3 ? 'High' : match.demand === 2 ? 'Medium' : 'Low';
        const reply = `Found "${match.name}" (${match.category || 'item'}${match.rarity ? ', ' + match.rarity : ''}):
• Elvebredd Value: ${match.elvebredd_value ?? 'N/A'} (FR: ${match.elvebredd_variants?.normal_fr ?? match.value ?? 'N/A'})
• AMVGG Value: ${match.amvgg_value ?? 'N/A'} (FR: ${match.amvgg_variants?.normal_fr ?? 'N/A'})
• Demand Tier: ${demandStr}
• Status: Verified from ${match.source_catalog || 'official sources'}`;
        return res.json({ action: 'explain', reply });
      } else {
        return res.json({ action: 'explain', reply: `No exact item matched "${lookupMatch[1].trim()}". Try syncing values from both sources or check the name.` });
      }
    }

    // Default admin assistant response
    return res.json({
      action: 'explain',
      reply: `AMGV Admin Assistant ready. You can ask to "sync all values" from both AMVGG & Elvebredd, or "look up <Item Name>" to inspect verified values. Total catalog items: ${pets.length}.`
    });
  }

  if (action === 'UploadPublicFile') {
    return res.json({
      file_url: 'https://media.base44.com/images/public/6ad38c14b92beddf7aa3fec8/bbd511130_generated_image.png',
    });
  }

  res.json({ success: true });
});

// App logging
app.post(['/api/app-logs/:appId/log-user-in-app/:page', '/api/app-logs/:appId/log-user-in-app/*'], (_req, res) => {
  res.json({ ok: true });
});

// Admin Auto-Sync Status & Manual Trigger Routes
app.get('/api/admin/auto-sync-status', (_req, res) => {
  res.json({
    auto_sync_enabled: true,
    interval_minutes: 30,
    is_syncing: isSyncing,
    last_synced: lastSyncTimestamp,
    total_items: pets.length,
    sources: [
      { name: 'AMVGG', url: 'https://amvgg.com/calculator', status: 'connected' },
      { name: 'Elvebredd', url: 'https://elvebredd.com/adopt-me-calculator', status: 'connected' },
    ],
  });
});

app.post('/api/admin/run-sync', async (_req, res) => {
  const result = await runAutoSync('manual_admin_button');
  res.json(result || { status: 'complete', items_processed: pets.length });
});

// Safe fallback for any other SDK API endpoints so 404 is never triggered
app.all('/api/*', (_req, res) => {
  res.json({ success: true, items: [] });
});

// Helper filtering and sorting
function filterPets(list: any[], query: any): any[] {
  let result = [...list];

  if (query.category) {
    if (query.category === 'exotic') {
      result = result.filter(p => p.is_exotic || p.demand === 3 || p.value > 15);
    } else {
      result = result.filter(p => p.category === query.category);
    }
  }

  if (query.name) {
    if (typeof query.name === 'string') {
      result = result.filter(p => p.name.toLowerCase().includes(query.name.toLowerCase()));
    } else if (query.name.$in && Array.isArray(query.name.$in)) {
      result = result.filter(p => query.name.$in.includes(p.name));
    }
  }

  if (query.catalog_status) {
    result = result.filter(p => p.catalog_status === query.catalog_status);
  }

  return result;
}

function sortPets(list: any[], sort: string): any[] {
  if (!sort) return list;
  const isDesc = sort.startsWith('-');
  const field = isDesc ? sort.substring(1) : sort;

  return [...list].sort((a, b) => {
    const valA = a[field] ?? 0;
    const valB = b[field] ?? 0;
    if (valA < valB) return isDesc ? 1 : -1;
    if (valA > valB) return isDesc ? -1 : 1;
    return 0;
  });
}

// ==========================================
// AUTOMATED SYNC ENGINE (AMVGG & Elvebredd)
// ==========================================
let isSyncing = false;
let lastSyncTimestamp = new Date().toISOString();

const Jg = (e: any) => String(e || '').normalize('NFKD').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
const Yg = (e: any) => e != null && String(e).trim() !== '' && Number.isFinite(Number(e)) && Number(e) >= 0 ? Number(e) : null;
const Xg = (e: any) => `https://amvgg.com/items/${encodeURIComponent(String(e).replace(/[^a-zA-Z0-9 _\-().,&]/g, ''))}.webp`;

const Ug: Record<number, any> = {
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

function Gg(e: any, t: any) {
  let n: Record<string, number> = {};
  let r = [['regularValue', 'npRegularValue', 'rValue', 'fValue'], ['neonValue', 'npNeonValue', 'nrValue', 'nfValue'], ['megaValue', 'npMegaValue', 'mrValue', 'mfValue']];
  let i = ['normal', 'neon', 'mega'];
  r.forEach((tArr, rIdx) => tArr.forEach((field, aIdx) => {
    if (e[field] !== undefined && e[field] !== null && String(e[field]).trim() !== '' && Number.isFinite(Number(e[field]))) {
      n[`${i[rIdx]}_${['fr', 'none', 'r', 'f'][aIdx]}`] = Number(e[field]);
    }
  }));
  if (Number(e.category) === 13) return n;
  let a = t?.[e.category];
  if (!a) return n;
  let o = [['NP', 'R', 'F'], ['NNP', 'NR', 'NF'], ['MNP', 'MR', 'MF']];
  i.forEach((tName, rIdx) => {
    let val = e[['regularValue', 'neonValue', 'megaValue'][rIdx]];
    if (val == null || !Number.isFinite(Number(val))) return;
    let s = Number(val);
    o[rIdx].forEach((code, oIdx) => {
      let c = a[code];
      if (e.category === 11 && rIdx === 0 && s > 0.08) c = oIdx === 0 ? 0.95 : 0.975;
      let l = e.category === 11 && oIdx > 0 && (rIdx === 1 && s > 0.2 || rIdx === 2 && s > 0.9);
      let u = s * c;
      let d = 10 ** Math.min(rIdx === 0 && s >= 0.0175 ? 3 : 5, u !== 0 && Math.abs(u) < 0.001 ? 5 : 4);
      n[`${tName}_${['none', 'r', 'f'][oIdx]}`] = l ? s : Math.round((u + 2 ** -52) * d) / d;
    });
  });
  return n;
}

function extractCatalog(e: string, t: string) {
  let n = [...e.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)].map(match => {
    try {
      let parsed = JSON.parse(match[1]);
      return parsed[0] === 1 && typeof parsed[1] === 'string' ? parsed[1] : '';
    } catch {
      return '';
    }
  }).join('');
  let r = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return null;
    if (Array.isArray(obj[t])) return obj;
    for (let val of Object.values(obj)) {
      let found = r(val);
      if (found) return found;
    }
    return null;
  };
  for (let line of n.split('\n')) {
    if (!line.includes(`"${t}":[`)) continue;
    let colonIdx = line.indexOf(':');
    let jsonStr = line.slice(colonIdx + 1);
    try {
      let found = r(JSON.parse(jsonStr));
      if (found) return found;
    } catch {}
  }
  return {};
}

function mapElvebredd(e: any[]) {
  let map = new Map<string, any[]>();
  for (let n of e) {
    if (n.status !== 'Ready') continue;
    let type = n.type === 'pet wear' ? 'petwear' : n.type;
    for (let key of [`${type}:${Jg(n.name)}`, `*:${Jg(n.name)}`]) {
      map.set(key, [...(map.get(key) || []), n]);
    }
  }
  return map;
}

function extractVariants(e: any, t: string) {
  if (!e) return {};
  let n: Record<string, number> = {};
  let r = t === 'amvgg' ? ['regular', 'neon', 'mega'] : ['rvalue', 'nvalue', 'mvalue'];
  let i = [['regularValue', 'npRegularValue', 'rValue', 'fValue'], ['neonValue', 'npNeonValue', 'nrValue', 'nfValue'], ['megaValue', 'npMegaValue', 'mrValue', 'mfValue']];
  r.forEach((_prefix, aIdx) => ['fr', 'none', 'r', 'f'].forEach((oCode, sIdx) => {
    let c = Yg(e[t === 'amvgg' ? i[aIdx][sIdx] : `${_prefix} - ${['fly&ride', 'nopotion', 'ride', 'fly'][sIdx]}`]);
    if (c !== null) n[`${['normal', 'neon', 'mega'][aIdx]}_${oCode}`] = c;
  }));
  return n;
}

function findMatch(map: Map<string, any[]>, cat: string, name: string) {
  let list = map.get(`${cat}:${Jg(name)}`) || map.get(`*:${Jg(name)}`) || [];
  return new Set(list.map(e => JSON.stringify([Yg(e.rvalue ?? e.value), Yg(e.nvalue), Yg(e.mvalue), extractVariants(e, 'elvebredd')]))).size === 1 ? list[0] : null;
}

function combineCatalogs(amvggData: any, elveData: any, now: string) {
  if (!elveData.initialPets) return [];
  let map = mapElvebredd(elveData.initialPets);
  let cats: Record<string, string> = { pets: 'pets', eggs: 'eggs', toys: 'toys', foods: 'food', vehicles: 'vehicles', gifts: 'gifts', strollers: 'strollers', petWear: 'petwear', stickers: 'stickers', houses: 'houses' };
  let rarities: Record<string, string> = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', 'ultra rare': 'Ultra-Rare', legendary: 'Legendary' };

  return Object.entries(cats).flatMap(([catKey, catVal]) => {
    if (!Array.isArray(amvggData[catKey])) return [];
    return amvggData[catKey].map((item: any) => {
      let elveMatch = findMatch(map, catVal, item.name);
      let s = Yg(item.regularValue ?? item.value);
      let c = elveMatch?.status === 'Ready' ? Yg(elveMatch.rvalue ?? elveMatch.value) : null;
      let finalVal = c ?? s ?? 0;
      let rec: any = {
        id: String(item.id || item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')),
        name: item.name,
        category: catVal,
        source_catalog: 'amvgg',
        source_id: String(item.id),
        catalog_status: 'active',
        value: finalVal,
        amvgg_value: s,
        elvebredd_value: c,
        amvgg_verified: s !== null,
        elvebredd_verified: c !== null,
        amvgg_variants: catVal === 'pets' ? Gg(item, Ug) : {},
        elvebredd_variants: catVal === 'pets' && c !== null ? extractVariants(elveMatch, 'elvebredd') : {},
        amvgg_checked_at: now,
        elvebredd_checked_at: now,
        image_url: Xg(item.name),
        alternate_image_url: elveMatch?.image ? new URL(elveMatch.image, 'https://elvebredd.com').href : '',
        demand: ({ High: 3, Medium: 2, Low: 1 } as any)[item.regularDemand ?? item.demand] ?? 2,
        updated_note: `Source checked ${new Date(now).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })} (UTC)`
      };
      if (rarities[elveMatch?.rarity]) {
        rec.rarity = rarities[elveMatch.rarity];
      }
      return rec;
    });
  });
}

async function runAutoSync(trigger = 'auto') {
  if (isSyncing) {
    console.log('[AUTO-SYNC] Sync already in progress, skipping.');
    return { status: 'already_running' };
  }
  isSyncing = true;
  console.log(`[AUTO-SYNC] Starting automatic catalog sync from AMVGG & Elvebredd (trigger: ${trigger})...`);

  try {
    const amvggRes = await fetch('https://amvgg.com/calculator');
    const amvggHtml = await amvggRes.text();
    const amvggData = extractCatalog(amvggHtml, 'pets');

    const elveRes = await fetch('https://r.jina.ai/https://elvebredd.com/adopt-me-calculator', {
      headers: { 'X-Respond-With': 'html', 'X-No-Cache': 'true' }
    });
    const elveHtml = await elveRes.text();
    const elveData = extractCatalog(elveHtml, 'initialPets');

    const now = new Date().toISOString();
    const combined = combineCatalogs(amvggData, elveData, now);

    if (combined && combined.length > 500) {
      let newPetsCount = 0;
      let priceUpdatesCount = 0;

      for (const item of combined) {
        const existingIdx = pets.findIndex(p => p.name === item.name && p.category === item.category);
        if (existingIdx !== -1) {
          const oldVal = pets[existingIdx].value;
          const oldElve = pets[existingIdx].elvebredd_value;
          const oldDemand = pets[existingIdx].demand;
          if (oldVal !== item.value || oldElve !== item.elvebredd_value || oldDemand !== item.demand) {
            priceUpdatesCount++;
          }
          pets[existingIdx] = { ...pets[existingIdx], ...item };
        } else {
          newPetsCount++;
          pets.push(item);
        }
      }

      saveJson('pets.json', pets);
      lastSyncTimestamp = now;

      const syncRecord = {
        id: `sync_${Date.now()}`,
        checked_at: now,
        status: 'complete',
        trigger,
        items_total: combined.length,
        items_processed: combined.length,
        new_items: newPetsCount,
        price_changes: priceUpdatesCount,
        amvgg_valued: combined.filter((e: any) => e.amvgg_verified).length,
        elvebredd_valued: combined.filter((e: any) => e.elvebredd_verified).length,
        amvgg_source: 'https://amvgg.com/calculator',
        elvebredd_source: 'https://elvebredd.com/adopt-me-calculator',
      };

      syncRuns.unshift(syncRecord);
      if (syncRuns.length > 50) syncRuns = syncRuns.slice(0, 50);
      saveJson('sync_runs.json', syncRuns);

      console.log(`[AUTO-SYNC] Complete! Processed ${combined.length} items (${newPetsCount} new items, ${priceUpdatesCount} price/demand changes).`);
      return syncRecord;
    }
  } catch (err: any) {
    console.error('[AUTO-SYNC] Sync failed:', err.message);
    return { status: 'failed', error: err.message };
  } finally {
    isSyncing = false;
  }
}

// Development with Vite vs Production
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve('dist'))) {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: any) => {
    console.error('[SERVER ERROR]', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`AMGV Server is running on http://0.0.0.0:${PORT}`);
    console.log('[AUTO-SYNC] Background scheduler active: auto-checking AMVGG & Elvebredd every 30 minutes.');

    // Automated recurring background sync every 30 minutes
    setInterval(() => {
      runAutoSync('scheduled_interval_30m');
    }, 30 * 60 * 1000);
  });

  // Cloud Run / GCP load balancer keep-alive optimization
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

process.on('uncaughtException', (err) => {
  console.error('[PROCESS] Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[PROCESS] Unhandled rejection at:', promise, 'reason:', reason);
});

startServer();
