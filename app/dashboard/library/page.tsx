"use client";
import { useState } from "react";
import Link from "next/link";

const BOOKS = [
  { id:"LIB-001", title:"NCERT Mathematics Gr.5",  author:"NCERT",              category:"Textbook",  isbn:"978-81-7450-001", copies:12, available:8,  shelf:"A-1" },
  { id:"LIB-002", title:"Wings of Fire",            author:"A.P.J. Abdul Kalam", category:"Biography", isbn:"978-81-2370-002", copies:4,  available:2,  shelf:"B-2" },
  { id:"LIB-003", title:"NCERT Science Gr.6",       author:"NCERT",              category:"Textbook",  isbn:"978-81-7450-003", copies:10, available:10, shelf:"A-2" },
  { id:"LIB-004", title:"The Secret Garden",        author:"Frances Burnett",    category:"Fiction",   isbn:"978-81-2370-004", copies:3,  available:0,  shelf:"C-1" },
  { id:"LIB-005", title:"Discovery of India",       author:"Jawaharlal Nehru",   category:"History",   isbn:"978-81-2370-005", copies:5,  available:3,  shelf:"B-3" },
  { id:"LIB-006", title:"NCERT English Gr.7",       author:"NCERT",              category:"Textbook",  isbn:"978-81-7450-006", copies:8,  available:6,  shelf:"A-3" },
  { id:"LIB-007", title:"Panchatantra Stories",     author:"Vishnu Sharma",      category:"Fiction",   isbn:"978-81-2370-007", copies:6,  available:4,  shelf:"C-2" },
  { id:"LIB-008", title:"Science Encyclopedia",     author:"DK Publishing",      category:"Reference", isbn:"978-81-2370-008", copies:3,  available:3,  shelf:"D-1" },
];

const ISSUED = [
  { id:"ISS-001", book:"Wings of Fire",        student:"Aarav Sharma",  class:"5-A", issued:"01 Mar 2026", due:"15 Mar 2026", status:"Overdue" },
  { id:"ISS-002", book:"The Secret Garden",    student:"Priya Verma",   class:"6-B", issued:"05 Mar 2026", due:"19 Mar 2026", status:"Issued"  },
  { id:"ISS-003", book:"Panchatantra Stories", student:"Rohan Gupta",   class:"4-A", issued:"08 Mar 2026", due:"22 Mar 2026", status:"Issued"  },
  { id:"ISS-004", book:"Discovery of India",   student:"Kavya Nair",    class:"8-A", issued:"10 Mar 2026", due:"24 Mar 2026", status:"Issued"  },
];

const CATS = ["All","Textbook","Fiction","Biography","History","Reference"];

