"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NAV = [
  { id: "dashboard",  label: "Dashboard",     icon: "⊞", href: "/dashboard" },
  { id: "students",   label: "Students",       icon: "👨‍🎓", href: "/dashboard/students" },
  { id: "teachers",   label: "Teachers",       icon: "👩‍🏫", href: "/dashboard/teachers" },
  { id: "attendance", label: "Attendance",     icon: "✅", href: "/dashboard/attendance" },
  { id: "grades",     label: "Grades",         icon: "📊", href: "/dashboard/grades" },
  { id: "timetable",  label: "Timetable",      icon: "🗓", href: "/dashboard/timetable" },
  { id: "fees",       label: "Fees & Billing", icon: "💳", href: "/dashboard/fees" },
  { id: "library",    label: "Library",        icon: "📚", href: "/dashboard/library" },
];

const STATS = [
  { label: "Total Students", value: "312",    icon: "👨‍🎓", color: "#059669", bg: "#d1fae5" },
  { label: "Teaching Staff", value: "24",     icon: "👩‍🏫", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Present Today",  value: "294",    icon: "✅",   color: "#0891b2", bg: "#ecfeff" },
  { label: "Fees Overdue",   value: "₹5,000", icon: "⚠️",  color: "#dc2626", bg: "#fef2f2" },
];

const RECENT_STUDENTS = [
  { name: "Aarav Sharma",   class: "Grade 5-A", fee: "Paid",    color: "#d1fae5", tc: "#059669" },
  { name: "Priya Verma",    class: "Grade 6-B", fee: "Pending", color: "#fef3c7", tc: "#d97706" },
  { name: "Rohan Gupta",    class: "Grade 4-A", fee: "Paid",    color: "#d1fae5", tc: "#059669" },
  { name: "Sneha Patel",    class: "Grade 7-C", fee: "Overdue", color: "#fee2e2", tc: "#dc2626" },
  { name: "Arjun Mehta",    class: "Grade 5-B", fee: "Paid",    color: "#d1fae5", tc: "#059669" },
];

const QUICK_ACTIONS = [
  { label: "Enroll New Student",       icon: "➕", color: "#059669" },
  { label: "Mark Today's Attendance",  icon: "✅", color: "#0891b2" },
  { label: "Enter Exam Grades",        icon: "📊", color: "#7c3aed" },
  { label: "Record Fee Payment",       icon: "💰", color: "#d97706" },
  { label: "Issue Library Book",       icon: "📖", color: "#0e7490" },
  { label: "Print Report Card",        icon: "🖨", color: "#be185d" },
];

export default function Dashboard() {const { data: session, status } = useSession();
  const router = useRouter();
  const [sideOpen, setSideOpen] = useState(true);
  
  if (status === "loading") return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:18,color:"#059669"}}>⏳ Loading...</div>;
  if (!session) { router.push("/"); return null; }
  
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", display: "flex", height: "100vh", background: "#f0fdf4", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: sideOpen ? 240 : 64, minWidth: sideOpen ? 240 : 64, background: "linear-gradient(170deg, #064e3b, #065f46)", display: "flex", flexDirection: "column", transition: "width 0.25s", boxShadow: "4px 0 24px rgba(0,0,0,0.18)", zIndex: 10, overflow: "hidden" }}>
        
        {/* School Name */}
        <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 10, background: "linear-gradient(135deg,#34d399,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏫</div>
          {sideOpen && (
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 11, lineHeight: 1.4 }}>Navneet Public Sr. Sec. School</div>
              <div style={{ color: "#34d399", fontSize: 10 }}>CBSE Affiliated</div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {NAV.map((n) => (
            <Link key={n.id} href={n.href} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 11px", borderRadius: 10, marginBottom: 3, color: "#6ee7b7", fontWeight: 400, fontSize: 13, textDecoration: "none" }}>
              <span style={{ fontSize: 15, minWidth: 20, textAlign: "center" }}>{n.icon}</span>
              {sideOpen && <span>{n.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "12px 12px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, minWidth: 34, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#f97316)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>A</div>
          {sideOpen && (
            <>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Admin</div>
                <div style={{ color: "#34d399", fontSize: 10 }}>Principal Office</div>
              </div>
              <button onClick={() => setSideOpen(false)} style={{ background: "none", border: "none", color: "#34d399", cursor: "pointer", fontSize: 16 }}>←</button>
            </>
          )}
          {!sideOpen && (
            <button onClick={() => setSideOpen(true)} style={{ background: "none", border: "none", color: "#34d399", cursor: "pointer", fontSize: 14 }}>→</button>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Bar */}
        <header style={{ background: "#fff", padding: "0 24px", height: 62, display: "flex", alignItems: "center", gap: 14, borderBottom: "2px solid #d1fae5" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#064e3b" }}>⊞ Dashboard</div>
            <div style={{ fontSize: 10.5, color: "#9ca3af" }}>Navneet Public Sr. Sec. School • {new Date().toDateString()}</div>
          </div>
          <input placeholder="🔍 Search..." style={{ border: "1.5px solid #d1fae5", borderRadius: 20, padding: "6px 16px", fontSize: 12.5, outline: "none", width: 210, background: "#f9fafb" }} />
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>🔔</div>
          <div style={{ fontSize: 11.5, color: "#059669", fontWeight: 700, background: "#d1fae5", padding: "4px 12px", borderRadius: 20 }}>CBSE • ₹ INR</div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 22 }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${s.bg}` }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: s.color, lineHeight: 1.1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>

            {/* Recent Students */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 800, color: "#064e3b", fontSize: 13.5, marginBottom: 14 }}>Recent Students</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#d1fae5" }}>
                    {["Student", "Class", "Fee"].map((h) => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10.5, color: "#059669", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_STUDENTS.map((s, i) => (
                    <tr key={s.name} style={{ borderTop: "1px solid #f0fdf4" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `hsl(${140 + i * 50},50%,85%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: `hsl(${140 + i * 50},50%,35%)` }}>{s.name[0]}</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: 12, color: "#6b7280" }}>{s.class}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ background: s.color, color: s.tc, padding: "3px 11px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{s.fee}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 800, color: "#064e3b", fontSize: 13.5, marginBottom: 14 }}>Quick Actions</div>
              {QUICK_ACTIONS.map((a) => (
                <button key={a.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", width: "100%", border: `1.5px solid ${a.color}22`, borderRadius: 10, background: `${a.color}08`, cursor: "pointer", color: a.color, fontWeight: 600, fontSize: 12.5, textAlign: "left", marginBottom: 7 }}>
                  <span style={{ fontSize: 15 }}>{a.icon}</span>{a.label}
                </button>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}