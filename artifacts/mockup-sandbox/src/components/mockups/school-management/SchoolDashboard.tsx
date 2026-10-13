import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  DoorOpen,
  Download,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";

type ModuleKey = "overview" | "teachers" | "students" | "classes" | "timetable" | "fees";
type Teacher = { name: string; subject: string; email: string; phone: string; initials: string; color: string };
type Student = { name: string; grade: string; guardian: string; email: string; initials: string; color: string };
type Room = { className: string; teacher: string; room: string; students: number; capacity: number; level: string; tint: string };
type Fee = { name: string; grade: string; guardian: string; due: number; paid: number; dueDate: string; initials: string; color: string };

const navigation: { id: ModuleKey; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "teachers", label: "Teachers", icon: Users },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "classes", label: "Classes & rooms", icon: DoorOpen },
  { id: "timetable", label: "Timetable", icon: CalendarDays },
  { id: "fees", label: "Student fees", icon: Wallet },
];

const initialTeachers: Teacher[] = [
  { name: "Amara Okafor", subject: "English & Literature", email: "amara.okafor@cedargrove.edu", phone: "+1 (555) 014-2204", initials: "AO", color: "bg-[#dceae5] text-[#37685a]" },
  { name: "Daniel Brooks", subject: "Mathematics", email: "daniel.brooks@cedargrove.edu", phone: "+1 (555) 014-1198", initials: "DB", color: "bg-[#f4e7d5] text-[#9b6d31]" },
  { name: "Priya Nair", subject: "Science", email: "priya.nair@cedargrove.edu", phone: "+1 (555) 014-8730", initials: "PN", color: "bg-[#e8e2f0] text-[#705d8a]" },
  { name: "Mason Lee", subject: "History & Social Studies", email: "mason.lee@cedargrove.edu", phone: "+1 (555) 014-3381", initials: "ML", color: "bg-[#f1dfdc] text-[#a45c50]" },
  { name: "Sofia Martinez", subject: "Art & Creative Practice", email: "sofia.martinez@cedargrove.edu", phone: "+1 (555) 014-6205", initials: "SM", color: "bg-[#dce8f0] text-[#4c7187]" },
  { name: "Elliot Chen", subject: "Physical Education", email: "elliot.chen@cedargrove.edu", phone: "+1 (555) 014-4412", initials: "EC", color: "bg-[#e8e8d5] text-[#737643]" },
];

const initialStudents: Student[] = [
  { name: "Olivia Bennett", grade: "Grade 4 · Maple", guardian: "Clara Bennett", email: "clara.bennett@email.com", initials: "OB", color: "bg-[#f4e7d5] text-[#9b6d31]" },
  { name: "Noah Williams", grade: "Grade 5 · Willow", guardian: "Marcus Williams", email: "marcus.w@email.com", initials: "NW", color: "bg-[#dceae5] text-[#37685a]" },
  { name: "Isabella Johnson", grade: "Grade 3 · Acorn", guardian: "Tasha Johnson", email: "tasha.j@email.com", initials: "IJ", color: "bg-[#e8e2f0] text-[#705d8a]" },
  { name: "Liam Patel", grade: "Grade 6 · Cedar", guardian: "Ravi Patel", email: "ravi.patel@email.com", initials: "LP", color: "bg-[#f1dfdc] text-[#a45c50]" },
  { name: "Ava Thompson", grade: "Grade 2 · Fern", guardian: "Jessica Thompson", email: "jess.t@email.com", initials: "AT", color: "bg-[#dce8f0] text-[#4c7187]" },
  { name: "Ethan Rivera", grade: "Grade 4 · Maple", guardian: "Elena Rivera", email: "elena.r@email.com", initials: "ER", color: "bg-[#e8e8d5] text-[#737643]" },
];

const initialRooms: Room[] = [
  { className: "Grade 6 · Cedar", teacher: "Amara Okafor", room: "Room 204", students: 24, capacity: 28, level: "Upper primary", tint: "bg-[#e4eee9]" },
  { className: "Grade 5 · Willow", teacher: "Daniel Brooks", room: "Room 202", students: 26, capacity: 28, level: "Upper primary", tint: "bg-[#f5ebdd]" },
  { className: "Grade 4 · Maple", teacher: "Priya Nair", room: "Room 108", students: 21, capacity: 26, level: "Middle primary", tint: "bg-[#e9e5ef]" },
  { className: "Grade 3 · Acorn", teacher: "Mason Lee", room: "Room 106", students: 23, capacity: 26, level: "Middle primary", tint: "bg-[#f2e3e0]" },
  { className: "Grade 2 · Fern", teacher: "Sofia Martinez", room: "Room 104", students: 19, capacity: 24, level: "Lower primary", tint: "bg-[#e1ebf0]" },
  { className: "Grade 1 · Birch", teacher: "Elliot Chen", room: "Room 102", students: 20, capacity: 24, level: "Lower primary", tint: "bg-[#ecebdc]" },
];

const initialFees: Fee[] = [
  { name: "Olivia Bennett", grade: "Grade 4 · Maple", guardian: "Clara Bennett", due: 680, paid: 680, dueDate: "Sep 05", initials: "OB", color: "bg-[#f4e7d5] text-[#9b6d31]" },
  { name: "Noah Williams", grade: "Grade 5 · Willow", guardian: "Marcus Williams", due: 680, paid: 420, dueDate: "Sep 05", initials: "NW", color: "bg-[#dceae5] text-[#37685a]" },
  { name: "Isabella Johnson", grade: "Grade 3 · Acorn", guardian: "Tasha Johnson", due: 680, paid: 0, dueDate: "Sep 05", initials: "IJ", color: "bg-[#e8e2f0] text-[#705d8a]" },
  { name: "Liam Patel", grade: "Grade 6 · Cedar", guardian: "Ravi Patel", due: 680, paid: 680, dueDate: "Sep 05", initials: "LP", color: "bg-[#f1dfdc] text-[#a45c50]" },
  { name: "Ava Thompson", grade: "Grade 2 · Fern", guardian: "Jessica Thompson", due: 680, paid: 300, dueDate: "Sep 05", initials: "AT", color: "bg-[#dce8f0] text-[#4c7187]" },
  { name: "Ethan Rivera", grade: "Grade 4 · Maple", guardian: "Elena Rivera", due: 680, paid: 680, dueDate: "Sep 05", initials: "ER", color: "bg-[#e8e8d5] text-[#737643]" },
];