export default function LibraryPage() {
  const [tab, setTab]           = useState<"catalog"|"issued">("catalog");
  const [search, setSearch]     = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showIssue, setShowIssue] = useState(false);

  const filtered = BOOKS.filter(b=>
    (catFilter==="All" || b.category===catFilter) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) ||
     b.author.toLowerCase().includes(search.toLowerCase()))
  );

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
            <Link key={n.label} href={n.href} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:10,marginBottom:3,color:n.label==="Library"?"#fff":"#6ee7b7",fontWeight:n.label==="Library"?700:400,fontSize:13,textDecoration:"none",background:n.label==="Library"?"linear-gradient(90deg,#059669,#064e3b)":"transparent"}}>
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
            <div style={{fontSize:17,fontWeight:800,color:"#064e3b"}}>📚 Library</div>
            <div style={{fontSize:10.5,color:"#9ca3af"}}>Book catalog, issue and return management</div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setTab("catalog")} style={{padding:"7px 16px",borderRadius:8,border:`1.5px solid ${tab==="catalog"?"#059669":"#e5e7eb"}`,background:tab==="catalog"?"#d1fae5":"#fff",color:tab==="catalog"?"#059669":"#6b7280",cursor:"pointer",fontWeight:700,fontSize:13}}>📚 Catalog</button>
            <button onClick={()=>setTab("issued")} style={{padding:"7px 16px",borderRadius:8,border:`1.5px solid ${tab==="issued"?"#059669":"#e5e7eb"}`,background:tab==="issued"?"#d1fae5":"#fff",color:tab==="issued"?"#059669":"#6b7280",cursor:"pointer",fontWeight:700,fontSize:13}}>📤 Issued Books</button>
          </div>
          <button onClick={()=>setShowIssue(true)} style={{background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Issue Book</button>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:22}}>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
            {[
              {label:"Total Books",     val:BOOKS.reduce((a,b)=>a+b.copies,0),     icon:"📚", color:"#059669", bg:"#d1fae5"},
              {label:"Available Now",   val:BOOKS.reduce((a,b)=>a+b.available,0),  icon:"✅", color:"#0891b2", bg:"#ecfeff"},
              {label:"Currently Issued",val:ISSUED.filter(i=>i.status==="Issued").length, icon:"📤", color:"#7c3aed", bg:"#f5f3ff"},
              {label:"Overdue Books",   val:ISSUED.filter(i=>i.status==="Overdue").length,icon:"⚠️", color:"#dc2626", bg:"#fee2e2"},
            ].map(s=>(
              <div key={s.label} style={{background:"#fff",borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:12,border:`1px solid ${s.bg}`}}>
                <div style={{width:46,height:46,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:22,fontWeight:900,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CATALOG TAB */}
          {tab==="catalog" && (
            <div>
              {/* Search & Filter */}
              <div style={{display:"flex",gap:10,marginBottom:16}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by title or author..." style={{flex:1,border:"1.5px solid #d1fae5",borderRadius:10,padding:"8px 16px",fontSize:13,outline:"none",background:"#fff"}}/>
                <div style={{display:"flex",gap:6}}>
                  {CATS.map(c=>(
                    <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"7px 14px",borderRadius:8,border:`1.5px solid ${catFilter===c?"#059669":"#e5e7eb"}`,background:catFilter===c?"#d1fae5":"#fff",color:catFilter===c?"#059669":"#6b7280",cursor:"pointer",fontWeight:700,fontSize:12}}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Cards */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
                {filtered.map((b,i)=>(
                  <div key={b.id} style={{background:"#fff",borderRadius:14,padding:18,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",display:"flex",gap:14,border:"1.5px solid #f0fdf4"}}>
                    <div style={{width:52,height:68,borderRadius:8,background:`hsl(${140+i*30},45%,88%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,minWidth:52}}>📗</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13.5,fontWeight:800,color:"#111827",marginBottom:3}}>{b.title}</div>
                      <div style={{fontSize:12,color:"#6b7280",marginBottom:2}}>✍️ {b.author}</div>
                      <div style={{fontSize:11,color:"#9ca3af",marginBottom:8}}>🏷 {b.category}  •  📦 Shelf {b.shelf}  •  ISBN: {b.isbn}</div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{flex:1,height:6,background:"#e5e7eb",borderRadius:3,overflow:"hidden"}}>
                          <div style={{width:`${(b.available/b.copies)*100}%`,height:"100%",background:b.available>0?"#059669":"#ef4444",borderRadius:3}}/>
                        </div>
                        <span style={{fontSize:11,fontWeight:700,color:b.available>0?"#059669":"#dc2626",whiteSpace:"nowrap"}}>{b.available}/{b.copies} available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ISSUED BOOKS TAB */}
          {tab==="issued" && (
            <div style={{background:"#fff",borderRadius:16,padding:22,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
              <div style={{fontWeight:800,color:"#064e3b",fontSize:14,marginBottom:16}}>Currently Issued Books</div>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:"#d1fae5"}}>
                    {["Issue ID","Book Title","Student","Class","Issue Date","Due Date","Status","Action"].map(h=>(
                      <th key={h} style={{padding:"9px 13px",textAlign:"left",fontSize:10.5,color:"#059669",fontWeight:700,textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ISSUED.map((item,i)=>(
                    <tr key={item.id} style={{borderTop:"1px solid #f0fdf4",background:i%2===0?"#fff":"#fafafa"}}>
                      <td style={{padding:"11px 13px",fontSize:11,color:"#9ca3af",fontFamily:"monospace"}}>{item.id}</td>
                      <td style={{padding:"11px 13px",fontSize:13,fontWeight:700,color:"#111827"}}>{item.book}</td>
                      <td style={{padding:"11px 13px",fontSize:13,color:"#4b5563"}}>{item.student}</td>
                      <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{item.class}</td>
                      <td style={{padding:"11px 13px",fontSize:12,color:"#6b7280"}}>{item.issued}</td>
                      <td style={{padding:"11px 13px",fontSize:12,color:item.status==="Overdue"?"#dc2626":"#6b7280",fontWeight:item.status==="Overdue"?700:400}}>{item.due}</td>
                      <td style={{padding:"11px 13px"}}>
                        <span style={{background:item.status==="Overdue"?"#fee2e2":"#dbeafe",color:item.status==="Overdue"?"#dc2626":"#3b82f6",padding:"3px 11px",borderRadius:99,fontSize:11,fontWeight:700}}>{item.status}</span>
                      </td>
                      <td style={{padding:"11px 13px"}}>
                        <button style={{fontSize:11,padding:"4px 10px",borderRadius:6,border:"1px solid #d1fae5",background:"#d1fae5",cursor:"pointer",color:"#059669",fontWeight:700}}>↩ Return</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* ISSUE BOOK FORM */}
      {showIssue && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>📤 Issue Book to Student</div>
              <button onClick={()=>setShowIssue(false)} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[
                {label:"Select Book",    type:"select", options:BOOKS.map(b=>b.title)},
                {label:"Select Student", type:"select", options:["Aarav Sharma","Priya Verma","Rohan Gupta","Sneha Patel","Arjun Mehta","Kavya Nair"]},
                {label:"Issue Date",     type:"date",   placeholder:""},
                {label:"Due Date",       type:"date",   placeholder:""},
              ].map(f=>(
                <div key={f.label}>
                  <label style={{fontSize:11.5,color:"#064e3b",fontWeight:700,display:"block",marginBottom:4}}>{f.label}</label>
                  {f.type==="select"?(
                    <select style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none"}}>
                      {f.options?.map(o=><option key={o}>{o}</option>)}
                    </select>
                  ):(
                    <input type={f.type} style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  )}
                </div>
              ))}
            </div>
            <button style={{width:"100%",marginTop:20,padding:"12px",background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer"}}>
              ✅ Issue Book
            </button>
          </div>
        </div>
      )}

    </div>
  );
}