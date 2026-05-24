// ui_kits/chat/components.jsx — all chat UI components, exported to window

const { useState, useEffect, useRef } = React;

// ---------- Icons (Lucide via CDN, rendered by name) ----------
function Icon({ name, size = 18 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': 1.75 } });
    }
  }, [name, size]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size }} />;
}

// ---------- Brand mark (inline SVG so it renders before lucide loads) ----------
function Mark({ size = 26 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 40 40" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 2 C 30 2, 36 10, 36 20 C 36 28, 31 34, 25 37 L 25 39 Q 25 40, 23.5 40 L 16.5 40 Q 15 40, 15 39 L 15 37 C 9 34, 4 28, 4 20 C 4 10, 10 2, 20 2 Z"/>
      <circle cx="20" cy="19" r="6"/>
    </svg>
  );
}

function Mascot({ size = 72 }) {
  return (
    <svg className="mascot" width={size} height={size} viewBox="0 0 64 64" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6 C 44 6, 52 16, 52 30 C 52 41, 46 49, 38 53 L 38 56 Q 38 58, 36 58 L 28 58 Q 26 58, 26 56 L 26 53 C 18 49, 12 41, 12 30 C 12 16, 20 6, 32 6 Z"/>
      <circle cx="32" cy="28" r="8"/>
      <circle cx="28.5" cy="27" r="1.1" fill="currentColor" stroke="none"/>
      <circle cx="35.5" cy="27" r="1.1" fill="currentColor" stroke="none"/>
      <path d="M29 31 Q 32 33.5, 35 31"/>
      <path d="M32 4 v -2"/><path d="M48 12 l 1.5 -1.5"/><path d="M16 12 l -1.5 -1.5"/>
      <path d="M54 28 h 2"/><path d="M10 28 h -2"/>
    </svg>
  );
}

// ---------- Sidebar ----------
function Sidebar({ conversations, activeId, onSelect, onNew, collapsed, onToggle, onOpenSettings }) {
  const grouped = { Today: [], 'This week': [], Earlier: [] };
  for (const c of conversations) (grouped[c.bucket] || grouped.Earlier).push(c);

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <a className="brand" href="#" onClick={(e)=>e.preventDefault()}>
          <Mark size={26} />
          <span className="name">Lumen</span>
        </a>
        <button className="icon-btn" onClick={onToggle} title="Collapse">
          <Icon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={18} />
        </button>
      </div>

      <button className="sidebar-new" onClick={onNew}>
        <Icon name="plus" size={16} />
        <span>New chat</span>
      </button>

      <div className="sidebar-scroll">
        {Object.entries(grouped).map(([bucket, list]) => list.length ? (
          <div key={bucket}>
            <div className="sidebar-section">{bucket}</div>
            {list.map(c => (
              <div key={c.id}
                className={'convo' + (c.id === activeId ? ' active' : '')}
                onClick={() => onSelect(c.id)}>
                <Icon name="message-circle" size={15} />
                <span className="convo-label">{c.title}</span>
              </div>
            ))}
          </div>
        ) : null)}
      </div>

      <div className="sidebar-footer">
        <div className="avatar-sm">E</div>
        <div className="who">Evelyn Chen</div>
        <button className="icon-btn" onClick={onOpenSettings} title="Settings">
          <Icon name="settings" size={16} />
        </button>
      </div>
    </aside>
  );
}

// ---------- Topbar ----------
function Topbar({ title, model, onModel, onShare, onTheme, theme }) {
  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
  const themeIcon = theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'monitor';
  return (
    <header className="topbar">
      <div className="topbar-title">
        <span>{title}</span>
        <span className="model-pill">
          <Icon name="sparkles" size={12} />{model}
        </span>
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" onClick={onShare} title="Share">
          <Icon name="share-2" size={16} />
        </button>
        <button className="icon-btn" onClick={() => onTheme(nextTheme)} title={'Theme: ' + theme}>
          <Icon name={themeIcon} size={16} />
        </button>
      </div>
    </header>
  );
}

