"use client";
import { useState } from "react";
import Link from "next/link";

const STUDENTS = [
  { id:"NPSS-001", name:"Aarav Sharma",  class:"5-A" },
  { id:"NPSS-002", name:"Priya Verma",   class:"6-B" },
  { id:"NPSS-003", name:"Rohan Gupta",   class:"4-A" },
  { id:"NPSS-004", name:"Sneha Patel",   class:"7-C" },
  { id:"NPSS-005", name:"Arjun Mehta",   class:"5-B" },
  { id:"NPSS-006", name:"Kavya Nair",    class:"8-A" },
  { id:"NPSS-007", name:"Rahul Singh",   class:"6-A" },
  { id:"NPSS-008", name:"Ananya Sharma", class:"9-B" },
];

type Status = "P" | "A" | "L" | "E";

const STATUS_INFO = {
  P: { label:"Present", color:"#059669", bg:"#d1fae5" },
  A: { label:"Absent",  color:"#dc2626", bg:"#fee2e2" },
  L: { label:"Late",    color:"#d97706", bg:"#fef3c7" },
  E: { label:"Excused", color:"#6366f1", bg:"#e0e7ff" },
};

export default function AttendancePage() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState<Record<string, Status>>(
    Object.fromEntries(STUDENTS.map(s => [s.id, "P"]))
  );
  const [saved, setSaved] = useState(false);
  const [classFilter, setClassFilter] = useState("All");

  const classes = ["All", ...Array.from(new Set(STUDENTS.map(s => s.class)))];
  const filtered = STUDENTS.filter(s => classFilter === "All" || s.class === classFilter);

  const counts = {
    P: Object.values(attendance).filter(v=>v==="P").length,
    A: Object.values(attendance).filter(v=>v==="A").length,
    L: Object.values(attendance).filter(v=>v==="L").length,
    E: Object.values(attendance).filter(v=>v==="E").length,
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", display:"flex", height:"100vh", background:"#f0fdf4", overflow:"hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width:240, minWidth:240, background:"linear-gradient(170deg, #064e3b, #065f46)", display:"flex", flexDirection:"column", boxShadow:"4px 0 24px rgba(0,0,0,0.18)", zIndex:10 }}>
        <div style={{ padding:"18px 14px 14px", borderBottom:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, minWidth:38, borderRadius:10, background:"linear-gradient(135deg,#34d399,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🏫</div>
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:11, lineHeight:1.4 }}>Navneet Public Sr. Sec. School</div>
            <div style={{ color:"#34d399", fontSize:10 }}>CBSE Affiliated</div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {[
            { label:"Dashboard",     icon:"⊞",  href:"/dashboard" },
            { label:"Students",      icon:"👨‍🎓", href:"/dashboard/students" },
            { label:"Teachers",      icon:"👩‍🏫", href:"/dashboard/teachers" },
            { label:"Attendance",    icon:"✅",  href:"/dashboard/attendance" },
            { label:"Grades",        icon:"📊",  href:"/dashboard/grades" },
            { label:"Timetable",     icon:"🗓",  href:"/dashboard/timetable" },
            { label:"Fees & Billing",icon:"💳",  href:"/dashboard/fees" },
            { label:"Library",       icon:"📚",  href:"/dashboard/library" },
          ].map((n) => (
            <Link key={n.label} href={n.href} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, marginBottom:3, color:n.label==="Attendance"?"#fff":"#6ee7b7", fontWeight:n.label==="Attendance"?700:400, fontSize:13, textDecoration:"none", background:n.label==="Attendance"?"linear-gradient(90deg,#059669,#064e3b)":"transparent" }}>
              <span style={{ fontSize:15, minWidth:20, textAlign:"center" }}>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding:"12px 12px 16px", borderTop:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#f59e0b,#f97316)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:14 }}>A</div>
          <div>
            <div style={{ color:"#fff", fontSize:12, fontWeight:600 }}>Admin</div>
            <div style={{ color:"#34d399", fontSize:10 }}>Principal Office</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Top Bar */}
        <header style={{ background:"#fff", padding:"0 24px", height:62, display:"flex", alignItems:"center", gap:14, borderBottom:"2px solid #d1fae5" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:800, color:"#064e3b" }}>✅ Attendance</div>
            <div style={{ fontSize:10.5, color:"#9ca3af" }}>Mark daily attendance for all students</div>
          </div>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{ border:"1.5px solid #d1fae5", borderRadius:10, padding:"6px 14px", fontSize:13, outline:"none", color:"#064e3b", fontWeight:600 }}/>
          <select value={classFilter} onChange={e=>setClassFilter(e.target.value)} style={{ border:"1.5px solid #d1fae5", borderRadius:10, padding:"6px 14px", fontSize:13, outline:"none", color:"#064e3b", fontWeight:600 }}>
            {classes.map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={handleSave} style={{ background:"linear-gradient(90deg,#059669,#064e3b)", color:"#fff", border:"none", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>
            💾 Save Attendance
          </button>
        </header>

        <main style={{ flex:1, overflowY:"auto", padding:22 }}>

          {/* Success message */}
          {saved && (
            <div style={{ background:"#d1fae5", border:"1.5px solid #059669", borderRadius:10, padding:"10px 18px", marginBottom:16, color:"#059669", fontWeight:700, fontSize:13 }}>
              ✅ Attendance saved successfully for {date}!
            </div>
          )}

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {(Object.entries(STATUS_INFO) as [Status, typeof STATUS_INFO[Status]][]).map(([key, info])=>(
              <div key={key} style={{ background:"#fff", borderRadius:14, padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:12, border:`1.5px solid ${info.bg}` }}>
                <div style={{ width:44, height:44, borderRadius:12, background:info.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:info.color }}>{counts[key]}</div>
                <div>
                  <div style={{ fontSize:18, fontWeight:900, color:info.color }}>{counts[key]}</div>
                  <div style={{ fontSize:12, color:"#6b7280" }}>{info.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance Table */}
          <div style={{ background:"#fff", borderRadius:16, padding:22, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontWeight:800, color:"#064e3b", fontSize:14 }}>
                Mark Attendance — {new Date(date).toDateString()}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setAttendance(Object.fromEntries(STUDENTS.map(s=>[s.id,"P"])))} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #d1fae5", background:"#d1fae5", color:"#059669", fontWeight:700, fontSize:12, cursor:"pointer" }}>✅ Mark All Present</button>
                <button onClick={()=>setAttendance(Object.fromEntries(STUDENTS.map(s=>[s.id,"A"])))} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #fee2e2", background:"#fee2e2", color:"#dc2626", fontWeight:700, fontSize:12, cursor:"pointer" }}>❌ Mark All Absent</button>
              </div>
            </div>

            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#d1fae5" }}>
                  {["#","Student Name","Class","Present","Absent","Late","Excused","Status"].map(h=>(
                    <th key={h} style={{ padding:"9px 13px", textAlign:"left", fontSize:10.5, color:"#059669", fontWeight:700, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s,i)=>(
                  <tr key={s.id} style={{ borderTop:"1px solid #f0fdf4", background:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"11px 13px", fontSize:12, color:"#9ca3af" }}>{i+1}</td>
                    <td style={{ padding:"11px 13px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:`hsl(${140+i*45},50%,85%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:`hsl(${140+i*45},50%,35%)` }}>{s.name[0]}</div>
                        <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"11px 13px", fontSize:13, color:"#4b5563" }}>{s.class}</td>
                    {(["P","A","L","E"] as Status[]).map(status=>(
                      <td key={status} style={{ padding:"11px 13px", textAlign:"left" }}>
                        <input
                          type="radio"
                          name={s.id}
                          checked={attendance[s.id]===status}
                          onChange={()=>setAttendance(prev=>({...prev,[s.id]:status}))}
                          style={{ width:18, height:18, accentColor:STATUS_INFO[status].color, cursor:"pointer" }}
                        />
                      </td>
                    ))}
                    <td style={{ padding:"11px 13px" }}>
                      <span style={{ background:STATUS_INFO[attendance[s.id]].bg, color:STATUS_INFO[attendance[s.id]].color, padding:"3px 11px", borderRadius:99, fontSize:11, fontWeight:700 }}>
                        {STATUS_INFO[attendance[s.id]].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}