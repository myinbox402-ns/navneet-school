"use client";
import { useState } from "react";
import Link from "next/link";

const FEES = [
  { id:"REC-001", student:"Aarav Sharma",  class:"5-A", type:"Tuition",   amount:4500, due:"01 Mar 2026", paid:"27 Feb 2026", method:"Cash",          status:"Paid"    },
  { id:"REC-002", student:"Priya Verma",   class:"6-B", type:"Tuition",   amount:4500, due:"01 Mar 2026", paid:"—",           method:"—",             status:"Pending" },
  { id:"REC-003", student:"Rohan Gupta",   class:"4-A", type:"Transport", amount:1800, due:"01 Mar 2026", paid:"25 Feb 2026", method:"Bank Transfer",  status:"Paid"    },
  { id:"REC-004", student:"Sneha Patel",   class:"7-C", type:"Tuition",   amount:5000, due:"01 Feb 2026", paid:"—",           method:"—",             status:"Overdue" },
  { id:"REC-005", student:"Arjun Mehta",   class:"5-B", type:"Tuition",   amount:4500, due:"01 Mar 2026", paid:"28 Feb 2026", method:"Online",        status:"Paid"    },
  { id:"REC-006", student:"Kavya Nair",    class:"8-A", type:"Library",   amount:500,  due:"01 Mar 2026", paid:"01 Mar 2026", method:"Cash",          status:"Paid"    },
  { id:"REC-007", student:"Rahul Singh",   class:"6-A", type:"Tuition",   amount:4500, due:"01 Mar 2026", paid:"—",           method:"—",             status:"Pending" },
  { id:"REC-008", student:"Ananya Sharma", class:"9-B", type:"Exam",      amount:1000, due:"01 Mar 2026", paid:"02 Mar 2026", method:"Online",        status:"Paid"    },
];

const feeBg  = (f:string) => f==="Paid"?"#d1fae5":f==="Pending"?"#fef3c7":"#fee2e2";
const feeCl  = (f:string) => f==="Paid"?"#059669":f==="Pending"?"#d97706":"#dc2626";

export default function FeesPage() {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = FEES.filter(f =>
    (filter==="All" || f.status===filter) &&
    (f.student.toLowerCase().includes(search.toLowerCase()) ||
     f.id.toLowerCase().includes(search.toLowerCase()))
  );

  const totalCollected = FEES.filter(f=>f.status==="Paid").reduce((a,f)=>a+f.amount,0);
  const totalPending   = FEES.filter(f=>f.status==="Pending").reduce((a,f)=>a+f.amount,0);
  const totalOverdue   = FEES.filter(f=>f.status==="Overdue").reduce((a,f)=>a+f.amount,0);

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
            <Link key={n.label} href={n.href} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:10,marginBottom:3,color:n.label==="Fees & Billing"?"#fff":"#6ee7b7",fontWeight:n.label==="Fees & Billing"?700:400,fontSize:13,textDecoration:"none",background:n.label==="Fees & Billing"?"linear-gradient(90deg,#059669,#064e3b)":"transparent"}}>
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
            <div style={{fontSize:17,fontWeight:800,color:"#064e3b"}}>💳 Fees & Billing</div>
            <div style={{fontSize:10.5,color:"#9ca3af"}}>Fee collection and payment tracking — ₹ INR</div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search student or receipt..." style={{border:"1.5px solid #d1fae5",borderRadius:20,padding:"6px 16px",fontSize:12.5,outline:"none",width:240,background:"#f9fafb"}}/>
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{border:"1.5px solid #d1fae5",borderRadius:10,padding:"6px 14px",fontSize:13,outline:"none",color:"#064e3b",fontWeight:600}}>
            {["All","Paid","Pending","Overdue"].map(f=><option key={f}>{f}</option>)}
          </select>
          <button onClick={()=>setShowForm(true)} style={{background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Record Payment</button>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:22}}>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
            {[
              {label:"Total Collected",  val:`₹${totalCollected.toLocaleString("en-IN")}`, icon:"💰", color:"#059669", bg:"#d1fae5"},
              {label:"Pending Amount",   val:`₹${totalPending.toLocaleString("en-IN")}`,   icon:"⏳", color:"#d97706", bg:"#fef3c7"},
              {label:"Overdue Amount",   val:`₹${totalOverdue.toLocaleString("en-IN")}`,   icon:"⚠️", color:"#dc2626", bg:"#fee2e2"},
              {label:"Total Records",    val:FEES.length,                                   icon:"📋", color:"#6366f1", bg:"#e0e7ff"},
            ].map(s=>(
              <div key={s.label} style={{background:"#fff",borderRadius:14,padding:"18px 20px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:14,border:`1px solid ${s.bg}`}}>
                <div style={{width:46,height:46,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:18,fontWeight:900,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fee Table */}
          <div style={{background:"#fff",borderRadius:16,padding:22,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <div style={{fontWeight:800,color:"#064e3b",fontSize:14,marginBottom:16}}>
              Fee Records ({filtered.length})
            </div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:"#d1fae5"}}>
                  {["Receipt No.","Student","Class","Fee Type","Amount (₹)","Due Date","Paid Date","Method","Status","Action"].map(h=>(
                    <th key={h} style={{padding:"9px 13px",textAlign:"left",fontSize:10.5,color:"#059669",fontWeight:700,textTransform:"uppercase",letterSpacing:0.3}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f,i)=>(
                  <tr key={f.id} style={{borderTop:"1px solid #f0fdf4",background:i%2===0?"#fff":"#fafafa"}}>
                    <td style={{padding:"11px 13px",fontSize:11,color:"#9ca3af",fontFamily:"monospace"}}>{f.id}</td>
                    <td style={{padding:"11px 13px",fontSize:13,fontWeight:700,color:"#111827"}}>{f.student}</td>
                    <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{f.class}</td>
                    <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{f.type}</td>
                    <td style={{padding:"11px 13px",fontSize:13,fontWeight:800,color:"#064e3b"}}>₹{f.amount.toLocaleString("en-IN")}</td>
                    <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{f.due}</td>
                    <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{f.paid}</td>
                    <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{f.method}</td>
                    <td style={{padding:"11px 13px"}}>
                      <span style={{background:feeBg(f.status),color:feeCl(f.status),padding:"3px 11px",borderRadius:99,fontSize:11,fontWeight:700}}>{f.status}</span>
                    </td>
                    <td style={{padding:"11px 13px"}}>
                      <button style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:"1px solid #d1fae5",background:"#d1fae5",cursor:"pointer",color:"#059669",fontWeight:700}}>🖨 Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* RECORD PAYMENT FORM */}
      {showForm && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:500,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>💳 Record Fee Payment</div>
              <button onClick={()=>setShowForm(false)} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[
                {label:"Student Name",   type:"select", options:["Aarav Sharma","Priya Verma","Rohan Gupta","Sneha Patel","Arjun Mehta","Kavya Nair","Rahul Singh","Ananya Sharma"]},
                {label:"Fee Type",       type:"select", options:["Tuition","Transport","Library","Sports","Exam","Other"]},
                {label:"Amount (₹)",     type:"text",   placeholder:"Enter amount"},
                {label:"Payment Method", type:"select", options:["Cash","Bank Transfer","Online","Cheque"]},
                {label:"Payment Date",   type:"date",   placeholder:""},
                {label:"Receipt Number", type:"text",   placeholder:"e.g. REC-009"},
                {label:"Due Date",       type:"date",   placeholder:""},
                {label:"Remarks",        type:"text",   placeholder:"Optional remarks"},
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
              ✅ Save Payment Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
}