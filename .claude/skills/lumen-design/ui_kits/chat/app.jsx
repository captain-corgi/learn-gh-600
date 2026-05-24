// ui_kits/chat/app.jsx — interactive chat app

const { useState, useEffect } = React;

const SEED_CONVOS = [
  { id: 'biDemo', bucket: 'Today', title: 'Q3 revenue breakdown' },
  { id: 'c1', bucket: 'Today', title: 'Rewrite a confident email' },
  { id: 'c2', bucket: 'Today', title: 'Short poem about old books' },
  { id: 'c3', bucket: 'This week', title: 'Explain transformers simply' },
  { id: 'c4', bucket: 'This week', title: 'Plan a weekend in Kyoto' },
  { id: 'c5', bucket: 'Earlier', title: 'Recipe: miso-glazed aubergine' },
  { id: 'c6', bucket: 'Earlier', title: 'Feedback on a cover letter' },
];

const SEED_MESSAGES = {
  c1: [
    { role: 'user', text: 'Can you rewrite this paragraph to sound more confident? "I think maybe we could possibly try a smaller launch first, if that seems okay."' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'Here is a tighter version that keeps your voice but trims the hedging:' },
      { kind: 'artifact', title: 'Rewritten paragraph', body: '"Let\'s start with a smaller launch. It gives us room to learn before we scale, and the team will move faster with a narrow target."' },
      { kind: 'text', text: 'Three changes: "I think maybe" becomes a direct statement, the conditional softener at the end is cut, and the second sentence carries the reason so the first can stay short.' }
    ]}
  ],
  c2: [
    { role: 'user', text: 'Write a short poem about the smell of old books.' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'A small one — four lines, warm and specific:' },
      { kind: 'artifact', title: 'Untitled', body: 'Old paper keeps its weather in the spine —\nvanilla, cellar, distant summer rain.\nYou open it, and someone\'s quiet hour\nbreathes out across your hands again.' }
    ]}
  ],
  c3: [
    { role: 'user', text: 'Explain transformers like I\'m twelve.' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'Imagine reading a sentence, but instead of going one word at a time, every word gets to glance at every other word before deciding what it means. That glancing is called attention, and transformers are just very good at doing it in parallel.' },
      { kind: 'code', lang: 'python', code: '<span class="com"># A toy attention score</span>\n<span class="kw">def</span> <span class="fn">attend</span>(query, keys):\n    <span class="kw">return</span> [softmax(dot(query, k)) <span class="kw">for</span> k <span class="kw">in</span> keys]' },
      { kind: 'text', text: 'Stack that trick in layers and it starts to feel like reading — not memorization, but understanding in context.' }
    ]}
  ],
  c4: [
    { role: 'user', text: 'Plan a calm three-day weekend in Kyoto.' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'Here is a gentle route that stays mostly on foot, with breaks built in.' },
      { kind: 'artifact', title: 'Kyoto · three days', body: 'Day 1 — Arashiyama morning (bamboo before 8am), long lunch, Okochi Sanso garden.\nDay 2 — Eastern path: Ginkaku-ji, Philosopher\'s Walk, Nanzen-ji, tea at Murin-an.\nDay 3 — Fushimi Inari at sunrise, Tofuku-ji gardens, rest before the train.' }
    ]}
  ],
  c5: [
    { role: 'user', text: 'Give me a miso-glazed aubergine recipe, under 30 minutes.' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'A simple one — one pan, no deep-frying.' },
      { kind: 'code', lang: 'markdown', code: '<span class="kw">Ingredients</span>\n- 2 aubergines, halved\n- 3 tbsp white miso\n- 2 tbsp mirin\n- 1 tbsp sugar\n- splash of sake\n\n<span class="kw">Method</span>\n1. Score flesh, steam 8 min.\n2. Broil cut-side up with glaze for 4 min until lacquered.' }
    ]}
  ],
  c6: [
    { role: 'user', text: 'Read this cover letter and tell me what is and isn\'t landing.' },
    { role: 'assistant', parts: [
      { kind: 'text', text: 'The opening is genuine — it reads like you, not like a template. The middle paragraph softens three times in a row ("if you\'d like", "perhaps", "I think"). Cut two of those and it sharpens without losing warmth.' }
    ]}
  ],
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [convos, setConvos] = useState(SEED_CONVOS);
  const [activeId, setActiveId] = useState('biDemo');
  const [messagesById, setMessagesById] = useState({ ...SEED_MESSAGES, ...(window.BI_MESSAGES || {}) });
  const [composerText, setComposerText] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [model, setModel] = useState('Lumen Sonnet');
  const [theme, setTheme] = useState('light');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [density, setDensity] = useState('spacious');
  const [notifications, setNotifications] = useState(true);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Tweaks host-protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const active = convos.find(c => c.id === activeId);
  const activeMessages = messagesById[activeId] || [];

  const handleNew = () => {
    const id = 'c' + Date.now();
    setConvos([{ id, bucket: 'Today', title: 'New conversation' }, ...convos]);
    setMessagesById({ ...messagesById, [id]: [] });
    setActiveId(id);
  };

  const handleSend = () => {
    const text = composerText.trim();
    if (!text) return;
    setComposerText('');
    const newMessages = [...activeMessages, { role: 'user', text }];
    setMessagesById(m => ({ ...m, [activeId]: newMessages }));

    if (convos.find(c => c.id === activeId)?.title === 'New conversation') {
      setConvos(cs => cs.map(c => c.id === activeId ? { ...c, title: text.slice(0, 40) } : c));
    }

    setStreaming(true);
    const reply = fakeReply(text);
    let i = 0;
    const words = reply.split(' ');
    setMessagesById(m => ({ ...m, [activeId]: [...newMessages, { role: 'assistant', parts: [{ kind: 'text', text: '' }] }] }));
    const tick = setInterval(() => {
      i++;
      setMessagesById(m => {
        const list = [...(m[activeId] || [])];
        const last = list[list.length - 1];
        if (last?.role === 'assistant') {
          last.parts = [{ kind: 'text', text: words.slice(0, i).join(' ') }];
        }
        return { ...m, [activeId]: list };
      });
      if (i >= words.length) { clearInterval(tick); setStreaming(false); }
    }, 40);
  };

  return (
    <div className={'app' + (collapsed ? ' collapsed' : '')}>
      <Sidebar
        conversations={convos}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={handleNew}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="main">
        <Topbar
          title={active?.title || 'New conversation'}
          model={model}
          onModel={setModel}
          onShare={() => {}}
          onTheme={setTheme}
          theme={theme}
        />

        <div className="thread">
          {activeMessages.length === 0 ? (
            <EmptyState onPick={(t) => setComposerText(t)} />
          ) : (
            <div className="thread-inner">
              {activeMessages.map((m, i) => (
                <div className="turn" key={i}>
                  {m.role === 'user'
                    ? <UserBubble text={m.text} />
                    : <AssistMessage parts={m.parts} streaming={streaming && i === activeMessages.length - 1} onCopy={() => navigator.clipboard?.writeText(m.parts.map(p => p.text || p.body || '').join('\n'))} />}
                </div>
              ))}
            </div>
          )}
        </div>

        <Composer
          value={composerText}
          onChange={setComposerText}
          onSend={handleSend}
          disabled={streaming}
          model={model}
          onModel={setModel}
        />
      </div>

      {settingsOpen && (
        <SettingsModal
          theme={theme} onTheme={setTheme}
          density={density} onDensity={setDensity}
          notifications={notifications} onNotifications={setNotifications}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {tweaksOpen && <TweaksPanel />}
    </div>
  );
}

function fakeReply(input) {
  return 'Good question. Here is a first take: ' + input.toLowerCase().replace(/[?.!]/g, '') + '. I kept the tone warm and concrete, and trimmed anywhere the sentence was doing more work than it needed to. Want me to try a shorter version, or lean more literary?';
}

// ---------- Tweaks panel ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c96442",
  "radius": 10,
  "serif": "'Source Serif 4', Georgia, serif"
}/*EDITMODE-END*/;

