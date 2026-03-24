"use client";
import { useState } from "react";
import Link from "next/link";

const TIMETABLE: Record<string, Record<string, string>> = {
  "08:00–08:45": { Mon:"Math (5-A)",     Tue:"English (6-B)", Wed:"Science (4-A)", Thu:"Hindi (7-C)",   Fri:"Math (5-B)"    },
  "08:45–09:30": { Mon:"Science (5-A)",  Tue:"Math (6-B)",    Wed:"English (4-A)", Thu:"Math (7-C)",    Fri:"Science (5-B)" },
  "09:30–10:15": { Mon:"English (5-A)",  Tue:"Hindi (6-B)",   Wed:"Math (4-A)",    Thu:"Science (7-C)", Fri:"English (5-B)" },
  "10:15–10:30": { Mon:"☕ Break",       Tue:"☕ Break",       Wed:"☕ Break",       Thu:"☕ Break",       Fri:"☕ Break"       },
  "10:30–11:15": { Mon:"Hindi (5-A)",    Tue:"SST (6-B)",     Wed:"Hindi (4-A)",   Thu:"English (7-C)", Fri:"Hindi (5-B)"   },
  "11:15–12:00": { Mon:"SST (5-A)",      Tue:"Computer (6-B)",Wed:"SST (4-A)",     Thu:"Computer (7-C)",Fri:"SST (5-B)"     },
  "12:00–12:45": { Mon:"Computer (5-A)", Tue:"Science (6-B)", Wed:"Computer (4-A)",Thu:"SST (7-C)",     Fri:"Computer (5-B)"},
  "12:45–01:30": { Mon:"🍱 Lunch",       Tue:"🍱 Lunch",      Wed:"🍱 Lunch",      Thu:"🍱 Lunch",      Fri:"🍱 Lunch"      },
  "01:30–02:15": { Mon:"Art (5-A)",      Tue:"PE (6-B)",      Wed:"Art (4-A)",     Thu:"PE (7-C)",      Fri:"Art (5-B)"     },
  "02:15–03:00": { Mon:"PE (5-A)",       Tue:"Art (6-B)",     Wed:"PE (4-A)",      Thu:"Art (7-C)",     Fri:"PE (5-B)"      },
};

