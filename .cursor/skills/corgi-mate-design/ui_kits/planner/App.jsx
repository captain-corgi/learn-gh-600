// Corgi Mate — Household Planner UI Kit · App
const MEALS = [
  { day: "Mon", meal: "Pasta bake", prep: "20 min", bg: "var(--coat-teal)" },
  { day: "Tue", meal: "Tacos", prep: "25 min", bg: "var(--mate-orange)" },
  { day: "Wed", meal: "Soup + bread", prep: "15 min", bg: "var(--sage-green)" },
  { day: "Thu", meal: "Stir fry", prep: "30 min", bg: "var(--soft-blue)" },
  { day: "Fri", meal: "Pizza night", prep: "10 min", bg: "var(--beanie-pink)" },
  { day: "Sat", meal: "Brunch", prep: "35 min", bg: "var(--heart-tan)" },
];

const CHORES = [
  { name: "Dishes", who: "Alex", when: "Daily", bg: "var(--coat-teal)" },
  { name: "Laundry", who: "Sam", when: "Wed + Sat", bg: "var(--sage-green)" },
  { name: "Bins out", who: "Jordan", when: "Thu eve", bg: "var(--soft-blue)" },
  { name: "Vacuum", who: "Alex", when: "Sun", bg: "var(--blush-pink)" },
];

const EVENTS = [
  { title: "School pickup", time: "3:15 PM", where: "Main gate", tag: "Today" },
  { title: "Dentist — Mia", time: "Tue 10:30", where: "Oak St clinic", tag: "This week" },
  { title: "Grandma visit", time: "Sat 2:00 PM", where: "Home", tag: "Weekend" },
];

const MEMBERS = [
  { name: "Alex", role: "Parent", handle: "alex", bg: "var(--mate-orange)", glyph: "A" },
  { name: "Sam", role: "Parent", handle: "sam", bg: "var(--coat-teal-deep)", glyph: "S" },
  { name: "Mia", role: "Kid", handle: "mia", bg: "var(--sage-green)", glyph: "M" },
  { name: "Jordan", role: "Kid", handle: "jordan", bg: "var(--beanie-pink)", glyph: "J" },
  { name: "Corgi Mate", role: "Assistant", handle: "corgi-mate", bg: "var(--soft-blue)", glyph: "♥", avatar: "../../assets/corgi-mate-avatar.png" },
];

function App() {
  return (
    <div data-screen-label="Planner">
      <PlannerNav active="Overview"/>
      <PlannerHero/>
      <Section id="calendar" kicker="This week" title="Upcoming events">
        <div style={{ display: "grid", gap: 12 }}>
          {EVENTS.map((e) => <EventRow key={e.title} e={e}/>)}
        </div>
      </Section>
      <Section id="chores" kicker="Chore rotation" title="Who's on what">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {CHORES.map((c) => <ChoreCard key={c.name} c={c}/>)}
        </div>
      </Section>
      <Section id="meals" kicker="Meal plan" title="Dinner this week">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MEALS.map((m) => <MealCard key={m.day} m={m}/>)}
        </div>
      </Section>
      <Section id="family" kicker="Your household" title="Family members">
        <MemberGrid members={MEMBERS}/>
      </Section>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
