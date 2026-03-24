"use client";
import { useState } from "react";
import Link from "next/link";

const TEACHERS = [
  { id:"TCH-001", name:"Mrs. Sunita Joshi",  subject:"Mathematics",      classes:"Grade 5, 6, 7", phone:"98100-11111", email:"sunita@npss.edu", qual:"M.Sc Mathematics",  joining:"01 Apr 2015", salary:"₹45,000", status:"Active" },
  { id:"TCH-002", name:"Mr. Ramesh Kumar",   subject:"Science",          classes:"Grade 4, 5, 6", phone:"98100-22222", email:"ramesh@npss.edu", qual:"M.Sc Physics",      joining:"15 Jun 2013", salary:"₹42,000", status:"Active" },
  { id:"TCH-003", name:"Ms. Anita Singh",    subject:"English",          classes:"Grade 6, 7, 8", phone:"98100-33333", email:"anita@npss.edu",  qual:"MA English",        joining:"20 Jul 2016", salary:"₹40,000", status:"Active" },
  { id:"TCH-004", name:"Mr. Deepak Tiwari",  subject:"Social Science",   classes:"Grade 4, 5",    phone:"98100-44444", email:"deepak@npss.edu", qual:"MA History",        joining:"10 Jan 2018", salary:"₹38,000", status:"Active" },
  { id:"TCH-005", name:"Ms. Pooja Rawat",    subject:"Hindi",            classes:"Grade 5, 6, 7", phone:"98100-55555", email:"pooja@npss.edu",  qual:"MA Hindi",          joining:"05 Mar 2017", salary:"₹38,000", status:"Active" },
  { id:"TCH-006", name:"Mr. Vikram Yadav",   subject:"Computer Science", classes:"Grade 7, 8",    phone:"98100-66666", email:"vikram@npss.edu", qual:"B.Tech CS",         joining:"12 Aug 2019", salary:"₹40,000", status:"Active" },
  { id:"TCH-007", name:"Ms. Neha Sharma",    subject:"Art & Craft",      classes:"Grade 3, 4, 5", phone:"98100-77777", email:"neha@npss.edu",   qual:"BFA Fine Arts",     joining:"01 Jun 2020", salary:"₹35,000", status:"Active" },
  { id:"TCH-008", name:"Mr. Ajay Verma",     subject:"Physical Education",classes:"All Grades",   phone:"98100-88888", email:"ajay@npss.edu",   qual:"B.P.Ed",            joining:"15 Apr 2014", salary:"₹36,000", status:"Active" },
];