function TweaksPanel() {
  const [accent, setAccent] = useState(TWEAK_DEFAULTS.accent);
  const [radius, setRadius] = useState(TWEAK_DEFAULTS.radius);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-hover', shade(accent, -10));
    document.documentElement.style.setProperty('--accent-press', shade(accent, -20));
    document.documentElement.style.setProperty('--accent-bg-soft', hex2rgba(accent, 0.12));
    document.documentElement.style.setProperty('--accent-border', hex2rgba(accent, 0.28));
    document.documentElement.style.setProperty('--ring', `0 0 0 3px ${hex2rgba(accent, 0.28)}`);
    window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { accent } }, '*');
  }, [accent]);

  useEffect(() => {
    document.documentElement.style.setProperty('--radius-md', radius + 'px');
    document.documentElement.style.setProperty('--radius-lg', (radius + 4) + 'px');
    window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: { radius } }, '*');
  }, [radius]);

  const accents = ['#c96442', '#4f46e5', '#2d7a5f', '#a84a6c', '#1f2937', '#b7791f'];

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <span className="title">Tweaks</span>
        <Icon name="sliders-horizontal" size={16} />
      </div>
      <div className="tweaks-body">
        <div>
          <label>Accent</label>
          <div className="swatches" style={{ marginTop: 6 }}>
            {accents.map(a => (
              <div key={a}
                className={'sw' + (a === accent ? ' on' : '')}
                style={{ background: a }}
                onClick={() => setAccent(a)} />
            ))}
          </div>
        </div>
        <div>
          <label>Corner radius <span className="val">{radius}px</span></label>
          <input type="range" min="2" max="22" value={radius} onChange={(e) => setRadius(+e.target.value)} />
        </div>
      </div>
    </div>
  );
}

function hex2rgba(hex, a) {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map(c => c+c).join('') : v, 16);
  return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`;
}
function shade(hex, pct) {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map(c => c+c).join('') : v, 16);
  const r = Math.max(0, Math.min(255, ((n>>16)&255) + Math.round(255 * pct/100)));
  const g = Math.max(0, Math.min(255, ((n>>8)&255) + Math.round(255 * pct/100)));
  const b = Math.max(0, Math.min(255, (n&255) + Math.round(255 * pct/100)));
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
