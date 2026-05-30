// Corgi Mate — Household Planner UI Kit · Components

const HeartMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 18 C26 10 14 12 14 24 C14 34 24 42 32 52 C40 42 50 34 50 24 C50 12 38 10 32 18 Z"
          fill="#E8568A" stroke="#C94572" strokeWidth="2.4" strokeLinejoin="round"/>
  </svg>
);

const PlannerNav = ({ active = "Overview" }) => (
  <nav style={{
    position: "sticky", top: 0, zIndex: 10, background: "rgba(91,143,185,0.92)", backdropFilter: "blur(12px)",
    color: "var(--fg-on-brand)", padding: "14px 36px", display: "flex", alignItems: "center", gap: 32,
    borderBottom: "1.5px solid rgba(42,46,51,0.08)",
  }}>
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--fg-on-brand)" }}>
      <HeartMark size={28}/>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>Corgi Mate</span>
    </a>
    <div style={{ display: "flex", gap: 4, marginLeft: 24 }}>
      {["Overview", "Calendar", "Chores", "Meals"].map((t) => (
        <a key={t} href="#" style={{
          padding: "8px 14px", borderRadius: "var(--r-md)", textDecoration: "none",
          fontFamily: "var(--font-body)", fontWeight: active === t ? 700 : 600, fontSize: 14,
          color: "var(--fg-on-brand)",
          background: active === t ? "rgba(42,46,51,0.18)" : "transparent",
        }}>{t}</a>
      ))}
    </div>
    <div style={{ marginLeft: "auto" }}>
      <a href="#" style={{
        padding: "9px 16px", borderRadius: "var(--r-lg)", textDecoration: "none",
        fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13,
        color: "var(--fg-on-warm-accent)", background: "var(--heart-tan)", whiteSpace: "nowrap",
      }}>Open family app</a>
    </div>
  </nav>
);

const PlannerHero = () => (
  <section style={{
    background: "var(--sage-green)", color: "var(--fg-on-warm-accent)",
    padding: "64px 36px 88px", position: "relative", overflow: "hidden",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "center" }}>
      <div>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
          background: "rgba(42,46,51,0.12)", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 999,
        }}>Household planner</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.03em", margin: "16px 0 12px" }}>
          Your household, <span style={{ color: "var(--coat-teal-deep)" }}>organized</span>.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55, maxWidth: 520, opacity: 0.92 }}>
          Shared calendars, chore rotations, and meal plans — kept calm and readable. Corgi Mate handles the logistics so you can focus on home.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="../../assets/corgi-mate/corgi-mate-pose-4-calendar.png" alt="Corgi Mate"
             style={{ width: 320, height: 320, objectFit: "contain", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.2))" }}/>
      </div>
    </div>
  </section>
);

const EventRow = ({ e }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
    background: "var(--bg-elevated)", border: "1.5px solid var(--border-soft)", borderRadius: "var(--r-lg)",
  }}>
    <div style={{ width: 48, height: 48, borderRadius: "var(--r-md)", background: "var(--soft-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <HeartMark size={22}/>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{e.title}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)", marginTop: 4 }}>{e.time} · {e.where}</div>
    </div>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--beanie-pink)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{e.tag}</span>
  </div>
);

const ChoreCard = ({ c }) => (
  <div style={{
    padding: 20, background: "var(--bg-elevated)", border: "1.5px solid var(--border-soft)",
    borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-1)",
  }}>
    <div style={{ width: 40, height: 40, borderRadius: "var(--r-sm)", background: c.bg, marginBottom: 12 }}/>
    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{c.name}</div>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-2)", marginTop: 6 }}>{c.who} · {c.when}</div>
  </div>
);

const MealCard = ({ m }) => (
  <div style={{
    padding: 18, background: "var(--bg-elevated)", border: "1.5px solid var(--border-soft)",
    borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-1)",
  }}>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m.day}</div>
    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginTop: 8 }}>{m.meal}</div>
    <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)", marginTop: 4 }}>{m.prep} prep</div>
    <div style={{ width: "100%", height: 6, borderRadius: 999, background: m.bg, marginTop: 14, opacity: 0.7 }}/>
  </div>
);

const MemberGrid = ({ members }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
    {members.map((m) => (
      <div key={m.handle} style={{
        background: "var(--bg-elevated)", border: "1.5px solid var(--border-soft)", borderRadius: "var(--r-lg)",
        padding: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, boxShadow: "var(--shadow-1)",
      }}>
        {m.avatar ? (
          <img src={m.avatar} alt={m.name} style={{ width: 64, height: 64, borderRadius: 999, objectFit: "cover" }}/>
        ) : (
          <div style={{ width: 64, height: 64, borderRadius: 999, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "white" }}>{m.glyph}</div>
        )}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>{m.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>@{m.handle}</div>
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "var(--fg-2)", background: "var(--bg-sunken)", padding: "3px 10px", borderRadius: 999 }}>{m.role}</span>
      </div>
    ))}
  </div>
);

const Section = ({ id, title, kicker, children }) => (
  <section id={id} style={{ padding: "64px 36px", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
    {kicker && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "var(--beanie-pink)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 8 }}>{kicker}</div>}
    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", margin: "0 0 28px" }}>{title}</h2>
    {children}
  </section>
);

const Footer = () => (
  <footer style={{ padding: "48px 36px", background: "#2A2E33", color: "#F6F2EA" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <HeartMark size={28}/>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Corgi Mate</span>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.65 }}>© 2026 — calm days at home.</div>
    </div>
  </footer>
);

Object.assign(window, { HeartMark, PlannerNav, PlannerHero, EventRow, ChoreCard, MealCard, MemberGrid, Section, Footer });