const COLORS = ["#d1fae5","#dbeafe","#f5f3ff","#fef3c7","#ffedd5","#ecfeff","#fce7f3","#e0e7ff"];
const TCOLORS = ["#059669","#3b82f6","#7c3aed","#d97706","#f97316","#0891b2","#be185d","#6366f1"];

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"grid"|"list">("grid");

  const filtered = TEACHERS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

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
            <Link key={n.label} href={n.href} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, marginBottom:3, color:n.label==="Teachers"?"#fff":"#6ee7b7", fontWeight:n.label==="Teachers"?700:400, fontSize:13, textDecoration:"none", background:n.label==="Teachers"?"linear-gradient(90deg,#059669,#064e3b)":"transparent" }}>
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
            <div style={{ fontSize:17, fontWeight:800, color:"#064e3b" }}>👩‍🏫 Teachers</div>
            <div style={{ fontSize:10.5, color:"#9ca3af" }}>Navneet Public Sr. Sec. School</div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name or subject..." style={{ border:"1.5px solid #d1fae5", borderRadius:20, padding:"6px 16px", fontSize:12.5, outline:"none", width:260, background:"#f9fafb" }}/>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={()=>setView("grid")} style={{ padding:"7px 12px", borderRadius:8, border:`1.5px solid ${view==="grid"?"#059669":"#e5e7eb"}`, background:view==="grid"?"#d1fae5":"#fff", color:view==="grid"?"#059669":"#6b7280", cursor:"pointer", fontWeight:700, fontSize:13 }}>⊞ Grid</button>
            <button onClick={()=>setView("list")} style={{ padding:"7px 12px", borderRadius:8, border:`1.5px solid ${view==="list"?"#059669":"#e5e7eb"}`, background:view==="list"?"#d1fae5":"#fff", color:view==="list"?"#059669":"#6b7280", cursor:"pointer", fontWeight:700, fontSize:13 }}>≡ List</button>
          </div>
          <button onClick={()=>setShowForm(true)} style={{ background:"linear-gradient(90deg,#059669,#064e3b)", color:"#fff", border:"none", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>+ Add Teacher</button>
        </header>

        <main style={{ flex:1, overflowY:"auto", padding:22 }}>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {[
              { label:"Total Teachers",  value:TEACHERS.length,   color:"#059669", bg:"#d1fae5" },
              { label:"Active",          value:TEACHERS.filter(t=>t.status==="Active").length, color:"#059669", bg:"#d1fae5" },
              { label:"Subjects Covered",value:"8",               color:"#7c3aed", bg:"#f5f3ff" },
              { label:"Avg. Experience", value:"7 yrs",           color:"#0891b2", bg:"#ecfeff" },
            ].map(s=>(
              <div key={s.label} style={{ background:"#fff", borderRadius:14, padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:12, color:"#6b7280", fontWeight:500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* GRID VIEW */}
          {view==="grid" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {filtered.map((t,i)=>(
                <div key={t.id} style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 1px 6px rgba(0,0,0,0.06)", border:`1.5px solid ${COLORS[i%8]}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                    <div style={{ width:52, height:52, borderRadius:"50%", background:COLORS[i%8], display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:TCOLORS[i%8] }}>{t.name.split(" ")[1]?.[0]||"T"}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:"#111827" }}>{t.name}</div>
                      <div style={{ fontSize:12, color:TCOLORS[i%8], fontWeight:600 }}>{t.subject}</div>
                    </div>
                    <span style={{ background:"#d1fae5", color:"#059669", padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700 }}>{t.status}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:11.5, color:"#6b7280" }}>
                    <div>📚 {t.classes}</div>
                    <div>📞 {t.phone}</div>
                    <div>🎓 {t.qual}</div>
                    <div>📅 {t.joining}</div>
                    <div>✉️ {t.email}</div>
                    <div>💰 {t.salary}/mo</div>
                  </div>
                  <div style={{ display:"flex", gap:8, marginTop:14 }}>
                    <button style={{ flex:1, padding:"7px", borderRadius:8, border:`1px solid ${COLORS[i%8]}`, background:COLORS[i%8], color:TCOLORS[i%8], fontWeight:700, fontSize:12, cursor:"pointer" }}>View Profile</button>
                    <button style={{ flex:1, padding:"7px", borderRadius:8, border:"1px solid #e5e7eb", background:"#f9fafb", color:"#6b7280", fontWeight:600, fontSize:12, cursor:"pointer" }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view==="list" && (
            <div style={{ background:"#fff", borderRadius:16, padding:22, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#d1fae5" }}>
                    {["ID","Teacher Name","Subject","Classes","Phone","Qualification","Salary","Status"].map(h=>(
                      <th key={h} style={{ padding:"9px 13px", textAlign:"left", fontSize:10.5, color:"#059669", fontWeight:700, textTransform:"uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t,i)=>(
                    <tr key={t.id} style={{ borderTop:"1px solid #f0fdf4", background:i%2===0?"#fff":"#fafafa" }}>
                      <td style={{ padding:"11px 13px", fontSize:11, color:"#9ca3af", fontFamily:"monospace" }}>{t.id}</td>
                      <td style={{ padding:"11px 13px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:"50%", background:COLORS[i%8], display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:TCOLORS[i%8] }}>{t.name.split(" ")[1]?.[0]||"T"}</div>
                          <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>{t.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:"11px 13px", fontSize:12, color:TCOLORS[i%8], fontWeight:600 }}>{t.subject}</td>
                      <td style={{ padding:"11px 13px", fontSize:12, color:"#4b5563" }}>{t.classes}</td>
                      <td style={{ padding:"11px 13px", fontSize:12, color:"#4b5563" }}>{t.phone}</td>
                      <td style={{ padding:"11px 13px", fontSize:12, color:"#4b5563" }}>{t.qual}</td>
                      <td style={{ padding:"11px 13px", fontSize:13, fontWeight:700, color:"#064e3b" }}>{t.salary}</td>
                      <td style={{ padding:"11px 13px" }}>
                        <span style={{ background:"#d1fae5", color:"#059669", padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700 }}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* ADD TEACHER FORM */}
      {showForm && (
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:32, width:520, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#064e3b" }}>➕ Add New Teacher</div>
              <button onClick={()=>setShowForm(false)} style={{ background:"#fee2e2", border:"none", borderRadius:8, padding:"4px 10px", color:"#dc2626", fontWeight:700, cursor:"pointer", fontSize:16 }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { label:"Full Name",       type:"text",   placeholder:"Teacher full name" },
                { label:"Employee ID",     type:"text",   placeholder:"e.g. TCH-009" },
                { label:"Subject",         type:"select", options:["Mathematics","Science","English","Hindi","Social Science","Computer Science","Art & Craft","Physical Education"] },
                { label:"Qualification",   type:"text",   placeholder:"e.g. M.Sc Mathematics" },
                { label:"Phone",           type:"text",   placeholder:"Phone number" },
                { label:"Email",           type:"email",  placeholder:"Email address" },
                { label:"Joining Date",    type:"date",   placeholder:"" },
                { label:"Salary (₹)",      type:"text",   placeholder:"Monthly salary" },
              ].map(f=>(
                <div key={f.label}>
                  <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>{f.label}</label>
                  {f.type==="select" ? (
                    <select style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none" }}>
                      {f.options?.map(o=><option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} placeholder={f.placeholder} style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" }}/>
                  )}
                </div>
              ))}
            </div>
            <button style={{ width:"100%", marginTop:20, padding:"12px", background:"linear-gradient(90deg,#059669,#064e3b)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              ✅ Save Teacher
            </button>
          </div>
        </div>
      )}

    </div>
  );
}