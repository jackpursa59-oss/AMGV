import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

// Ensure let io: SocketIOServer | null = null; exists at top
if (!code.includes('let io: SocketIOServer | null = null;')) {
  code = code.replace(
    "let currentUser = {",
    "let io: SocketIOServer | null = null;\n\nlet currentUser = {"
  );
}

// Find entity routes block
const getStart = code.indexOf("app.get(['/api/apps/:appId/entities/:entity'");
const delEnd = code.indexOf("res.json({ success: true, id });\n});") + "res.json({ success: true, id });\n});".length;

if (getStart === -1 || delEnd <= getStart) {
  console.error("Could not find entity routes bounds");
  process.exit(1);
}

const cleanEntityBlock = `app.get(['/api/apps/:appId/entities/:entity', '/api/apps/:appId/entities/:entity/v2/list'], (req, res) => {
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

  if (entity === 'Trade') {
    let list = [...trades];
    if (query.author_id) list = list.filter(t => t.author_id === query.author_id);
    if (query.status) list = list.filter(t => t.status === query.status);
    list.sort((a, b) => new Date(b.created_date || 0).getTime() - new Date(a.created_date || 0).getTime());
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'TradeOffer') {
    let list = [...offers];
    if (query.trade_id) list = list.filter(o => o.trade_id === query.trade_id);
    if (query.receiver_id) list = list.filter(o => o.receiver_id === query.receiver_id);
    if (query.author_id) list = list.filter(o => o.author_id === query.author_id);
    list.sort((a, b) => new Date(b.created_date || 0).getTime() - new Date(a.created_date || 0).getTime());
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'StaffApplication') {
    let list = [...staffApplications];
    list.sort((a, b) => new Date(b.created_date || 0).getTime() - new Date(a.created_date || 0).getTime());
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'Suggestion') {
    let list = [...suggestions];
    list.sort((a, b) => new Date(b.created_date || 0).getTime() - new Date(a.created_date || 0).getTime());
    return res.json({ items: list, next_cursor: null, total: list.length });
  }

  if (entity === 'Ban') {
    return res.json({ items: bans, next_cursor: null, total: bans.length });
  }

  if (entity === 'AppSetting') {
    return res.json({ items: [{ id: 'settings', ...settings }], next_cursor: null, total: 1 });
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

  if (entity === 'ValueSyncRun') {
    return res.json({ items: syncRuns, next_cursor: null, total: syncRuns.length });
  }

  if (entity === 'Theme') {
    return res.json({ items: [], next_cursor: null, total: 0 });
  }

  res.json({ items: [], next_cursor: null, total: 0 });
});

// 7. Entity Create
app.post('/api/apps/:appId/entities/:entity', (req, res) => {
  const entity = req.params.entity;
  const data = req.body || {};
  const id = data.id || \`id_\${Date.now()}_\${Math.random().toString(36).substring(2, 7)}\`;
  const created_date = data.created_date || new Date().toISOString();
  const item = { ...data, id, created_date };

  if (io) {
    const payload = {
      room: \`entities:\${req.params.appId}:\${entity}\`,
      data: JSON.stringify({ type: 'create', data: item, id: item.id })
    };
    io.emit('update_model', payload);
    io.to(\`entities:\${req.params.appId}:\${entity}\`).emit('update_model', payload);
  }

  if (entity === 'ChatMessage') {
    const isBanned = bans.find(b => (b.user_id === item.author_id || (item.author_name && b.username?.toLowerCase() === item.author_name.toLowerCase())) && new Date(b.banned_until).getTime() > Date.now());
    if (isBanned) {
      return res.status(403).json({ error: \`You are temporarily banned from chat until \${new Date(isBanned.banned_until).toLocaleString()}. Reason: \${isBanned.reason}\` });
    }
    chatMessages.push(item);
    saveJson('chat.json', chatMessages);
    return res.json(item);
  }

  if (entity === 'StaffApplication') {
    item.status = item.status || 'pending';
    staffApplications.unshift(item);
    saveJson('applications.json', staffApplications);
    return res.json(item);
  }

  if (entity === 'Suggestion') {
    item.status = item.status || 'new';
    item.upvotes = item.upvotes || 0;
    suggestions.unshift(item);
    saveJson('suggestions.json', suggestions);
    return res.json(item);
  }

  if (entity === 'Trade') {
    trades.unshift(item);
    saveJson('trades.json', trades);
    return res.json(item);
  }

  if (entity === 'TradeOffer') {
    offers.unshift(item);
    saveJson('offers.json', offers);
    return res.json(item);
  }

  if (entity === 'Ban') {
    bans.unshift(item);
    saveJson('bans.json', bans);
    return res.json(item);
  }

  if (entity === 'AppSetting') {
    settings = { ...settings, ...data };
    saveJson('settings.json', settings);
    return res.json(settings);
  }

  if (entity === 'Pet') {
    pets.push(item);
    saveJson('pets.json', pets);
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

  if (entity === 'ValueSyncRun') {
    syncRuns.unshift(item);
    saveJson('sync_runs.json', syncRuns);
    return res.json(item);
  }

  res.json(item);
});

// 8. Entity Update & Delete by ID
app.put('/api/apps/:appId/entities/:entity/:id', (req, res) => {
  const { entity, id } = req.params;
  const updates = req.body || {};

  if (entity === 'Trade') {
    const idx = trades.findIndex(t => t.id === id);
    if (idx !== -1) {
      trades[idx] = { ...trades[idx], ...updates };
      saveJson('trades.json', trades);
      if (io) {
        const payload = {
          room: \`entities:\${req.params.appId}:Trade\`,
          data: JSON.stringify({ type: 'update', data: trades[idx], id })
        };
        io.emit('update_model', payload);
      }
      return res.json(trades[idx]);
    }
  }

  if (entity === 'TradeOffer') {
    const idx = offers.findIndex(o => o.id === id);
    if (idx !== -1) {
      offers[idx] = { ...offers[idx], ...updates };
      saveJson('offers.json', offers);
      if (io) {
        const payload = {
          room: \`entities:\${req.params.appId}:TradeOffer\`,
          data: JSON.stringify({ type: 'update', data: offers[idx], id })
        };
        io.emit('update_model', payload);
      }
      return res.json(offers[idx]);
    }
  }

  if (entity === 'StaffApplication') {
    const idx = staffApplications.findIndex(a => a.id === id);
    if (idx !== -1) {
      staffApplications[idx] = { ...staffApplications[idx], ...updates };
      saveJson('applications.json', staffApplications);
      return res.json(staffApplications[idx]);
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

  if (entity === 'ChatMessage') {
    const idx = chatMessages.findIndex(m => m.id === id);
    if (idx !== -1) {
      chatMessages[idx] = { ...chatMessages[idx], ...updates };
      saveJson('chat.json', chatMessages);
      return res.json(chatMessages[idx]);
    }
  }

  if (entity === 'Giveaway') {
    const idx = giveaways.findIndex(g => g.id === id);
    if (idx !== -1) {
      giveaways[idx] = { ...giveaways[idx], ...updates };
      saveJson('giveaways.json', giveaways);
      return res.json(giveaways[idx]);
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
  if (entity === 'Trade') {
    trades = trades.filter(t => t.id !== id);
    saveJson('trades.json', trades);
  } else if (entity === 'TradeOffer') {
    offers = offers.filter(o => o.id !== id);
    saveJson('offers.json', offers);
  } else if (entity === 'StaffApplication') {
    staffApplications = staffApplications.filter(a => a.id !== id);
    saveJson('applications.json', staffApplications);
  } else if (entity === 'Suggestion') {
    suggestions = suggestions.filter(s => s.id !== id);
    saveJson('suggestions.json', suggestions);
  } else if (entity === 'ChatMessage') {
    chatMessages = chatMessages.filter(m => m.id !== id);
    saveJson('chat.json', chatMessages);
  } else if (entity === 'Ban') {
    bans = bans.filter(b => b.id !== id);
    saveJson('bans.json', bans);
  } else if (entity === 'Giveaway') {
    giveaways = giveaways.filter(g => g.id !== id);
    saveJson('giveaways.json', giveaways);
  }
  res.json({ success: true, id });
});`;

code = code.slice(0, getStart) + cleanEntityBlock + code.slice(delEnd);
fs.writeFileSync('server.ts', code, 'utf8');
console.log('Rebuilt clean entity routes in server.ts.');
