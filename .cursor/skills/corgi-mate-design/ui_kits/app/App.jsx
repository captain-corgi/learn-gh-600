// Corgi Mate — Family App UI Kit · App
// Demo: today view → task detail → back.

const { useState } = React;

const TASKS = [
  { id: "t1", title: "Pack school lunch boxes",       category: "Kitchen",  thumb: "Lunch prep",  due: "7:30 AM", status: "done",   bg: "linear-gradient(135deg,#5B8FB9 0%,#4A8B8B 100%)" },
  { id: "t2", title: "Grocery run — milk and fruit",  category: "Errands",  thumb: "Groceries",   due: "10:00 AM", status: "active", bg: "linear-gradient(135deg,#F2A8BC 0%,#E8568A 100%)" },
  { id: "t3", title: "Homework help — math worksheet", category: "School",  thumb: "Homework",    due: "4:00 PM", status: "pending", bg: "linear-gradient(135deg,#7A9E76 0%,#9CB898 100%)" },
  { id: "t4", title: "Fold fresh towels",               category: "Chores",   thumb: "Laundry",     due: "5:30 PM", status: "pending", bg: "linear-gradient(135deg,#4578A3 0%,#5B8FB9 100%)" },
  { id: "t5", title: "Set the dinner table",            category: "Kitchen",  thumb: "Dinner",      due: "6:15 PM", status: "pending", bg: "linear-gradient(135deg,#356868 0%,#4A8B8B 100%)" },
  { id: "t6", title: "Evening storytime",               category: "Family",   thumb: "Storytime",   due: "7:30 PM", status: "pending", bg: "linear-gradient(135deg,#C97A1F 0%,#E8952E 100%)" },
];

const QUICK = [
  { label: "Groceries", icon: "🛒" },
  { label: "Laundry", icon: "🧺" },
  { label: "Calendar", icon: "📅" },
  { label: "Meal plan", icon: "🍽" },
];

function App() {
  const [route, setRoute] = useState({ name: "home" });
  const [tab, setTab] = useState("Today");

  const open = (task) => setRoute({ name: "task", task });
  const back = () => setRoute({ name: "home" });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} data-screen-label="Family App">
      <TopBar/>
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar active="home"/>
        <main style={{ flex: 1, padding: "0 32px 64px", maxWidth: 1240, margin: "0 auto", width: "100%" }}>
          {route.name === "home" && (
            <>
              <AppHeader tab={tab} onTab={setTab} quick={QUICK}/>
              {tab === "Today" && (
                <>
                  <TaskGrid heading="Done this morning" tasks={TASKS.filter((t) => t.status === "done")} onOpen={open}/>
                  <TaskGrid heading="Up next" tasks={TASKS.filter((t) => t.status !== "done")} onOpen={open}/>
                </>
              )}
              {tab === "Tasks" && <TaskGrid heading="All tasks — today" tasks={TASKS} onOpen={open}/>}
              {tab === "Calendar" && <Placeholder text="Shared family calendar lands here. Week view, pickup times, and appointments."/>}
              {tab === "Family" && <AboutPanel/>}
            </>
          )}
          {route.name === "task" && (
            <TaskDetail task={route.task} onBack={back} related={TASKS.filter((t) => t.id !== route.task.id).slice(0, 4)}/>
          )}
        </main>
      </div>
    </div>
  );
}

const Placeholder = ({ text }) => (
  <div style={{
    margin: "32px 0", padding: 48, borderRadius: "var(--r-xl)",
    background: "var(--warm-cream-2)", border: "1.5px dashed var(--border-strong)",
    textAlign: "center", fontFamily: "var(--font-body)", color: "var(--ink-3)", fontSize: 15,
  }}>{text}</div>
);

const AboutPanel = () => (
  <div style={{ maxWidth: 720, padding: "32px 0", display: "flex", flexDirection: "column", gap: 20 }}>
    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, margin: 0, letterSpacing: "-0.01em" }}>About your household</h3>
    <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
      Corgi Mate keeps chores, calendars, and meal plans in one calm place. Let's get the week sorted — without the nagging.
    </p>
    <div style={{ display: "flex", gap: 24, paddingTop: 8, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-2)" }}>
      <div><div style={{ color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Members</div>4</div>
      <div><div style={{ color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Tasks today</div>6</div>
      <div><div style={{ color: "var(--ink-3)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Streak</div>12 days</div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
