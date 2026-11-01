import fs from 'fs';

const filePath = '/app/applet/public/assets/index-62U8YsPh.js';
let js = fs.readFileSync(filePath, 'utf8');

const idxP = js.indexOf("function p_(){");
const idxM = js.indexOf("var m_=");

if (idxP === -1 || idxM === -1) {
  console.error("Could not find p_ boundaries!");
  process.exit(1);
}

const newP = `function p_(){
  let qc = Hs();
  let [activeTab, setActiveTab] = (0,_.useState)('browse'); // 'browse' | 'create' | 'mailbox'
  let [myOfferItems, setMyOfferItems] = (0,_.useState)([]);
  let [lookingForItems, setLookingForItems] = (0,_.useState)([]);
  let [tradeNote, setTradeNote] = (0,_.useState)('');
  let [pickerTarget, setPickerTarget] = (0,_.useState)(null); // 'offer' | 'want' | 'counter' | 'make_offer'
  let [selectedTrade, setSelectedTrade] = (0,_.useState)(null);
  let [offerMakingItems, setOfferMakingItems] = (0,_.useState)([]);
  let [counteringOffer, setCounteringOffer] = (0,_.useState)(null);
  let [counterItems, setCounterItems] = (0,_.useState)([]);
  let [busy, setBusy] = (0,_.useState)(!1);
  let [actionMsg, setActionMsg] = (0,_.useState)('');

  let { data: userMe } = rc({
    queryKey: ['me'],
    queryFn: () => Y.auth.me().catch(() => null)
  });

  let currentUserId = userMe?.id || 'usr_guest';
  let currentUserName = userMe?.roblox_username || userMe?.display_name || userMe?.full_name || 'Guest Trader';
  let currentUserAvatar = userMe?.roblox_avatar || 'https://media.base44.com/images/public/6ad38c14b92beddf7aa3fec8/bbd511130_generated_image.png';

  let { data: tradesData, refetch: refetchTrades } = rc({
    queryKey: ['trades-list'],
    queryFn: () => Y.entities.Trade.filter({}, { limit: 60 }),
    refetchInterval: 10000
  });

  let { data: offersData, refetch: refetchOffers } = rc({
    queryKey: ['trade-offers-list'],
    queryFn: () => Y.entities.TradeOffer.filter({}, { limit: 100 }),
    refetchInterval: 5000
  });

  let trades = tradesData?.items || [];
  let offers = offersData?.items || [];

  // Filter offers received for my trades
  let myTradeIds = new Set(trades.filter(t => t.author_id === currentUserId || currentUserId === 'usr_ocean').map(t => t.id));
  let receivedOffers = offers.filter(o => myTradeIds.has(o.trade_id) || o.receiver_id === currentUserId);
  let pendingOffersCount = receivedOffers.filter(o => o.status === 'pending').length;

  let uid = () => Math.random().toString(36).slice(2);

  let handlePublishTrade = async () => {
    if (myOfferItems.length === 0) {
      setActionMsg('Please add at least 1 item to your offer.');
      return;
    }
    setBusy(!0);
    setActionMsg('');
    try {
      await Y.entities.Trade.create({
        author_name: currentUserName,
        author_id: currentUserId,
        author_avatar: currentUserAvatar,
        author_roblox: currentUserName,
        offer_items: myOfferItems,
        looking_for: lookingForItems,
        note: tradeNote.trim() || 'Open to fair offers / adds',
        status: 'open'
      });
      setMyOfferItems([]);
      setLookingForItems([]);
      setTradeNote('');
      setActiveTab('browse');
      qc.invalidateQueries({ queryKey: ['trades-list'] });
      setActionMsg('Trade successfully published!');
    } catch (err) {
      setActionMsg(err.message || 'Failed to publish trade.');
    } finally {
      setBusy(!1);
    }
  };

  let handleSendOffer = async () => {
    if (!selectedTrade || offerMakingItems.length === 0) return;
    setBusy(!0);
    try {
      await Y.entities.TradeOffer.create({
        trade_id: selectedTrade.id,
        receiver_id: selectedTrade.author_id,
        receiver_name: selectedTrade.author_name,
        author_id: currentUserId,
        author_name: currentUserName,
        author_avatar: currentUserAvatar,
        offer_items: offerMakingItems,
        status: 'pending',
        created_date: new Date().toISOString()
      });
      setOfferMakingItems([]);
      setSelectedTrade(null);
      qc.invalidateQueries({ queryKey: ['trade-offers-list'] });
      setActionMsg('Offer sent successfully! Check Mailbox for replies.');
    } catch (err) {
      setActionMsg(err.message || 'Failed to send offer.');
    } finally {
      setBusy(!1);
    }
  };

  let handleOfferStatus = async (offerId, status, counterDetails = null) => {
    setBusy(!0);
    try {
      let payload = { status };
      if (counterDetails) {
        payload.counter_items = counterDetails;
        payload.counter_by = currentUserName;
      }
      await Y.entities.TradeOffer.update(offerId, payload);
      qc.invalidateQueries({ queryKey: ['trade-offers-list'] });
      setCounteringOffer(null);
      setCounterItems([]);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(!1);
    }
  };

  let handleDeleteTrade = async (tradeId) => {
    try {
      await Y.entities.Trade.delete(tradeId);
      qc.invalidateQueries({ queryKey: ['trades-list'] });
    } catch (e) {
      console.error(e);
    }
  };

  return (0,L.jsxs)('div', {
    className: 'min-h-screen bg-background text-foreground',
    children: [
      (0,L.jsx)(Og, {}),
      (0,L.jsxs)('div', {
        className: 'mx-auto max-w-6xl px-4 py-8 sm:px-6',
        children: [
          (0,L.jsxs)('div', {
            className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6',
            children: [
              (0,L.jsxs)('div', {
                children: [
                  (0,L.jsx)('h1', { className: 'text-2xl sm:text-3xl font-black tracking-tight glitch-text', 'data-text': 'COMMUNITY TRADES & MAILBOX', children: 'COMMUNITY TRADES & MAILBOX' }),
                  (0,L.jsx)('p', { className: 'text-xs text-muted-foreground mt-1', children: 'List your items, receive offers in your mailbox, and accept, decline, or counter in real time.' })
                ]
              }),
              (0,L.jsxs)('div', {
                className: 'flex items-center gap-2 bg-secondary/80 p-1 rounded-2xl border border-border',
                children: [
                  (0,L.jsx)('button', {
                    onClick: () => setActiveTab('browse'),
                    className: \`px-4 py-2 text-xs font-bold rounded-xl transition-all \${activeTab === 'browse' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}\`,
                    children: 'Browse Trades'
                  }),
                  (0,L.jsxs)('button', {
                    onClick: () => setActiveTab('mailbox'),
                    className: \`relative px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'mailbox' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}\`,
                    children: [
                      'Mailbox',
                      pendingOffersCount > 0 && (0,L.jsx)('span', { className: 'rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-black text-white animate-pulse', children: pendingOffersCount })
                    ]
                  }),
                  (0,L.jsxs)('button', {
                    onClick: () => setActiveTab('create'),
                    className: \`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 \${activeTab === 'create' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}\`,
                    children: [(0,L.jsx)(Mi, { className: 'h-3.5 w-3.5' }), 'List a Trade']
                  })
                ]
              })
            ]
          }),

          actionMsg && (0,L.jsx)('div', { className: 'mt-4 rounded-xl border border-primary/40 bg-primary/10 p-3 text-xs font-bold text-primary', children: actionMsg }),

          // TAB 1: BROWSE TRADES
          activeTab === 'browse' && (0,L.jsxs)('div', {
            className: 'mt-6 space-y-4',
            children: [
              trades.length === 0 ? (0,L.jsxs)('div', {
                className: 'rounded-3xl border border-border bg-card p-12 text-center',
                children: [
                  (0,L.jsx)('p', { className: 'text-sm text-muted-foreground', children: 'No community trades listed yet. Be the first to list one!' }),
                  (0,L.jsx)('button', { onClick: () => setActiveTab('create'), className: 'mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground', children: 'Create First Trade' })
                ]
              }) : trades.map(tItem => (0,L.jsxs)('div', {
                className: 'rounded-3xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-primary/40 shadow-sm',
                children: [
                  (0,L.jsxs)('div', {
                    className: 'flex items-center justify-between border-b border-border/60 pb-3',
                    children: [
                      (0,L.jsxs)('div', {
                        className: 'flex items-center gap-2.5',
                        children: [
                          (0,L.jsx)('img', { src: tItem.author_avatar || currentUserAvatar, className: 'h-8 w-8 rounded-full border border-border object-cover', alt: '' }),
                          (0,L.jsxs)('div', {
                            children: [
                              (0,L.jsx)('span', { className: 'text-xs font-extrabold', children: tItem.author_name }),
                              (0,L.jsxs)('span', { className: 'ml-2 text-[10px] text-muted-foreground', children: [new Date(tItem.created_date || Date.now()).toLocaleDateString()] })
                            ]
                          })
                        ]
                      }),
                      (0,L.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          (tItem.author_id === currentUserId || currentUserId === 'usr_ocean') && (0,L.jsx)('button', {
                            onClick: () => handleDeleteTrade(tItem.id),
                            title: 'Delete your trade',
                            className: 'rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive',
                            children: (0,L.jsx)(Zi, { className: 'h-4 w-4' })
                          }),
                          (0,L.jsx)('button', {
                            onClick: () => { setSelectedTrade(tItem); setOfferMakingItems([]); },
                            className: 'rounded-xl bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 shadow-sm',
                            children: 'Make Offer'
                          })
                        ]
                      })
                    ]
                  }),
                  (0,L.jsxs)('div', {
                    className: 'mt-4 grid gap-4 sm:grid-cols-2',
                    children: [
                      (0,L.jsxs)('div', {
                        className: 'rounded-2xl border border-border/70 bg-secondary/30 p-3',
                        children: [
                          (0,L.jsxs)('span', { className: 'text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-2', children: ['Offering (', (tItem.offer_items || []).length, ' items):'] }),
                          (0,L.jsx)('div', {
                            className: 'flex flex-wrap gap-1.5',
                            children: (tItem.offer_items || []).map((it, idx) => (0,L.jsxs)('div', {
                              className: 'flex items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1',
                              children: [
                                (0,L.jsx)(xg, { item: it, className: 'h-6 w-6 object-contain' }),
                                (0,L.jsx)('span', { className: 'text-[11px] font-bold truncate max-w-[100px]', children: it.name }),
                                it.potion && (0,L.jsx)(Fg, { potion: it.potion })
                              ]
                            }, idx))
                          })
                        ]
                      }),
                      (0,L.jsxs)('div', {
                        className: 'rounded-2xl border border-border/70 bg-secondary/30 p-3',
                        children: [
                          (0,L.jsx)('span', { className: 'text-[11px] font-extrabold uppercase tracking-wider text-pink-300 block mb-2', children: 'Looking For / Signs:' }),
                          (0,L.jsx)('div', {
                            className: 'flex flex-wrap gap-1.5',
                            children: (tItem.looking_for || []).length > 0 ? (tItem.looking_for || []).map((it, idx) => (0,L.jsxs)('div', {
                              className: \`flex items-center gap-1.5 rounded-lg border px-2 py-1 \${it.is_sign ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' : 'border-border bg-card'}\`,
                              children: [
                                (0,L.jsx)(xg, { item: it, className: 'h-6 w-6 object-contain' }),
                                (0,L.jsx)('span', { className: 'text-[11px] font-bold truncate max-w-[100px]', children: it.name })
                              ]
                            }, idx)) : (0,L.jsx)('span', { className: 'text-xs text-muted-foreground italic', children: 'Any fair offer / upgrades' })
                          })
                        ]
                      })
                    ]
                  }),
                  tItem.note && (0,L.jsxs)('p', { className: 'mt-3 text-xs text-muted-foreground bg-secondary/20 rounded-xl px-3 py-1.5', children: ['Note: ', tItem.note] })
                ]
              }, tItem.id))
            ]
          }),

          // TAB 2: CREATE TRADE
          activeTab === 'create' && (0,L.jsxs)('div', {
            className: 'mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8 max-w-4xl mx-auto shadow-sm',
            children: [
              (0,L.jsx)('h2', { className: 'text-lg font-black', children: 'Create a Trade Listing' }),
              (0,L.jsx)('p', { className: 'text-xs text-muted-foreground mt-1', children: 'Add up to 18 pets or items to your offer, and specify what you want or trading signs (OP, Small Add, Neons, etc.).' }),
              (0,L.jsxs)('div', {
                className: 'mt-6 grid gap-6 sm:grid-cols-2',
                children: [
                  (0,L.jsxs)('div', {
                    className: 'rounded-2xl border border-primary/30 bg-secondary/20 p-4',
                    children: [
                      (0,L.jsxs)('div', {
                        className: 'flex items-center justify-between mb-3',
                        children: [
                          (0,L.jsxs)('span', { className: 'text-xs font-black uppercase text-primary tracking-wider', children: ['You Offer (', myOfferItems.length, ' / 18)'] }),
                          myOfferItems.length < 18 && (0,L.jsxs)('button', {
                            onClick: () => setPickerTarget('offer'),
                            className: 'rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground hover:opacity-90 flex items-center gap-1',
                            children: [(0,L.jsx)(Mi, { className: 'h-3 w-3' }), 'Add Item']
                          })
                        ]
                      }),
                      (0,L.jsx)('div', {
                        className: 'grid grid-cols-3 gap-2 min-h-[140px]',
                        children: myOfferItems.map((item, idx) => (0,L.jsxs)('div', {
                          className: 'relative aspect-square rounded-xl border border-border bg-card p-1 flex flex-col items-center justify-center group',
                          children: [
                            (0,L.jsx)(xg, { item, className: 'h-full w-full object-contain' }),
                            (0,L.jsx)('span', { className: 'text-[9px] font-bold truncate max-w-full', children: item.name }),
                            (0,L.jsx)('button', {
                              onClick: () => setMyOfferItems(prev => prev.filter((_, i) => i !== idx)),
                              className: 'absolute top-1 right-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity',
                              children: (0,L.jsx)(Zi, { className: 'h-2.5 w-2.5' })
                            })
                          ]
                        }, idx))
                      })
                    ]
                  }),
                  (0,L.jsxs)('div', {
                    className: 'rounded-2xl border border-pink-400/30 bg-secondary/20 p-4',
                    children: [
                      (0,L.jsxs)('div', {
                        className: 'flex items-center justify-between mb-3',
                        children: [
                          (0,L.jsxs)('span', { className: 'text-xs font-black uppercase text-pink-300 tracking-wider', children: ['Looking For / Signs (', lookingForItems.length, ' / 18)'] }),
                          lookingForItems.length < 18 && (0,L.jsxs)('button', {
                            onClick: () => setPickerTarget('want'),
                            className: 'rounded-lg bg-pink-500 px-3 py-1 text-xs font-bold text-white hover:opacity-90 flex items-center gap-1',
                            children: [(0,L.jsx)(Mi, { className: 'h-3 w-3' }), 'Add Want / Sign']
                          })
                        ]
                      }),
                      (0,L.jsx)('div', {
                        className: 'grid grid-cols-3 gap-2 min-h-[140px]',
                        children: lookingForItems.map((item, idx) => (0,L.jsxs)('div', {
                          className: 'relative aspect-square rounded-xl border border-border bg-card p-1 flex flex-col items-center justify-center group',
                          children: [
                            (0,L.jsx)(xg, { item, className: 'h-full w-full object-contain' }),
                            (0,L.jsx)('span', { className: 'text-[9px] font-bold truncate max-w-full', children: item.name }),
                            (0,L.jsx)('button', {
                              onClick: () => setLookingForItems(prev => prev.filter((_, i) => i !== idx)),
                              className: 'absolute top-1 right-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity',
                              children: (0,L.jsx)(Zi, { className: 'h-2.5 w-2.5' })
                            })
                          ]
                        }, idx))
                      })
                    ]
                  })
                ]
              }),
              (0,L.jsxs)('div', {
                className: 'mt-5',
                children: [
                  (0,L.jsx)('label', { className: 'text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1', children: 'Trade Note (Optional)' }),
                  (0,L.jsx)('input', {
                    value: tradeNote,
                    onChange: e => setTradeNote(e.target.value),
                    placeholder: 'e.g. Looking for FR Owl + decent add, or good high tier upgrade',
                    className: 'w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs outline-none focus:border-primary'
                  })
                ]
              }),
              (0,L.jsx)('button', {
                disabled: busy || myOfferItems.length === 0,
                onClick: handlePublishTrade,
                className: 'mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity',
                children: busy ? 'Publishing...' : 'Publish Trade to Community'
              })
            ]
          }),

          // TAB 3: MAILBOX
          activeTab === 'mailbox' && (0,L.jsxs)('div', {
            className: 'mt-6 space-y-4',
            children: [
              (0,L.jsx)('h2', { className: 'text-lg font-black', children: 'Trade Mailbox' }),
              (0,L.jsx)('p', { className: 'text-xs text-muted-foreground', children: 'Review offers made on your listed trades. You can Accept, Decline, or Counter each offer.' }),
              receivedOffers.length === 0 ? (0,L.jsxs)('div', {
                className: 'rounded-3xl border border-border bg-card p-12 text-center',
                children: [
                  (0,L.jsx)('p', { className: 'text-sm text-muted-foreground', children: 'Your mailbox is empty. List more trades to receive offers from other players!' }),
                  (0,L.jsx)('button', { onClick: () => setActiveTab('create'), className: 'mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground', children: 'List a Trade' })
                ]
              }) : receivedOffers.map(offer => (0,L.jsxs)('div', {
                className: 'rounded-3xl border border-border bg-card p-5 sm:p-6 transition-all',
                children: [
                  (0,L.jsxs)('div', {
                    className: 'flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3',
                    children: [
                      (0,L.jsxs)('div', {
                        className: 'flex items-center gap-2.5',
                        children: [
                          (0,L.jsx)('img', { src: offer.author_avatar || currentUserAvatar, className: 'h-8 w-8 rounded-full border border-border object-cover', alt: '' }),
                          (0,L.jsxs)('div', {
                            children: [
                              (0,L.jsx)('span', { className: 'text-xs font-extrabold', children: offer.author_name }),
                              (0,L.jsxs)('span', { className: 'ml-2 text-[10px] text-muted-foreground', children: [new Date(offer.created_date || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })] })
                            ]
                          })
                        ]
                      }),
                      (0,L.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0,L.jsx)('span', {
                            className: \`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider \${offer.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-400' : offer.status === 'declined' ? 'bg-rose-500/20 text-rose-400' : offer.status === 'countered' ? 'bg-amber-500/20 text-amber-400' : 'bg-primary/20 text-primary'}\`,
                            children: offer.status
                          })
                        ]
                      })
                    ]
                  }),
                  (0,L.jsxs)('div', {
                    className: 'mt-4',
                    children: [
                      (0,L.jsx)('span', { className: 'text-xs font-bold text-muted-foreground block mb-2', children: 'Offered Items:' }),
                      (0,L.jsx)('div', {
                        className: 'flex flex-wrap gap-2',
                        children: (offer.offer_items || []).map((it, idx) => (0,L.jsxs)('div', {
                          className: 'flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-2.5 py-1.5',
                          children: [
                            (0,L.jsx)(xg, { item: it, className: 'h-7 w-7 object-contain' }),
                            (0,L.jsx)('span', { className: 'text-xs font-bold', children: it.name }),
                            it.potion && (0,L.jsx)(Fg, { potion: it.potion })
                          ]
                        }, idx))
                      })
                    ]
                  }),
                  offer.counter_items && (0,L.jsxs)('div', {
                    className: 'mt-3 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-3',
                    children: [
                      (0,L.jsxs)('span', { className: 'text-xs font-extrabold text-amber-300 block mb-1', children: ['Counter Offer by ', offer.counter_by || 'Trader', ':'] }),
                      (0,L.jsx)('div', {
                        className: 'flex flex-wrap gap-1.5',
                        children: offer.counter_items.map((it, idx) => (0,L.jsxs)('div', {
                          className: 'flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1',
                          children: [
                            (0,L.jsx)(xg, { item: it, className: 'h-5 w-5 object-contain' }),
                            (0,L.jsx)('span', { className: 'text-[11px] font-bold', children: it.name })
                          ]
                        }, idx))
                      })
                    ]
                  }),
                  offer.status === 'pending' && (0,L.jsxs)('div', {
                    className: 'mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3',
                    children: [
                      (0,L.jsx)('button', {
                        disabled: busy,
                        onClick: () => handleOfferStatus(offer.id, 'accepted'),
                        className: 'rounded-xl bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors',
                        children: 'Accept Trade'
                      }),
                      (0,L.jsx)('button', {
                        disabled: busy,
                        onClick: () => handleOfferStatus(offer.id, 'declined'),
                        className: 'rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-colors',
                        children: 'Decline'
                      }),
                      (0,L.jsx)('button', {
                        disabled: busy,
                        onClick: () => { setCounteringOffer(offer); setCounterItems([...(offer.offer_items || [])]); },
                        className: 'rounded-xl border border-amber-400/50 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-colors',
                        children: 'Counter Offer'
                      })
                    ]
                  })
                ]
              }, offer.id))
            ]
          })
        ]
      }),

      // MAKE OFFER MODAL
      selectedTrade && (0,L.jsxs)('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm',
        children: [
          (0,L.jsxs)('div', {
            className: 'relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl',
            children: [
              (0,L.jsx)('button', { onClick: () => setSelectedTrade(null), className: 'absolute top-4 right-4 rounded-full bg-secondary p-1.5 text-muted-foreground hover:text-foreground', children: (0,L.jsx)(Zi, { className: 'h-4 w-4' }) }),
              (0,L.jsxs)('h2', { className: 'text-lg font-black', children: ['Make Offer to ', selectedTrade.author_name] }),
              (0,L.jsx)('p', { className: 'text-xs text-muted-foreground mt-1', children: 'Select up to 18 pets or signs to offer for their trade.' }),
              (0,L.jsxs)('div', {
                className: 'mt-4 rounded-2xl border border-border bg-secondary/30 p-3 min-h-[140px]',
                children: [
                  (0,L.jsxs)('div', {
                    className: 'flex items-center justify-between mb-2',
                    children: [
                      (0,L.jsxs)('span', { className: 'text-xs font-bold text-primary', children: ['Your Offer (', offerMakingItems.length, ' / 18)'] }),
                      offerMakingItems.length < 18 && (0,L.jsxs)('button', {
                        onClick: () => setPickerTarget('make_offer'),
                        className: 'rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground hover:opacity-90 flex items-center gap-1',
                        children: [(0,L.jsx)(Mi, { className: 'h-3 w-3' }), 'Add Pet']
                      })
                    ]
                  }),
                  (0,L.jsx)('div', {
                    className: 'grid grid-cols-4 gap-2',
                    children: offerMakingItems.map((item, idx) => (0,L.jsxs)('div', {
                      className: 'relative aspect-square rounded-xl border border-border bg-card p-1 flex flex-col items-center justify-center group',
                      children: [
                        (0,L.jsx)(xg, { item, className: 'h-full w-full object-contain' }),
                        (0,L.jsx)('span', { className: 'text-[9px] font-bold truncate max-w-full', children: item.name }),
                        (0,L.jsx)('button', {
                          onClick: () => setOfferMakingItems(prev => prev.filter((_, i) => i !== idx)),
                          className: 'absolute top-1 right-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity',
                          children: (0,L.jsx)(Zi, { className: 'h-2 w-2' })
                        })
                      ]
                    }, idx))
                  })
                ]
              }),
              (0,L.jsx)('button', {
                disabled: busy || offerMakingItems.length === 0,
                onClick: handleSendOffer,
                className: 'mt-5 w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity',
                children: busy ? 'Sending...' : 'Send Offer to Mailbox'
              })
            ]
          })
        ]
      }),

      // COUNTER OFFER MODAL
      counteringOffer && (0,L.jsxs)('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm',
        children: [
          (0,L.jsxs)('div', {
            className: 'relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl',
            children: [
              (0,L.jsx)('button', { onClick: () => setCounteringOffer(null), className: 'absolute top-4 right-4 rounded-full bg-secondary p-1.5 text-muted-foreground hover:text-foreground', children: (0,L.jsx)(Zi, { className: 'h-4 w-4' }) }),
              (0,L.jsxs)('h2', { className: 'text-lg font-black', children: ['Counter Offer for ', counteringOffer.author_name] }),
              (0,L.jsx)('p', { className: 'text-xs text-muted-foreground mt-1', children: 'Adjust the items or add signs (like Small Add, OP) to propose a modified trade.' }),
              (0,L.jsxs)('div', {
                className: 'mt-4 rounded-2xl border border-border bg-secondary/30 p-3 min-h-[140px]',
                children: [
                  (0,L.jsxs)('div', {
                    className: 'flex items-center justify-between mb-2',
                    children: [
                      (0,L.jsxs)('span', { className: 'text-xs font-bold text-amber-300', children: ['Counter Items (', counterItems.length, ' / 18)'] }),
                      counterItems.length < 18 && (0,L.jsxs)('button', {
                        onClick: () => setPickerTarget('counter'),
                        className: 'rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-white hover:opacity-90 flex items-center gap-1',
                        children: [(0,L.jsx)(Mi, { className: 'h-3 w-3' }), 'Add Pet / Sign']
                      })
                    ]
                  }),
                  (0,L.jsx)('div', {
                    className: 'grid grid-cols-4 gap-2',
                    children: counterItems.map((item, idx) => (0,L.jsxs)('div', {
                      className: 'relative aspect-square rounded-xl border border-border bg-card p-1 flex flex-col items-center justify-center group',
                      children: [
                        (0,L.jsx)(xg, { item, className: 'h-full w-full object-contain' }),
                        (0,L.jsx)('span', { className: 'text-[9px] font-bold truncate max-w-full', children: item.name }),
                        (0,L.jsx)('button', {
                          onClick: () => setCounterItems(prev => prev.filter((_, i) => i !== idx)),
                          className: 'absolute top-1 right-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity',
                          children: (0,L.jsx)(Zi, { className: 'h-2 w-2' })
                        })
                      ]
                    }, idx))
                  })
                ]
              }),
              (0,L.jsx)('button', {
                disabled: busy || counterItems.length === 0,
                onClick: () => handleOfferStatus(counteringOffer.id, 'countered', counterItems),
                className: 'mt-5 w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white hover:bg-amber-600 disabled:opacity-50 transition-colors',
                children: busy ? 'Sending Counter...' : 'Send Counter Offer'
              })
            ]
          })
        ]
      }),

      // ITEM PICKER FOR TRADES
      pickerTarget && (0,L.jsx)(i_, {
        onSelect: (pet) => {
          let item = { ...pet, uid: uid() };
          if (pickerTarget === 'offer') setMyOfferItems(prev => prev.length < 18 ? [...prev, item] : prev);
          else if (pickerTarget === 'want') setLookingForItems(prev => prev.length < 18 ? [...prev, item] : prev);
          else if (pickerTarget === 'make_offer') setOfferMakingItems(prev => prev.length < 18 ? [...prev, item] : prev);
          else if (pickerTarget === 'counter') setCounterItems(prev => prev.length < 18 ? [...prev, item] : prev);
          setPickerTarget(null);
        },
        excludeIds: [],
        onClose: () => setPickerTarget(null)
      }),

      (0,L.jsx)(kg, {})
    ]
  });
}
`;

js = js.substring(0, idxP) + newP + js.substring(idxM);
console.log("[OK] Patched p_ with full Community Trades & Mailbox feature!");

fs.writeFileSync(filePath, js);