const CLASSES = ["Grade 4-A","Grade 5-A","Grade 5-B","Grade 6-B","Grade 7-C"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri"];
const DAYS_FULL = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

const SUBJECT_COLORS: Record<string,{bg:string,color:string}> = {
  "Math":    {bg:"#dbeafe",color:"#3b82f6"},
  "Science": {bg:"#d1fae5",color:"#059669"},
  "English": {bg:"#fce7f3",color:"#be185d"},
  "Hindi":   {bg:"#fef3c7",color:"#d97706"},
  "SST":     {bg:"#e0e7ff",color:"#6366f1"},
  "Computer":{bg:"#ecfeff",color:"#0891b2"},
  "Art":     {bg:"#ffedd5",color:"#f97316"},
  "PE":      {bg:"#f0fdf4",color:"#16a34a"},
};

function getCellStyle(val:string) {
  if(val.includes("Break")) return {bg:"#fef9ee",color:"#92400e",italic:true};
  if(val.includes("Lunch")) return {bg:"#fef3c7",color:"#92400e",italic:true};
  const subject = Object.keys(SUBJECT_COLORS).find(s=>val.startsWith(s));
  if(subject) return {...SUBJECT_COLORS[subject],italic:false};
  return {bg:"#f9fafb",color:"#374151",italic:false};
}

export default function TimetablePage() {
  const [classFilter, setClassFilter] = useState("All");
  const [showForm, setShowForm]       = useState(false);

  return (
    <div style={{fontFamily:"'Segoe UI', sans-serif",display:"flex",height:"100vh",background:"#f0fdf4",overflow:"hidden"}}>

      {/* SIDEBAR */}
      <aside style={{width:240,minWidth:240,background:"linear-gradient(170deg, #064e3b, #065f46)",display:"flex",flexDirection:"column",boxShadow:"4px 0 24px rgba(0,0,0,0.18)",zIndex:10}}>
        <div style={{padding:"18px 14px 14px",borderBottom:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,minWidth:38,borderRadius:10,background:"linear-gradient(135deg,#34d399,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏫</div>
          <div>
            <div style={{color:"#fff",fontWeight:800,fontSize:11,lineHeight:1.4}}>Navneet Public Sr. Sec. School</div>
            <div style={{color:"#34d399",fontSize:10}}>CBSE Affiliated</div>
          </div>
        </div>
        <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
          {[
            {label:"Dashboard",     icon:"⊞",  href:"/dashboard"},
            {label:"Students",      icon:"👨‍🎓", href:"/dashboard/students"},
            {label:"Teachers",      icon:"👩‍🏫", href:"/dashboard/teachers"},
            {label:"Attendance",    icon:"✅",  href:"/dashboard/attendance"},
            {label:"Grades",        icon:"📊",  href:"/dashboard/grades"},
            {label:"Timetable",     icon:"🗓",  href:"/dashboard/timetable"},
            {label:"Fees & Billing",icon:"💳",  href:"/dashboard/fees"},
            {label:"Library",       icon:"📚",  href:"/dashboard/library"},
          ].map((n)=>(
            <Link key={n.label} href={n.href} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:10,marginBottom:3,color:n.label==="Timetable"?"#fff":"#6ee7b7",fontWeight:n.label==="Timetable"?700:400,fontSize:13,textDecoration:"none",background:n.label==="Timetable"?"linear-gradient(90deg,#059669,#064e3b)":"transparent"}}>
              <span style={{fontSize:15,minWidth:20,textAlign:"center"}}>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{padding:"12px 12px 16px",borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:14}}>A</div>
          <div>
            <div style={{color:"#fff",fontSize:12,fontWeight:600}}>Admin</div>
            <div style={{color:"#34d399",fontSize:10}}>Principal Office</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Top Bar */}
        <header style={{background:"#fff",padding:"0 24px",height:62,display:"flex",alignItems:"center",gap:14,borderBottom:"2px solid #d1fae5"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:17,fontWeight:800,color:"#064e3b"}}>🗓 Timetable</div>
            <div style={{fontSize:10.5,color:"#9ca3af"}}>Weekly class schedule — {new Date().toDateString()}</div>
          </div>
          <select value={classFilter} onChange={e=>setClassFilter(e.target.value)} style={{border:"1.5px solid #d1fae5",borderRadius:10,padding:"6px 14px",fontSize:13,outline:"none",color:"#064e3b",fontWeight:600}}>
            <option>All</option>
            {CLASSES.map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={()=>window.print()} style={{background:"#f0fdf4",color:"#059669",border:"1.5px solid #d1fae5",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>🖨 Print</button>
          <button onClick={()=>setShowForm(true)} style={{background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Add Period</button>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:22}}>

          {/* Subject Legend */}
          <div style={{background:"#fff",borderRadius:12,padding:"12px 18px",marginBottom:18,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11.5,color:"#064e3b",fontWeight:700,marginRight:4}}>Subjects:</span>
            {Object.entries(SUBJECT_COLORS).map(([sub,c])=>(
              <span key={sub} style={{background:c.bg,color:c.color,padding:"3px 12px",borderRadius:20,fontSize:11.5,fontWeight:700}}>{sub}</span>
            ))}
            <span style={{background:"#fef9ee",color:"#92400e",padding:"3px 12px",borderRadius:20,fontSize:11.5,fontWeight:700}}>☕ Break</span>
            <span style={{background:"#fef3c7",color:"#92400e",padding:"3px 12px",borderRadius:20,fontSize:11.5,fontWeight:700}}>🍱 Lunch</span>
          </div>

          {/* Timetable Grid */}
          <div style={{background:"#fff",borderRadius:16,padding:22,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",overflowX:"auto"}}>
            <div style={{fontWeight:800,color:"#064e3b",fontSize:14,marginBottom:16}}>
              Weekly Timetable — Navneet Public Sr. Sec. School
            </div>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
              <thead>
                <tr>
                  <th style={{padding:"10px 16px",background:"#064e3b",color:"#fff",fontSize:12,textAlign:"left",borderRadius:"8px 0 0 0",minWidth:120}}>Time Slot</th>
                  {DAYS_FULL.map((d,i)=>(
                    <th key={d} style={{padding:"10px 14px",background:"#065f46",color:"#34d399",fontSize:12,textAlign:"center",borderLeft:"1px solid #064e3b",borderRadius:i===4?"0 8px 0 0":0,minWidth:130}}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(TIMETABLE).map(([time,row],i)=>(
                  <tr key={time} style={{background:i%2===0?"#f9fffe":"#fff"}}>
                    <td style={{padding:"10px 16px",fontSize:12,fontWeight:700,color:"#064e3b",whiteSpace:"nowrap",borderRight:"2px solid #d1fae5",background:"#f0fdf4"}}>
                      {time}
                    </td>
                    {DAYS.map(d=>{
                      const val = row[d] || "—";
                      const style = getCellStyle(val);
                      return (
                        <td key={d} style={{padding:"10px 12px",textAlign:"center",borderLeft:"1px solid #f0fdf4",background:style.bg}}>
                          <span style={{fontSize:12,color:style.color,fontStyle:style.italic?"italic":"normal",fontWeight:style.italic?400:600}}>
                            {val}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Today's Schedule */}
          <div style={{marginTop:18,background:"#fff",borderRadius:16,padding:22,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:800,color:"#064e3b",fontSize:14,marginBottom:14}}>📅 Today&apos;s Schedule — Monday</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
              {Object.entries(TIMETABLE).filter(([,row])=>!row["Mon"].includes("Break")&&!row["Mon"].includes("Lunch")).map(([time,row])=>{
                const style = getCellStyle(row["Mon"]);
                return (
                  <div key={time} style={{background:style.bg,borderRadius:10,padding:"12px 14px",border:`1.5px solid ${style.color}22`}}>
                    <div style={{fontSize:10,color:"#9ca3af",marginBottom:4}}>{time}</div>
                    <div style={{fontSize:13,fontWeight:700,color:style.color}}>{row["Mon"]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* ADD PERIOD FORM */}
      {showForm && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>➕ Add New Period</div>
              <button onClick={()=>setShowForm(false)} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[
                {label:"Class",     type:"select", options:CLASSES},
                {label:"Subject",   type:"select", options:["Mathematics","Science","English","Hindi","Social Science","Computer","Art","PE"]},
                {label:"Teacher",   type:"select", options:["Mrs. Sunita Joshi","Mr. Ramesh Kumar","Ms. Anita Singh","Mr. Deepak Tiwari","Ms. Pooja Rawat","Mr. Vikram Yadav"]},
                {label:"Day",       type:"select", options:DAYS_FULL},
                {label:"Start Time",type:"time",   placeholder:""},
                {label:"End Time",  type:"time",   placeholder:""},
                {label:"Room No.",  type:"text",   placeholder:"e.g. Room 101"},
              ].map(f=>(
                <div key={f.label}>
                  <label style={{fontSize:11.5,color:"#064e3b",fontWeight:700,display:"block",marginBottom:4}}>{f.label}</label>
                  {f.type==="select"?(
                    <select style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none"}}>
                      {f.options?.map(o=><option key={o}>{o}</option>)}
                    </select>
                  ):(
                    <input type={f.type} placeholder={f.placeholder} style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  )}
                </div>
              ))}
            </div>
            <button style={{width:"100%",marginTop:20,padding:"12px",background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer"}}>
              ✅ Save Period
            </button>
          </div>
        </div>
      )}

    </div>
  );
}