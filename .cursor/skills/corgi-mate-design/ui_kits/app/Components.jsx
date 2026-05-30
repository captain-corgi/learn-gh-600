// Corgi Mate — Family App UI Kit · Components

const { useState } = React;

const Icon = ({ d, size = 20, fill = "none", stroke = "currentColor", sw = 1.75, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children || (d ? <path d={d} /> : null)}
  </svg>
);

const HeartMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 18 C26 10 14 12 14 24 C14 34 24 42 32 52 C40 42 50 34 50 24 C50 12 38 10 32 18 Z"
          fill="#E8568A" stroke="#C94572" strokeWidth="2.4" strokeLinejoin="round"/>
  </svg>
);

const IconHome    = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>;
const IconList    = (p) => <Icon {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const IconClock   = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const IconUsers   = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const IconSearch  = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const IconBell    = (p) => <Icon {...p}><path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const IconCheck   = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const IconArrowLeft = (p) => <Icon {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Icon>;

const TopBar = () => (
  <header style={{
    position: "sticky", top: 0, zIndex: 10,
    background: "color-mix(in srgb, var(--bg) 88%, transparent)", backdropFilter: "blur(12px)",
    borderBottom: "1.5px solid var(--border-soft)",
    padding: "10px 24px", display: "flex", alignItems: "center", gap: 18,
  }}>
    <a href="#" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
      <HeartMark size={32}/>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--fg)", letterSpacing: "-0.02em" }}>Corgi Mate</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 11, color: "var(--beanie-pink)", letterSpacing: "0.18em" }}>/ HOME</span>
    </a>
    <div style={{ flex: 1, maxWidth: 520, marginLeft: 32 }}>
      <div style={{ position: "relative" }}>
        <IconSearch size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--fg-3)" }}/>
        <input placeholder="Search tasks, events, recipes…"
               style={{
                 width: "100%", padding: "10px 14px 10px 38px", fontSize: 14,
                 fontFamily: "var(--font-body)", color: "var(--fg)",
                 border: "1.5px solid var(--border-strong)",
                 borderRadius: "var(--r-full)", background: "var(--bg-elevated)", outline: "none",
               }}/>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginLeft: "auto" }}>
      <IconButton aria-label="Notifications">
        <IconBell/>
        <span style={{ position: "absolute", top: 5, right: 6, width: 8, height: 8, borderRadius: 999, background: "var(--beanie-pink)" }}/>
      </IconButton>
      <img src="../../assets/corgi-mate-avatar.png" alt="Corgi Mate"
           style={{ width: 36, height: 36, borderRadius: 999, objectFit: "cover", border: "1.5px solid var(--border)" }}/>
    </div>
  </header>
);

const IconButton = ({ children, ...rest }) => (
  <button {...rest} style={{
    width: 38, height: 38, borderRadius: 999, border: "none", background: "transparent",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "var(--fg-2)", position: "relative",
  }}>{children}</button>
);

const Sidebar = ({ active }) => {
  const items = [
    { id: "home", label: "Today", icon: <IconHome/> },
    { id: "tasks", label: "Tasks", icon: <IconList/> },
    { id: "cal", label: "Calendar", icon: <IconCalendar/> },
    { id: "reminders", label: "Reminders", icon: <IconClock/> },
    { id: "family", label: "Family", icon: <IconUsers/> },
  ];
  return (
    <nav style={{
      width: 220, flexShrink: 0, padding: "20px 12px", borderRight: "1.5px solid var(--border-soft)",
      position: "sticky", top: 64, alignSelf: "flex-start", height: "calc(100vh - 64px)",
    }}>
      {items.map((it) => (
        <button key={it.id} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: "10px 14px", marginBottom: 4, borderRadius: "var(--r-md)",
          border: "none", cursor: "pointer", textAlign: "left",
          fontFamily: "var(--font-body)", fontSize: 14, fontWeight: active === it.id ? 700 : 500,
          color: active === it.id ? "var(--fg)" : "var(--fg-2)",
          background: active === it.id ? "color-mix(in srgb, var(--accent) 16%, var(--bg-elevated))" : "transparent",
          boxShadow: active === it.id ? "inset 3px 0 0 var(--accent)" : "none",
        }}>{it.icon}<span>{it.label}</span></button>
      ))}
    </nav>
  );
};