const schedule: { time: string; days: string[]; teacher: string; room: string; tone: string }[] = [
  { time: "8:30 – 9:15", days: ["Reading circle", "Math workshop", "Science lab", "Reading circle", "History stories"], teacher: "Amara Okafor", room: "204", tone: "bg-[#e1eee7] text-[#456b5b]" },
  { time: "9:30 – 10:15", days: ["Math workshop", "Science lab", "Art studio", "Math workshop", "Science lab"], teacher: "Daniel Brooks", room: "202", tone: "bg-[#f5ead8] text-[#927044]" },
  { time: "10:30 – 11:15", days: ["Science lab", "Reading circle", "History stories", "Art studio", "Math workshop"], teacher: "Priya Nair", room: "108", tone: "bg-[#e9e4f0] text-[#706184]" },
  { time: "11:30 – 12:15", days: ["History stories", "Art studio", "Math workshop", "Science lab", "Reading circle"], teacher: "Mason Lee", room: "106", tone: "bg-[#f1e3df] text-[#9e6258]" },
];

const money = (amount: number) => `$${amount.toLocaleString("en-US")}`;
const initialsFrom = (name: string) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

export function SchoolDashboard() {
  const [active, setActive] = useState<ModuleKey>("overview");
  const [teachers, setTeachers] = useState(initialTeachers);
  const [students, setStudents] = useState(initialStudents);
  const [rooms, setRooms] = useState(initialRooms);
  const [fees, setFees] = useState(initialFees);
  const [query, setQuery] = useState("");
  const [feeFilter, setFeeFilter] = useState("All balances");
  const [modal, setModal] = useState<"teacher" | "student" | "class" | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");

  const moduleInfo: Record<ModuleKey, { title: string; subtitle: string }> = {
    overview: { title: "Good morning, Maya", subtitle: "Here’s the school day at a glance." },
    teachers: { title: "Our teachers", subtitle: "The people who make every school day count." },
    students: { title: "Our students", subtitle: "A little view into every growing mind." },
    classes: { title: "Classes & rooms", subtitle: "Keep every class in the right place, with room to grow." },
    timetable: { title: "The weekly rhythm", subtitle: "A clear view of what’s happening, and where." },
    fees: { title: "Fee follow-up", subtitle: "A thoughtful nudge goes a long way." },
  };

  const filteredTeachers = useMemo(() => teachers.filter((item) => `${item.name} ${item.subject}`.toLowerCase().includes(query.toLowerCase())), [teachers, query]);
  const filteredStudents = useMemo(() => students.filter((item) => `${item.name} ${item.grade} ${item.guardian}`.toLowerCase().includes(query.toLowerCase())), [students, query]);
  const filteredRooms = useMemo(() => rooms.filter((item) => `${item.className} ${item.teacher} ${item.room}`.toLowerCase().includes(query.toLowerCase())), [rooms, query]);
  const filteredFees = useMemo(() => fees.filter((item) => {
    const matchesQuery = `${item.name} ${item.grade} ${item.guardian}`.toLowerCase().includes(query.toLowerCase());
    const balance = item.due - item.paid;
    const matchesFilter = feeFilter === "All balances" || (feeFilter === "Outstanding" && balance > 0) || (feeFilter === "Paid in full" && balance === 0);
    return matchesQuery && matchesFilter;
  }), [fees, query, feeFilter]);

  function openModule(id: ModuleKey) {
    setActive(id);
    setQuery("");
    setMobileNav(false);
  }

  function submitNewRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    const color = ["bg-[#dceae5] text-[#37685a]", "bg-[#f4e7d5] text-[#9b6d31]", "bg-[#e8e2f0] text-[#705d8a]", "bg-[#dce8f0] text-[#4c7187]"][Math.floor(Math.random() * 4)];
    if (modal === "teacher") {
      const subject = String(form.get("subject") || "General Studies");
      const email = String(form.get("email") || "");
      const phone = String(form.get("phone") || "");
      setTeachers((current) => [{ name, subject, email, phone, initials: initialsFrom(name), color }, ...current]);
      setActive("teachers");
      setNotice(`${name} has been added to the teaching team.`);
    } else if (modal === "student") {
      const grade = String(form.get("grade") || "Grade 1 · Birch");
      const guardian = String(form.get("guardian") || "");
      const email = String(form.get("email") || "");
      setStudents((current) => [{ name, grade, guardian, email, initials: initialsFrom(name), color }, ...current]);
      setFees((current) => [{ name, grade, guardian, due: 680, paid: 0, dueDate: "Sep 05", initials: initialsFrom(name), color }, ...current]);
      setActive("students");
      setNotice(`${name} is enrolled. A fee record is ready for follow-up.`);
    } else {
      const grade = String(form.get("grade") || "Grade 1");
      const className = `${grade} · ${name}`;
      const teacher = String(form.get("teacher") || "Unassigned");
      const room = String(form.get("room") || "Room 110");
      setRooms((current) => [{ className, teacher, room, students: 0, capacity: Number(form.get("capacity")) || 24, level: "New class", tint: "bg-[#e1eee7]" }, ...current]);
      setActive("classes");
      setNotice(`${className} has been added to the room plan.`);
    }
    setModal(null);
    window.setTimeout(() => setNotice(""), 3600);
  }

  function markPaid(studentName: string) {
    setFees((current) => current.map((item) => item.name === studentName ? { ...item, paid: item.due } : item));
    setNotice(`Payment recorded for ${studentName}.`);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function startAdd() {
    if (active === "teachers") setModal("teacher");
    else if (active === "students") setModal("student");
    else if (active === "classes") setModal("class");
  }

  return (
    <div className="min-h-[100dvh] bg-[#f5f4ef] text-[#243d38]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="flex min-h-[100dvh]">
        <aside className={`${mobileNav ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"} w-[258px] shrink-0 flex-col border-r border-[#e5e3dc] bg-[#fbfaf6] px-5 py-6 md:sticky md:top-0 md:flex md:h-[100dvh]`}>
          <div className="mb-9 flex items-center justify-between px-1">
            <button onClick={() => openModule("overview")} className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#315b4e] text-[#f8f4e8] shadow-sm"><BookOpen size={20} strokeWidth={1.8} /></span>
              <span><span className="block font-serif text-[19px] leading-5 text-[#28463e]" style={{ fontFamily: "Georgia, serif" }}>Cedar Grove</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.16em] text-[#8a9288]">Community School</span></span>
            </button>
            <button className="rounded-lg p-2 text-[#72817a] md:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button>
          </div>
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#9ba39a]">School workspace</div>
          <nav className="space-y-1">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => openModule(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-[11px] text-left text-[13px] font-medium transition-all duration-200 ${active === id ? "bg-[#e9efeb] text-[#315b4e]" : "text-[#78847c] hover:bg-[#f1f2ed] hover:text-[#36584d]"}`}>
                <Icon size={17} strokeWidth={1.8} className={active === id ? "text-[#477565]" : "text-[#9aa39b] group-hover:text-[#648272]"} />
                <span className="flex-1">{label}</span>
                {id === "fees" && <span className="rounded-full bg-[#f5e5d4] px-2 py-0.5 text-[10px] font-bold text-[#9c6b39]">3</span>}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="mb-4 rounded-2xl bg-[#eff1e9] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#527463]"><Sparkles size={15} /><span className="text-[11px] font-semibold">A small reminder</span></div>
              <p className="text-[12px] leading-[1.6] text-[#718077]">“Children learn as they play. Most importantly, in play children learn how to learn.”</p>
              <p className="mt-2 text-[10px] font-semibold tracking-wide text-[#8b9a8e]">— O. Fred Donaldson</p>
            </div>
            <button className="flex w-full items-center gap-3 rounded-xl border border-[#e9e7e0] bg-[#fffefa] p-3 text-left transition hover:bg-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1dfdc] text-[11px] font-bold text-[#9c6256]">MR</span>
              <span className="min-w-0 flex-1"><span className="block text-[12px] font-semibold text-[#43584e]">Maya Reynolds</span><span className="block text-[10px] text-[#99a098]">School administrator</span></span>
              <MoreHorizontal size={17} className="text-[#9da59d]" />
            </button>
          </div>
        </aside>
        {mobileNav && <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-[#183329]/20 md:hidden" />}
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[#e8e6df] bg-[#f8f7f2]/95 backdrop-blur-md">
            <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-11">
              <div className="flex min-w-0 items-center gap-3">
                <button className="rounded-lg p-2 text-[#62766b] hover:bg-[#edeee7] md:hidden" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button>
                <div className="hidden items-center gap-2 text-[11px] text-[#9aa198] sm:flex"><span>Cedar Grove</span><span className="text-[#c8c9c1]">/</span><span className="font-semibold text-[#577165]">{navigation.find((item) => item.id === active)?.label}</span></div>
                <div className="sm:hidden text-[12px] font-semibold text-[#557064]">{navigation.find((item) => item.id === active)?.label}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-lg border border-[#e5e4dc] bg-[#fffefa] px-3 py-2 text-[11px] font-medium text-[#718078] sm:flex"><CalendarDays size={14} className="text-[#8ba091]" /> 2024–25 school year <ChevronDown size={13} /></div>
                <div className="hidden h-7 w-px bg-[#e4e3dc] sm:block" />
                <span className="hidden text-right sm:block"><span className="block text-[11px] font-semibold text-[#4c6258]">{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date())}</span><span className="text-[10px] text-[#9ba39b]">School year in session</span></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7eee7] text-[11px] font-bold text-[#4e7160]">MR</span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-7 sm:px-8 lg:px-11 lg:pt-9">
            <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="animate-[rise_.45s_ease-out_both]">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#a4a395]">{active === "overview" ? "Tuesday, September 17, 2024" : "CEDAR GROVE · 2024–25"}</p>
                <h1 className="font-serif text-[30px] font-normal leading-tight tracking-[-.03em] text-[#2d4b40] sm:text-[36px]" style={{ fontFamily: "Georgia, serif" }}>{moduleInfo[active].title}</h1>
                <p className="mt-2 text-[13px] text-[#89948c]">{moduleInfo[active].subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {(active === "teachers" || active === "students" || active === "classes") && (
                  <button onClick={startAdd} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#315b4e] px-4 text-[12px] font-semibold text-[#fbfaf4] shadow-[0_3px_10px_rgba(49,91,78,.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#264e42]"><Plus size={16} />{active === "teachers" ? "Enroll teacher" : active === "students" ? "Enroll student" : "Add a class"}</button>
                )}
                {active === "overview" && <button onClick={() => openModule("timetable")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e3e5dc] bg-[#fffefa] px-4 text-[12px] font-semibold text-[#597166] transition hover:border-[#cbd8ce] hover:bg-white">Today’s timetable <ArrowRight size={15} /></button>}
                {active === "timetable" && <button onClick={() => setNotice("This weekly view is ready to print from your browser.")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e3e5dc] bg-[#fffefa] px-4 text-[12px] font-semibold text-[#597166] transition hover:bg-white"><Download size={15} /> Print view</button>}
                {active === "fees" && <button onClick={() => setNotice("Fee summary prepared for this school year.")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e3e5dc] bg-[#fffefa] px-4 text-[12px] font-semibold text-[#597166] transition hover:bg-white"><Download size={15} /> Export summary</button>}
              </div>
            </div>

            {active === "overview" && <Overview teachers={teachers.length} students={students.length} rooms={rooms} fees={fees} onNavigate={openModule} onMarkPaid={markPaid} />}
            {active === "teachers" && <PeopleTable kind="teacher" rows={filteredTeachers} query={query} setQuery={setQuery} onAdd={startAdd} />}
            {active === "students" && <PeopleTable kind="student" rows={filteredStudents} query={query} setQuery={setQuery} onAdd={startAdd} />}
            {active === "classes" && <RoomsView rooms={filteredRooms} query={query} setQuery={setQuery} onAdd={startAdd} />}
            {active === "timetable" && <Timetable selectedDay={selectedDay} setSelectedDay={setSelectedDay} />}
            {active === "fees" && <FeesView fees={filteredFees} query={query} setQuery={setQuery} feeFilter={feeFilter} setFeeFilter={setFeeFilter} onMarkPaid={markPaid} />}
            <footer className="mt-10 flex flex-col gap-1 border-t border-[#e7e6df] pt-4 text-[10px] text-[#a0a69e] sm:flex-row sm:items-center sm:justify-between"><span>Cedar Grove Community School · A good day starts together.</span><span>Prototype workspace · Changes are for this session only</span></footer>
          </div>
        </main>
      </div>

      {notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-40px)] animate-[rise_.25s_ease-out_both] items-center gap-2 rounded-xl bg-[#315b4e] px-4 py-3 text-[12px] font-medium text-white shadow-xl"><CheckCircle2 size={16} />{notice}<button className="ml-2 opacity-70 hover:opacity-100" onClick={() => setNotice("")} aria-label="Dismiss"><X size={14} /></button></div>}
      {modal && <EnrollmentModal kind={modal} teachers={teachers} onClose={() => setModal(null)} onSubmit={submitNewRecord} />}
      <style>{`@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function Overview({ teachers, students, rooms, fees, onNavigate, onMarkPaid }: { teachers: number; students: number; rooms: Room[]; fees: Fee[]; onNavigate: (key: ModuleKey) => void; onMarkPaid: (name: string) => void }) {
  const balance = fees.reduce((sum, item) => sum + item.due - item.paid, 0);
  const paidPercent = Math.round(fees.reduce((sum, item) => sum + item.paid, 0) / fees.reduce((sum, item) => sum + item.due, 0) * 100);
  const todayLessons = schedule.slice(0, 3);
  return <div className="space-y-6 animate-[rise_.45s_ease-out_both]">
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <Metric icon={GraduationCap} label="Students enrolled" value={String(students)} note="+ 8 since August" accent="sage" trend="up" />
      <Metric icon={Users} label="Teaching team" value={String(teachers)} note="Across 6 subjects" accent="sand" trend="flat" />
      <Metric icon={DoorOpen} label="Classrooms in use" value={String(rooms.length)} note="Room to grow in 3" accent="blue" trend="flat" />
      <Metric icon={CircleDollarSign} label="Fees to follow up" value={money(balance)} note={`${fees.filter((fee) => fee.paid < fee.due).length} families to check in`} accent="rose" trend="down" />
    </section>
    <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#fffefa]">
        <div className="flex items-center justify-between border-b border-[#efeee8] px-5 py-4 sm:px-6">
          <div><h2 className="font-serif text-[19px] text-[#345448]" style={{ fontFamily: "Georgia, serif" }}>Today at Cedar Grove</h2><p className="mt-1 text-[11px] text-[#9aa198]">Tuesday · September 17</p></div>
          <button onClick={() => onNavigate("timetable")} className="flex items-center gap-1 text-[11px] font-semibold text-[#668273] hover:text-[#315b4e]">Full week <ArrowRight size={14} /></button>
        </div>
        <div className="divide-y divide-[#f0efe9]">
          {todayLessons.map((lesson, index) => <div key={lesson.time} className="flex items-center gap-3 px-5 py-3.5 sm:px-6">
            <div className="w-[72px] shrink-0 text-[10px] font-semibold text-[#8c9990]">{lesson.time.split(" – ")[0]}</div>
            <div className={`flex h-9 w-1 shrink-0 rounded-full ${index === 0 ? "bg-[#86a492]" : index === 1 ? "bg-[#d8b98a]" : "bg-[#ab9bbd]"}`} />
            <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-semibold text-[#52665b]">{lesson.days[1]}</div><div className="mt-1 text-[10px] text-[#a0a89f]">{lesson.teacher} <span className="mx-1 text-[#d2d2ca]">·</span> Room {lesson.room}</div></div>
            <span className={`hidden rounded-full px-2.5 py-1 text-[9px] font-semibold sm:inline-flex ${index === 0 ? "bg-[#edf3ee] text-[#65806e]" : index === 1 ? "bg-[#f6f0e7] text-[#a08255]" : "bg-[#f0edf3] text-[#837394]"}`}>{index === 0 ? "In progress" : index === 1 ? "Up next" : "Coming up"}</span>
          </div>)}
        </div>
        <div className="border-t border-[#efeee8] bg-[#fbfaf6] px-5 py-3 text-[10px] text-[#9aa198] sm:px-6">A steady morning, with plenty of room to learn.</div>
      </div>
      <div className="rounded-2xl border border-[#e8e6df] bg-[#fffefa] p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between"><div><h2 className="font-serif text-[19px] text-[#345448]" style={{ fontFamily: "Georgia, serif" }}>Tuition, at a glance</h2><p className="mt-1 text-[11px] text-[#9aa198]">September installment</p></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6eee2] text-[#a47c49]"><Wallet size={17} /></span></div>
        <div className="flex items-end justify-between"><div><div className="font-serif text-[30px] text-[#345448]" style={{ fontFamily: "Georgia, serif" }}>{paidPercent}%</div><div className="mt-1 text-[10px] text-[#9ba49b]">collected so far</div></div><div className="text-right"><div className="text-[13px] font-semibold text-[#657a6d]">{money(fees.reduce((sum, item) => sum + item.paid, 0))}</div><div className="mt-1 text-[10px] text-[#9ba49b]">of {money(fees.reduce((sum, item) => sum + item.due, 0))}</div></div></div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f0efe9]"><div className="h-full rounded-full bg-[#83a48e] transition-all duration-500" style={{ width: `${paidPercent}%` }} /></div>
        <div className="mt-5 space-y-2.5">
          {fees.filter((item) => item.paid < item.due).slice(0, 2).map((item) => <div className="flex items-center gap-2.5" key={item.name}><Avatar initials={item.initials} color={item.color} small /><span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#617167]">{item.name}</span><span className="text-[11px] font-semibold text-[#a06c3c]">{money(item.due - item.paid)}</span><button onClick={() => onMarkPaid(item.name)} className="rounded-md p-1 text-[#91a198] transition hover:bg-[#edf3ee] hover:text-[#46725d]" title="Record full payment"><Check size={14} /></button></div>)}
        </div>
        <button onClick={() => onNavigate("fees")} className="mt-5 flex w-full items-center justify-center gap-1 border-t border-[#efeee8] pt-4 text-[11px] font-semibold text-[#698372] hover:text-[#315b4e]">Open fee follow-up <ArrowRight size={14} /></button>
      </div>
    </section>
    <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-[#e8e6df] bg-[#fffefa] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between"><div><h2 className="font-serif text-[19px] text-[#345448]" style={{ fontFamily: "Georgia, serif" }}>Room to grow</h2><p className="mt-1 text-[11px] text-[#9aa198]">Enrolment across this year’s classrooms</p></div><button onClick={() => onNavigate("classes")} className="text-[11px] font-semibold text-[#718a79] hover:text-[#315b4e]">All classes <ArrowRight className="ml-1 inline" size={13} /></button></div>
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">{rooms.slice(0, 4).map((room) => <div key={room.className}><div className="mb-1.5 flex items-center justify-between gap-2"><span className="truncate text-[11px] font-semibold text-[#617369]">{room.className}</span><span className="shrink-0 text-[10px] text-[#9aa198]">{room.students}/{room.capacity}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#f0efe9]"><div className="h-full rounded-full bg-[#92ac99]" style={{ width: `${room.students / room.capacity * 100}%` }} /></div></div>)}</div>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-[#e7eee7] p-5 sm:p-6">
        <div><div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#f5f7f1] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-[#73907c]"><Sparkles size={12} /> This week</div><h2 className="max-w-[300px] font-serif text-[21px] leading-[1.25] text-[#31584b]" style={{ fontFamily: "Georgia, serif" }}>Little moments make a school feel like home.</h2><p className="mt-2 max-w-[310px] text-[11px] leading-5 text-[#718579]">Keep the moving pieces in view, so the people in your care can focus on what matters.</p></div>
        <div className="mt-5 flex items-center justify-between border-t border-[#d6e1d7] pt-4"><span className="text-[10px] text-[#809488]">Make space for good things.</span><button onClick={() => onNavigate("students")} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4d7360] hover:text-[#315b4e]">Meet your students <ArrowRight size={14} /></button></div>
      </div>
    </section>
  </div>;
}

function Metric({ icon: Icon, label, value, note, accent, trend }: { icon: typeof Users; label: string; value: string; note: string; accent: string; trend: "up" | "down" | "flat" }) {
  const accents: Record<string, string> = { sage: "bg-[#e6eee7] text-[#5d826b]", sand: "bg-[#f4eadc] text-[#a57d4c]", blue: "bg-[#e5edf0] text-[#608091]", rose: "bg-[#f4e7e1] text-[#a66e5d]" };
  return <div className="rounded-2xl border border-[#e8e6df] bg-[#fffefa] p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accents[accent]}`}><Icon size={17} strokeWidth={1.8} /></span><span className="flex items-center gap-1 text-[9px] font-semibold text-[#91a096]">{trend === "up" ? <ArrowUpRight size={13} /> : trend === "down" ? <ArrowDownRight size={13} /> : <span className="h-px w-3 bg-[#abb2a9]" />} {trend === "up" ? "This term" : trend === "down" ? "Pending" : "On track"}</span></div><div className="font-serif text-[26px] leading-none text-[#355448]" style={{ fontFamily: "Georgia, serif" }}>{value}</div><div className="mt-2 text-[11px] font-semibold text-[#68796f]">{label}</div><div className="mt-1 text-[10px] text-[#a0a79f]">{note}</div></div>;
}

function Avatar({ initials, color, small = false }: { initials: string; color: string; small?: boolean }) {
  return <span className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${small ? "h-7 w-7 text-[9px]" : "h-9 w-9 text-[10px]"} ${color}`}>{initials}</span>;
}

function SearchField({ query, setQuery, placeholder }: { query: string; setQuery: (query: string) => void; placeholder: string }) {
  return <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-[#e7e6df] bg-[#fffefa] px-3 text-[#99a198] sm:max-w-[240px]"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-[11px] text-[#50645a] outline-none placeholder:text-[#afb4ad]" /></label>;
}

function PeopleTable({ kind, rows, query, setQuery, onAdd }: { kind: "teacher" | "student"; rows: Teacher[] | Student[]; query: string; setQuery: (value: string) => void; onAdd: () => void }) {
  const isTeacher = kind === "teacher";
  return <div className="overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#fffefa] animate-[rise_.4s_ease-out_both]">
    <div className="flex flex-col gap-3 border-b border-[#efeee8] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><h2 className="font-serif text-[18px] text-[#38584b]" style={{ fontFamily: "Georgia, serif" }}>{isTeacher ? "Teaching team" : "Student directory"}</h2><p className="mt-1 text-[10px] text-[#9aa198]">{rows.length} {isTeacher ? "educators" : "students"} in this view</p></div><div className="flex items-center gap-2"><SearchField query={query} setQuery={setQuery} placeholder={isTeacher ? "Find a teacher..." : "Find a student..."} /><button onClick={onAdd} className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#315b4e] px-3 text-[11px] font-semibold text-white transition hover:bg-[#264e42]"><Plus size={14} /><span className="hidden sm:inline">{isTeacher ? "Enroll teacher" : "Enroll student"}</span></button></div></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead><tr className="bg-[#fbfaf6] text-[9px] font-bold uppercase tracking-[.13em] text-[#a0a69e]"><th className="px-5 py-3 font-semibold">{isTeacher ? "Teacher" : "Student"}</th><th className="px-4 py-3 font-semibold">{isTeacher ? "Subject area" : "Class / grade"}</th><th className="px-4 py-3 font-semibold">{isTeacher ? "Email address" : "Parent / guardian"}</th><th className="px-4 py-3 font-semibold">{isTeacher ? "Contact" : "Guardian contact"}</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-3 py-3" /></tr></thead><tbody className="divide-y divide-[#f0efe9]">
      {rows.map((row) => {
        const teacher = row as Teacher;
        const student = row as Student;
        return <tr key={row.name} className="transition hover:bg-[#fbfaf6]"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><Avatar initials={row.initials} color={row.color} /><span className="text-[11px] font-semibold text-[#52675b]">{row.name}</span></div></td><td className="px-4 py-3.5 text-[11px] text-[#78877d]">{isTeacher ? teacher.subject : student.grade}</td><td className="px-4 py-3.5 text-[11px] text-[#78877d]">{isTeacher ? teacher.email : student.guardian}</td><td className="px-4 py-3.5 text-[11px] text-[#89948c]">{isTeacher ? teacher.phone : student.email}</td><td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf3ee] px-2 py-1 text-[9px] font-semibold text-[#668271]"><span className="h-1.5 w-1.5 rounded-full bg-[#83a28d]" />Active</span></td><td className="px-3 py-3.5"><button title="More options" className="rounded-md p-1.5 text-[#a2aaa1] hover:bg-[#f0f1ea]"><MoreHorizontal size={16} /></button></td></tr>;
      })}
      {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-14 text-center"><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff2eb] text-[#83988a]"><Search size={18} /></div><p className="mt-3 text-[12px] font-semibold text-[#65776c]">No matches just yet</p><p className="mt-1 text-[11px] text-[#9da49c]">Try a different name or search term.</p></td></tr>}
    </tbody></table></div>
    <div className="flex items-center justify-between border-t border-[#efeee8] bg-[#fbfaf6] px-5 py-3 text-[10px] text-[#9ca39b]"><span>Changes are kept in this session</span><span>Showing {rows.length} records</span></div>
  </div>;
}

function RoomsView({ rooms, query, setQuery, onAdd }: { rooms: Room[]; query: string; setQuery: (value: string) => void; onAdd: () => void }) {
  return <div className="space-y-5 animate-[rise_.4s_ease-out_both]">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6eee7] text-[#658572]"><DoorOpen size={18} /></div><div><div className="text-[12px] font-semibold text-[#52675b]">Classroom map</div><div className="mt-1 text-[10px] text-[#9ba49b]">{rooms.length} classes · 6 rooms assigned</div></div></div><div className="flex items-center gap-2"><SearchField query={query} setQuery={setQuery} placeholder="Find a class or room..." /><button onClick={onAdd} className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[#315b4e] px-3 text-[11px] font-semibold text-white hover:bg-[#264e42]"><Plus size={14} /> Add a class</button></div></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{rooms.map((room, index) => <article key={room.className} className="group overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#fffefa] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(52,72,60,.07)]"><div className={`${room.tint} relative flex h-[104px] items-center justify-between overflow-hidden px-5`}><div className="absolute -right-4 -top-10 h-36 w-36 rounded-full border border-white/50" /><div className="absolute -right-1 -top-3 h-24 w-24 rounded-full border border-white/45" /><div className="relative"><span className="text-[9px] font-bold uppercase tracking-[.17em] text-[#809389]">{room.level}</span><h3 className="mt-1 font-serif text-[19px] text-[#36574a]" style={{ fontFamily: "Georgia, serif" }}>{room.className}</h3></div><span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-[#658572]"><DoorOpen size={19} strokeWidth={1.7} /></span></div><div className="p-5"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#a0a69e]">Room assignment</span><span className="rounded-md bg-[#f7f5ee] px-2 py-1 text-[10px] font-semibold text-[#728176]">{room.room}</span></div><div className="mt-3 flex items-center gap-2.5"><Avatar initials={initialsFrom(room.teacher)} color={index % 2 ? "bg-[#f4e7d5] text-[#9b6d31]" : "bg-[#dceae5] text-[#37685a]"} small /><span className="text-[11px] text-[#697a70]">{room.teacher}</span></div><div className="mt-5"><div className="mb-2 flex items-center justify-between"><span className="text-[10px] text-[#89968d]">Class capacity</span><span className="text-[10px] font-semibold text-[#64796d]">{room.students} <span className="font-normal text-[#a1a79f]">of {room.capacity}</span></span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#f0efe9]"><div className="h-full rounded-full bg-[#87a591] transition-all duration-500" style={{ width: `${Math.min(100, room.students / room.capacity * 100)}%` }} /></div></div></div></article>)}
      {rooms.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-[#dcded5] bg-[#faf9f4] px-5 py-14 text-center"><DoorOpen className="mx-auto text-[#98aa9c]" size={24} /><p className="mt-3 text-[12px] font-semibold text-[#65776c]">No classes found</p><p className="mt-1 text-[11px] text-[#9da49c]">Try a different search, or add a new class.</p></div>}</div>
    <div className="flex items-center gap-3 rounded-xl border border-[#e8e6df] bg-[#fffefa] px-4 py-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5eee2] text-[#a57e4c]"><SlidersHorizontal size={15} /></span><p className="text-[10px] leading-5 text-[#89968c]"><span className="font-semibold text-[#64776b]">Room planning note</span> · Rooms with fewer than 24 seats have a little extra space for flexible learning and small-group work.</p></div>
  </div>;
}

function Timetable({ selectedDay, setSelectedDay }: { selectedDay: string; setSelectedDay: (day: string) => void }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [weekOffset, setWeekOffset] = useState(0);
  const weekStart = new Date(2024, 8, 16 + weekOffset * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);
  const weekLabel = `${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(weekStart)} – ${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(weekEnd)}`;
  return <div className="space-y-5 animate-[rise_.4s_ease-out_both]">
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e8e6df] bg-[#fffefa] p-4 sm:flex-row sm:items-center sm:px-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7eee7] text-[#63816f]"><CalendarDays size={18} /></div><div><div className="text-[12px] font-semibold text-[#52675b]">Week {3 + weekOffset} · Autumn term</div><div className="mt-1 text-[10px] text-[#9ba49b]">{weekLabel}</div></div></div><div className="flex items-center gap-2"><button onClick={() => setWeekOffset((value) => value - 1)} aria-label="Previous week" className="rounded-lg border border-[#e8e6df] p-2 text-[#829188] hover:bg-[#f6f5ef]"><ChevronLeft size={15} /></button><button onClick={() => setWeekOffset(0)} className="rounded-lg border border-[#e8e6df] px-3 py-2 text-[10px] font-semibold text-[#708177] hover:bg-[#f6f5ef]">This week</button><button onClick={() => setWeekOffset((value) => value + 1)} aria-label="Next week" className="rounded-lg border border-[#e8e6df] p-2 text-[#829188] hover:bg-[#f6f5ef]"><ChevronRight size={15} /></button></div></div>
    <div className="overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#fffefa]">
      <div className="flex gap-1 overflow-x-auto border-b border-[#eeede7] px-3 pt-3 sm:hidden">{days.map((day) => <button key={day} onClick={() => setSelectedDay(day)} className={`shrink-0 rounded-t-lg px-3 py-2 text-[10px] font-semibold ${selectedDay === day ? "bg-[#e9efeb] text-[#416653]" : "text-[#969f97]"}`}>{day.slice(0, 3)}</button>)}</div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] table-fixed text-left"><thead><tr className="bg-[#fbfaf6]"><th className="w-[112px] border-r border-[#efeee8] px-4 py-3 text-[9px] font-bold uppercase tracking-[.12em] text-[#a0a69e]">Time</th>{days.map((day, index) => <th key={day} className={`px-3 py-3 text-[10px] font-semibold ${selectedDay === day ? "bg-[#f1f4ed] text-[#527361]" : "text-[#89968d]"} ${index < 4 ? "border-r border-[#efeee8]" : ""}`}>{day}<span className="ml-1.5 font-normal text-[#b0b5ac]">{weekStart.getDate() + index}</span></th>)}</tr></thead><tbody className="divide-y divide-[#efeee8]">{schedule.map((row) => <tr key={row.time}><td className="border-r border-[#efeee8] px-4 py-3 align-top"><div className="flex items-center gap-1.5 text-[9px] font-semibold text-[#75877b]"><Clock3 size={12} />{row.time}</div></td>{row.days.map((lesson, index) => <td key={`${row.time}-${index}`} className={`h-[84px] border-r border-[#efeee8] px-2 py-2 align-top last:border-0 ${selectedDay === days[index] ? "bg-[#fcfcf8]" : ""}`}><div className={`h-full rounded-lg px-2.5 py-2 ${row.tone}`}><div className="text-[10px] font-semibold leading-4">{lesson}</div><div className="mt-1 truncate text-[8px] opacity-75">{row.teacher}</div><div className="mt-0.5 text-[8px] opacity-65">Room {row.room}</div></div></td>)}</tr>)}
      <tr><td className="border-r border-[#efeee8] px-4 py-3 text-[9px] font-semibold text-[#9aa198]">12:15 – 1:00</td><td colSpan={5} className="bg-[#faf9f4] px-3 py-2 text-center"><span className="inline-flex items-center gap-2 rounded-full bg-[#f3efe4] px-3 py-1.5 text-[9px] font-semibold text-[#a08a60]"><span className="h-1.5 w-1.5 rounded-full bg-[#c7ad7c]" />Lunch & outdoor play</span></td></tr></tbody></table></div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#efeee8] bg-[#fbfaf6] px-4 py-3">{[{ label: "Language arts", color: "bg-[#86a492]" }, { label: "Math", color: "bg-[#d8b98a]" }, { label: "Science", color: "bg-[#ab9bbd]" }, { label: "Humanities", color: "bg-[#c58f82]" }].map((item) => <span key={item.label} className="flex items-center gap-1.5 text-[9px] text-[#8c9890]"><span className={`h-2 w-2 rounded-full ${item.color}`} />{item.label}</span>)}<span className="ml-auto text-[9px] text-[#a1a79f]">Room & teacher shown in each class</span></div>
    </div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-xl border border-[#e8e6df] bg-[#fffefa] p-4"><div className="text-[9px] font-bold uppercase tracking-[.12em] text-[#a0a69e]">Selected day</div><div className="mt-2 font-serif text-[18px] text-[#456353]" style={{ fontFamily: "Georgia, serif" }}>{selectedDay}</div><div className="mt-1 text-[10px] text-[#97a097]">{schedule.length} learning blocks</div></div><div className="rounded-xl border border-[#e8e6df] bg-[#fffefa] p-4"><div className="text-[9px] font-bold uppercase tracking-[.12em] text-[#a0a69e]">First bell</div><div className="mt-2 font-serif text-[18px] text-[#456353]" style={{ fontFamily: "Georgia, serif" }}>8:30 am</div><div className="mt-1 text-[10px] text-[#97a097]">Welcome circle in every class</div></div><div className="rounded-xl border border-[#e8e6df] bg-[#fffefa] p-4"><div className="text-[9px] font-bold uppercase tracking-[.12em] text-[#a0a69e]">A little breathing room</div><div className="mt-2 font-serif text-[18px] text-[#456353]" style={{ fontFamily: "Georgia, serif" }}>15 minutes</div><div className="mt-1 text-[10px] text-[#97a097]">Between each learning block</div></div></div>
  </div>;
}

function FeesView({ fees, query, setQuery, feeFilter, setFeeFilter, onMarkPaid }: { fees: Fee[]; query: string; setQuery: (value: string) => void; feeFilter: string; setFeeFilter: (value: string) => void; onMarkPaid: (name: string) => void }) {
  const totalDue = fees.reduce((sum, fee) => sum + fee.due, 0);
  const totalPaid = fees.reduce((sum, fee) => sum + fee.paid, 0);
  const remaining = totalDue - totalPaid;
  return <div className="space-y-5 animate-[rise_.4s_ease-out_both]">
    <div className="grid gap-3 sm:grid-cols-3"><FeeSummary label="Expected this month" value={money(totalDue)} caption="September installment" tint="sage" /><FeeSummary label="Received so far" value={money(totalPaid)} caption={`${totalDue ? Math.round(totalPaid / totalDue * 100) : 0}% of expected fees`} tint="blue" /><FeeSummary label="Still to follow up" value={money(remaining)} caption={`${fees.filter((fee) => fee.due > fee.paid).length} families · due Sep 05`} tint="sand" /></div>
    <div className="overflow-hidden rounded-2xl border border-[#e8e6df] bg-[#fffefa]">
      <div className="flex flex-col gap-3 border-b border-[#efeee8] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><h2 className="font-serif text-[18px] text-[#38584b]" style={{ fontFamily: "Georgia, serif" }}>September fee register</h2><p className="mt-1 text-[10px] text-[#9aa198]">Tuition installment · due September 5, 2024</p></div><div className="flex flex-wrap items-center gap-2"><SearchField query={query} setQuery={setQuery} placeholder="Find a family..." /><label className="relative"><select value={feeFilter} onChange={(event) => setFeeFilter(event.target.value)} className="h-9 appearance-none rounded-lg border border-[#e7e6df] bg-[#fffefa] pl-3 pr-8 text-[10px] font-medium text-[#718078] outline-none focus:border-[#9db2a2]"><option>All balances</option><option>Outstanding</option><option>Paid in full</option></select><ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-3 text-[#9aa198]" /></label></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="bg-[#fbfaf6] text-[9px] font-bold uppercase tracking-[.13em] text-[#a0a69e]"><th className="px-5 py-3 font-semibold">Student & class</th><th className="px-4 py-3 font-semibold">Family contact</th><th className="px-4 py-3 font-semibold">Amount due</th><th className="px-4 py-3 font-semibold">Paid</th><th className="px-4 py-3 font-semibold">Balance</th><th className="px-4 py-3 font-semibold">Follow-up</th><th className="px-4 py-3" /></tr></thead><tbody className="divide-y divide-[#f0efe9]">{fees.map((fee) => { const outstanding = fee.due - fee.paid; return <tr key={fee.name} className="transition hover:bg-[#fbfaf6]"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><Avatar initials={fee.initials} color={fee.color} /><span><span className="block text-[11px] font-semibold text-[#52675b]">{fee.name}</span><span className="mt-1 block text-[9px] text-[#a0a69e]">{fee.grade}</span></span></div></td><td className="px-4 py-3.5"><span className="block text-[10px] text-[#718078]">{fee.guardian}</span><span className="mt-1 block text-[9px] text-[#a0a69e]">Due {fee.dueDate}</span></td><td className="px-4 py-3.5 text-[11px] text-[#75847a]">{money(fee.due)}</td><td className="px-4 py-3.5 text-[11px] font-medium text-[#6b8372]">{money(fee.paid)}</td><td className={`px-4 py-3.5 text-[11px] font-semibold ${outstanding > 0 ? "text-[#a16f40]" : "text-[#6e8575]"}`}>{money(outstanding)}</td><td className="px-4 py-3.5">{outstanding === 0 ? <span className="inline-flex items-center gap-1 rounded-full bg-[#edf3ee] px-2 py-1 text-[9px] font-semibold text-[#668271]"><CheckCircle2 size={11} />All settled</span> : outstanding === fee.due ? <span className="inline-flex rounded-full bg-[#f7e9df] px-2 py-1 text-[9px] font-semibold text-[#a06b41]">Gentle reminder</span> : <span className="inline-flex rounded-full bg-[#f5f0e2] px-2 py-1 text-[9px] font-semibold text-[#9b8451]">Part payment</span>}</td><td className="px-4 py-3.5">{outstanding > 0 ? <button onClick={() => onMarkPaid(fee.name)} className="whitespace-nowrap rounded-lg border border-[#dfe8df] px-2.5 py-1.5 text-[9px] font-semibold text-[#65806e] transition hover:bg-[#edf3ee]">Record payment</button> : <span className="px-2.5 py-1.5 text-[9px] font-medium text-[#b0b6ad]">Complete</span>}</td></tr>; })}{fees.length === 0 && <tr><td colSpan={7} className="px-5 py-14 text-center"><Wallet className="mx-auto text-[#9bac9e]" size={24} /><p className="mt-3 text-[12px] font-semibold text-[#65776c]">No fee records to show</p><p className="mt-1 text-[11px] text-[#9da49c]">Adjust your search or balance filter.</p></td></tr>}</tbody></table></div>
      <div className="flex items-center justify-between border-t border-[#efeee8] bg-[#fbfaf6] px-5 py-3 text-[10px] text-[#9ca39b]"><span>Showing {fees.length} families</span><span>Session-only prototype data</span></div>
    </div>
    <div className="flex gap-3 rounded-xl border border-[#e9e6d9] bg-[#f8f5eb] px-4 py-3.5"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f1ead8] text-[#a28654]"><Sparkles size={14} /></span><p className="text-[10px] leading-[1.65] text-[#8c856e]"><span className="font-semibold text-[#72694e]">A gentle follow-up works best.</span> Check in with families privately, and let them know the office is here to help if payment timing needs a conversation.</p></div>
  </div>;
}

function FeeSummary({ label, value, caption, tint }: { label: string; value: string; caption: string; tint: "sage" | "blue" | "sand" }) {
  const colors = { sage: "bg-[#e8efe8] text-[#658271]", blue: "bg-[#e6edf0] text-[#678291]", sand: "bg-[#f5ecdd] text-[#a17c4b]" };
  return <div className="rounded-2xl border border-[#e8e6df] bg-[#fffefa] p-4 sm:p-5"><div className="flex items-start justify-between"><div className="text-[10px] font-semibold text-[#8c9990]">{label}</div><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors[tint]}`}><CircleDollarSign size={14} /></span></div><div className="mt-2 font-serif text-[24px] text-[#38584b]" style={{ fontFamily: "Georgia, serif" }}>{value}</div><div className="mt-1 text-[9px] text-[#a0a79f]">{caption}</div></div>;
}

function EnrollmentModal({ kind, teachers, onClose, onSubmit }: { kind: "teacher" | "student" | "class"; teachers: Teacher[]; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const isTeacher = kind === "teacher";
  const isStudent = kind === "student";
  const title = isTeacher ? "Welcome a teacher" : isStudent ? "Enroll a student" : "Add a class";
  const description = isTeacher ? "Add someone new to the Cedar Grove team." : isStudent ? "A new student is a new story beginning." : "Set up a class and its home base.";
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20382f]/35 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="enroll-title" className="w-full max-w-[440px] animate-[rise_.25s_ease-out_both] overflow-hidden rounded-[20px] border border-[#e7e5dc] bg-[#fffefa] shadow-[0_25px_80px_rgba(31,53,43,.2)]">
      <div className="flex items-start justify-between border-b border-[#efeee8] px-6 py-5"><div><div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6eee7] text-[#5f806c]">{isTeacher ? <Users size={17} /> : isStudent ? <GraduationCap size={17} /> : <DoorOpen size={17} />}</div><h2 id="enroll-title" className="font-serif text-[22px] text-[#355448]" style={{ fontFamily: "Georgia, serif" }}>{title}</h2><p className="mt-1 text-[11px] text-[#929c93]">{description}</p></div><button onClick={onClose} aria-label="Close form" className="rounded-lg p-2 text-[#9ba49b] hover:bg-[#f3f2ec]"><X size={17} /></button></div>
      <form onSubmit={onSubmit} className="space-y-4 px-6 py-5">
        <Field label={isTeacher ? "Full name" : isStudent ? "Student’s full name" : "Class name"} name="name" placeholder={isTeacher ? "e.g. Jamie Wilson" : isStudent ? "e.g. Harper James" : "e.g. Oak"} required />
        {isTeacher && <><Field label="Subject area" name="subject" placeholder="e.g. Music & movement" required /><div className="grid grid-cols-2 gap-3"><Field label="Email address" name="email" type="email" placeholder="name@school.edu" required /><Field label="Phone number" name="phone" placeholder="(555) 000-0000" /></div></>}
        {isStudent && <><label className="block"><span className="mb-1.5 block text-[10px] font-semibold text-[#75847a]">Class / grade</span><select name="grade" className="h-10 w-full rounded-lg border border-[#e6e5dd] bg-[#fffefa] px-3 text-[11px] text-[#5e7065] outline-none focus:border-[#93ac99]">{initialRooms.map((room) => <option key={room.className}>{room.className}</option>)}</select></label><div className="grid grid-cols-2 gap-3"><Field label="Parent / guardian" name="guardian" placeholder="Guardian name" required /><Field label="Guardian email" name="email" type="email" placeholder="name@email.com" /></div></>}
        {!isTeacher && !isStudent && <><div className="grid grid-cols-2 gap-3"><label className="block"><span className="mb-1.5 block text-[10px] font-semibold text-[#75847a]">Grade</span><select name="grade" className="h-10 w-full rounded-lg border border-[#e6e5dd] bg-[#fffefa] px-3 text-[11px] text-[#5e7065] outline-none focus:border-[#93ac99]">{["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"].map((grade) => <option key={grade}>{grade}</option>)}</select></label><Field label="Room" name="room" placeholder="e.g. Room 110" required /></div><label className="block"><span className="mb-1.5 block text-[10px] font-semibold text-[#75847a]">Lead teacher</span><select name="teacher" className="h-10 w-full rounded-lg border border-[#e6e5dd] bg-[#fffefa] px-3 text-[11px] text-[#5e7065] outline-none focus:border-[#93ac99]">{teachers.map((teacher) => <option key={teacher.name}>{teacher.name}</option>)}</select></label><Field label="Room capacity" name="capacity" type="number" placeholder="24" defaultValue="24" /></>}
        <div className="flex justify-end gap-2 border-t border-[#efeee8] pt-4"><button type="button" onClick={onClose} className="h-10 rounded-lg px-4 text-[11px] font-semibold text-[#839087] hover:bg-[#f5f4ee]">Cancel</button><button type="submit" className="flex h-10 items-center gap-2 rounded-lg bg-[#315b4e] px-4 text-[11px] font-semibold text-white transition hover:bg-[#264e42]"><Plus size={14} />{isTeacher ? "Add to team" : isStudent ? "Enroll student" : "Add class"}</button></div>
      </form>
    </div>
  </div>;
}

function Field({ label, name, placeholder, type = "text", required = false, defaultValue }: { label: string; name: string; placeholder: string; type?: string; required?: boolean; defaultValue?: string }) {
  return <label className="block"><span className="mb-1.5 block text-[10px] font-semibold text-[#75847a]">{label}</span><input name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} className="h-10 w-full rounded-lg border border-[#e6e5dd] bg-[#fffefa] px-3 text-[11px] text-[#52675b] outline-none transition placeholder:text-[#b2b8af] focus:border-[#93ac99] focus:ring-2 focus:ring-[#93ac99]/15" /></label>;
}