// ---------- Empty state ----------
function EmptyState({ onPick }) {
  const suggestions = [
    { t: 'Rewrite this email', s: 'Plain, confident, no hedging.' },
    { t: 'Explain a concept simply', s: 'Transformers, like I\'m 12.' },
    { t: 'Draft a short poem', s: 'About the smell of books.' },
    { t: 'Summarize a meeting', s: 'Paste transcript, get notes.' },
  ];
  return (
    <div className="empty">
      <Mascot size={72} />
      <h1>What's on your mind today?</h1>
      <div className="suggest">
        {suggestions.map((s, i) => (
          <button key={i} className="suggest-card" onClick={() => onPick(s.t + ' — ' + s.s)}>
            <div className="sc-title">{s.t}</div>
            <div className="sc-sub">{s.s}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Messages ----------
function UserBubble({ text }) {
  return <div className="bubble-user">{text}</div>;
}

function AssistMessage({ parts, streaming, onCopy }) {
  return (
    <>
      <div className="assist-row">
        <div className="assist-avatar"><Mark size={18} /></div>
        <div className="assist-body">
          {parts.map((p, i) => {
            if (p.kind === 'rich') return <div key={i}>{p.render()}</div>;
            if (p.kind === 'text') return <p key={i}>{p.text}{streaming && i === parts.length - 1 ? <span className="cursor"/> : null}</p>;
            if (p.kind === 'code') return <CodeCard key={i} lang={p.lang} code={p.code} />;
            if (p.kind === 'artifact') return <ArtifactCard key={i} title={p.title} body={p.body} />;
            return null;
          })}
        </div>
      </div>
      {!streaming && (
        <div className="msg-actions">
          <button className="icon-btn" onClick={onCopy} title="Copy"><Icon name="copy" size={15}/></button>
          <button className="icon-btn" title="Regenerate"><Icon name="refresh-cw" size={15}/></button>
          <button className="icon-btn" title="Good response"><Icon name="thumbs-up" size={15}/></button>
          <button className="icon-btn" title="Bad response"><Icon name="thumbs-down" size={15}/></button>
        </div>
      )}
    </>
  );
}

function CodeCard({ lang, code }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="code-card">
      <div className="code-bar">
        <span>{lang}</span>
        <button className="code-copy" onClick={onCopy}>
          <Icon name={copied ? 'check' : 'copy'} size={12} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}

function ArtifactCard({ title, body }) {
  return (
    <div className="artifact">
      <div className="artifact-head">
        <span className="title"><Icon name="file-text" size={16}/>{title}</span>
        <div style={{ display:'flex', gap:2 }}>
          <button className="icon-btn" title="Open"><Icon name="maximize-2" size={15}/></button>
          <button className="icon-btn" title="Copy"><Icon name="copy" size={15}/></button>
        </div>
      </div>
      <div className="artifact-body">{body}</div>
    </div>
  );
}

// ---------- Composer ----------
function Composer({ value, onChange, onSend, disabled, model, onModel }) {
  const taRef = useRef(null);
  useEffect(() => {
    const ta = taRef.current; if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 240) + 'px';
  }, [value]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  return (
    <div className="composer-wrap">
      <div style={{ width: '100%', maxWidth: 760 }}>
        <div className="composer">
          <textarea
            ref={taRef}
            value={value}
            placeholder="Ask Lumen anything"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
          />
          <div className="composer-tools">
            <button className="icon-btn" title="Attach"><Icon name="paperclip" size={16}/></button>
            <ModelPicker model={model} onModel={onModel} />
            <span className="spacer"/>
            <button className="send" onClick={onSend} disabled={!value.trim() || disabled} title="Send">
              <Icon name="arrow-up" size={16} />
            </button>
          </div>
        </div>
        <div className="composer-hint">Lumen can make mistakes — check important details.</div>
      </div>
    </div>
  );
}

function ModelPicker({ model, onModel }) {
  const [open, setOpen] = useState(false);
  const models = ['Lumen Sonnet', 'Lumen Opus', 'Lumen Haiku'];
  return (
    <div style={{ position: 'relative' }}>
      <button className="icon-btn" onClick={() => setOpen(o => !o)} style={{ width:'auto', padding:'4px 8px', gap:4, fontSize:12, color:'var(--fg-2)' }}>
        {model} <Icon name="chevron-down" size={12}/>
      </button>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position:'absolute', bottom:'calc(100% + 6px)', left:0, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-md)', padding:4, minWidth:170, zIndex:10 }}>
          {models.map(m => (
            <div key={m} onClick={() => onModel(m)}
              style={{ padding:'8px 10px', fontSize:13, cursor:'pointer', borderRadius:6, display:'flex', justifyContent:'space-between', alignItems:'center', color: m===model?'var(--fg-1)':'var(--fg-2)' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              {m} {m===model && <Icon name="check" size={14}/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Settings modal ----------
function SettingsModal({ theme, onTheme, density, onDensity, notifications, onNotifications, onClose }) {
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Settings</h2>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18}/></button>
        </div>
        <div className="modal-body">
          <div className="setting-row">
            <div>
              <div className="label">Appearance</div>
              <div className="desc">Lumen follows your system by default.</div>
            </div>
            <div className="segmented">
              {['light', 'dark', 'auto'].map(t => (
                <button key={t} className={theme === t ? 'on' : ''} onClick={() => onTheme(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="setting-row">
            <div>
              <div className="label">Density</div>
              <div className="desc">How closely elements are spaced.</div>
            </div>
            <div className="segmented">
              {['cozy', 'spacious'].map(t => (
                <button key={t} className={density === t ? 'on' : ''} onClick={() => onDensity(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
              ))}
            </div>
          </div>
          <div className="setting-row">
            <div>
              <div className="label">Email notifications</div>
              <div className="desc">A weekly digest of your conversations.</div>
            </div>
            <div className={'switch' + (notifications ? ' on' : '')} onClick={() => onNotifications(!notifications)} />
          </div>
          <div className="setting-row">
            <div>
              <div className="label">Delete all conversations</div>
              <div className="desc">Remove every chat tied to this account.</div>
            </div>
            <button className="btn" style={{ background:'transparent', color:'var(--danger)', border:'1px solid var(--danger)', padding:'6px 12px', borderRadius:'var(--radius-md)', fontSize:13, cursor:'pointer' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, Mark, Mascot,
  Sidebar, Topbar, EmptyState,
  UserBubble, AssistMessage, CodeCard, ArtifactCard,
  Composer, ModelPicker, SettingsModal,
});