const AppHeader = ({ tab, onTab, quick }) => (
  <section>
    <div style={{
      height: 160, borderRadius: "var(--r-xl)", margin: "20px 0 0",
      background: "linear-gradient(135deg, #5B8FB9 0%, #4A8B8B 100%)",
      position: "relative", overflow: "hidden", padding: "28px 32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(246,242,234,0.75)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Saturday, May 30</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--warm-cream)", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Good morning, family</h1>
      </div>
      <img src="../../assets/corgi-mate/corgi-mate-pose-11-breakfast.png" alt=""
           style={{ width: 120, height: 120, objectFit: "contain", marginBottom: -10 }}/>
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
      {quick.map((q) => (
        <button key={q.label} style={{
          padding: "10px 16px", borderRadius: "var(--r-lg)", border: "1.5px solid var(--border-soft)",
          background: "var(--bg-elevated)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13,
          cursor: "pointer", color: "var(--fg)",
        }}>{q.label}</button>
      ))}
    </div>
    <div style={{ display: "flex", gap: 4, borderBottom: "1.5px solid var(--border-soft)", marginTop: 20 }}>
      {["Today", "Tasks", "Calendar", "Family"].map((t) => (
        <button key={t} onClick={() => onTab?.(t)} style={{
          padding: "12px 18px", border: "none", background: tab === t ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent", cursor: "pointer",
          fontFamily: "var(--font-body)", fontWeight: tab === t ? 700 : 500, fontSize: 14,
          color: tab === t ? "var(--fg)" : "var(--fg-3)",
          borderBottom: tab === t ? "3px solid var(--mate-orange)" : "3px solid transparent", marginBottom: -1.5,
        }}>{t}</button>
      ))}
    </div>
  </section>
);

const TaskCard = ({ task, onOpen }) => (
  <article onClick={() => onOpen?.(task)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{
      position: "relative", aspectRatio: "16/9", borderRadius: "var(--r-lg)",
      overflow: "hidden", background: task.bg, boxShadow: "var(--shadow-1)",
    }}>
      <div style={{ position: "absolute", inset: 0, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{
          background: task.status === "done" ? "var(--sage-green)" : "var(--heart-tan)",
          color: "var(--fg-on-warm-accent)", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
          padding: "4px 10px", borderRadius: 999, alignSelf: "flex-start",
        }}>{task.category}</span>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "white", fontSize: 28, lineHeight: 1.05, textShadow: "0 2px 6px rgba(0,0,0,0.35)" }}>{task.thumb}</div>
      </div>
      <span style={{
        position: "absolute", bottom: 10, right: 10,
        background: "rgba(42,46,51,0.85)", color: "white",
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
      }}>{task.due}</span>
      {task.status === "done" && (
        <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 999, background: "var(--sage-green)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
          <IconCheck size={18} stroke="white"/>
        </div>
      )}
    </div>
    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, margin: 0, color: "var(--fg)", lineHeight: 1.3 }}>{task.title}</h3>
  </article>
);

const TaskGrid = ({ heading, tasks, onOpen, columns = 3 }) => (
  <section style={{ marginTop: 28 }}>
    {heading && <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, margin: "0 0 16px" }}>{heading}</h2>}
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 20 }}>
      {tasks.map((t) => <TaskCard key={t.id} task={t} onOpen={onOpen}/>)}
    </div>
  </section>
);

const TaskDetail = ({ task, onBack, related }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, paddingTop: 16 }}>
    <main>
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
        background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-2)", fontWeight: 600, marginBottom: 12,
      }}><IconArrowLeft size={16}/> Back to today</button>
      <div style={{ aspectRatio: "16/9", borderRadius: "var(--r-xl)", overflow: "hidden", background: task.bg, boxShadow: "var(--shadow-3)", padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{ background: "var(--heart-tan)", color: "var(--fg)", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999, alignSelf: "flex-start" }}>{task.category}</span>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "white", fontSize: 52, lineHeight: 1.05, textShadow: "0 3px 10px rgba(0,0,0,0.4)" }}>{task.thumb}</div>
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, margin: "20px 0 12px" }}>{task.title}</h1>
      <div style={{ marginTop: 16, padding: 18, borderRadius: "var(--r-lg)", background: "var(--bg-sunken)", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6 }}>
        Due at <strong>{task.due}</strong>. Let's get this handled — three small steps and you're done.
      </div>
    </main>
    <aside>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, margin: "0 0 14px", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Also today</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {related.map((t) => (
          <article key={t.id} style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 100, aspectRatio: "16/9", borderRadius: "var(--r-md)", background: t.bg, flexShrink: 0 }}/>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--fg)", lineHeight: 1.3 }}>{t.title}</div>
          </article>
        ))}
      </div>
    </aside>
  </div>
);

Object.assign(window, { TopBar, Sidebar, AppHeader, TaskCard, TaskGrid, TaskDetail, HeartMark });
