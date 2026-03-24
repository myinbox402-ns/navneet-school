"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const STUDENTS = [
  { id:"NPSS-001", name:"Aarav Sharma",   class:"Grade 5-A", parent:"Rajesh Sharma",  phone:"98100-11111", fee:"Paid",    dob:"12 Apr 2015", gender:"Male" },
  { id:"NPSS-002", name:"Priya Verma",    class:"Grade 6-B", parent:"Suresh Verma",   phone:"98100-22222", fee:"Pending", dob:"03 Jul 2013", gender:"Female" },
  { id:"NPSS-003", name:"Rohan Gupta",    class:"Grade 4-A", parent:"Manoj Gupta",    phone:"98100-33333", fee:"Paid",    dob:"19 Jan 2014", gender:"Male" },
  { id:"NPSS-004", name:"Sneha Patel",    class:"Grade 7-C", parent:"Vijay Patel",    phone:"98100-44444", fee:"Overdue", dob:"07 Mar 2012", gender:"Female" },
  { id:"NPSS-005", name:"Arjun Mehta",    class:"Grade 5-B", parent:"Anil Mehta",     phone:"98100-55555", fee:"Paid",    dob:"22 Sep 2014", gender:"Male" },
  { id:"NPSS-006", name:"Kavya Nair",     class:"Grade 8-A", parent:"Mohan Nair",     phone:"98100-66666", fee:"Paid",    dob:"15 Dec 2011", gender:"Female" },
  { id:"NPSS-007", name:"Rahul Singh",    class:"Grade 6-A", parent:"Rajiv Singh",    phone:"98100-77777", fee:"Pending", dob:"28 Feb 2013", gender:"Male" },
  { id:"NPSS-008", name:"Ananya Sharma",  class:"Grade 9-B", parent:"Sunil Sharma",   phone:"98100-88888", fee:"Paid",    dob:"11 Jun 2010", gender:"Female" },
];

const feeBg  = (f:string) => f==="Paid"?"#d1fae5":f==="Pending"?"#fef3c7":"#fee2e2";
const feeCl  = (f:string) => f==="Paid"?"#059669":f==="Pending"?"#d97706":"#dc2626";

export default function StudentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName:"", lastName:"", dateOfBirth:"", gender:"Male",
    classId:"", parentName:"", parentPhone:"", address:"", studentId:""
  });

  useEffect(() => {
    fetch("/api/classes")
      .then(r=>r.json())
      .then(data=>setClasses(data))
      .catch(()=>{});
    
    fetch("/api/students")
      .then(r=>r.json())
      .then(data=>setStudents(data))
      .catch(()=>{});
  }, []);
  if (status === "loading") return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:18,color:"#059669"}}>⏳ Loading...</div>;
  if (!session) { router.push("/"); return null; }

  const handleImport = async (file: File) => {
    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/students/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImportResult(data);
      fetch("/api/students").then(r=>r.json()).then(data=>setStudents(data));
    } catch {
      alert("Import failed!");
    }
    setImporting(false);
  };
  const handleSave = async () => {
    if(!form.firstName || !form.lastName || !form.classId || !form.dateOfBirth || !form.studentId) {
      alert("Please fill all required fields!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if(res.ok) {
       setSuccess(true);
        setShowForm(false);
        fetch("/api/students")
          .then(r=>r.json())
          .then(data=>setStudents(data))
          .catch(()=>{});
        setForm({firstName:"",lastName:"",dateOfBirth:"",gender:"Male",classId:"",parentName:"",parentPhone:"",address:"",studentId:""});
        setTimeout(()=>setSuccess(false), 3000);
      } else {
        alert("Failed to save student!");
      }
    } catch {
      alert("Something went wrong!");
    }
    setSaving(false);
  };

 const filtered = students.filter((s:any) =>
    (s.firstName + " " + s.lastName)?.toLowerCase().includes(search.toLowerCase()) ||
    s.class?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId?.toLowerCase().includes(search.toLowerCase())
  );
   
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", display: "flex", height: "100vh", background: "#f0fdf4", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 240, minWidth: 240, background: "linear-gradient(170deg, #064e3b, #065f46)", display: "flex", flexDirection: "column", boxShadow: "4px 0 24px rgba(0,0,0,0.18)", zIndex: 10 }}>
        <div style={{ padding: "18px 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, minWidth: 38, borderRadius: 10, background: "linear-gradient(135deg,#34d399,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏫</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 11, lineHeight: 1.4 }}>Navneet Public Sr. Sec. School</div>
            <div style={{ color: "#34d399", fontSize: 10 }}>CBSE Affiliated</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
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
            <Link key={n.label} href={n.href} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, marginBottom:3, color: n.label==="Students"?"#fff":"#6ee7b7", fontWeight: n.label==="Students"?700:400, fontSize:13, textDecoration:"none", background: n.label==="Students"?"linear-gradient(90deg,#059669,#064e3b)":"transparent" }}>
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
            <div style={{ fontSize:17, fontWeight:800, color:"#064e3b" }}>👨‍🎓 Students</div>
            <div style={{ fontSize:10.5, color:"#9ca3af" }}>Navneet Public Sr. Sec. School</div>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name, class, ID..." style={{ border:"1.5px solid #d1fae5", borderRadius:20, padding:"6px 16px", fontSize:12.5, outline:"none", width:260, background:"#f9fafb" }}/>
          <a href="/api/students/template" download style={{ background:"#f0fdf4", color:"#059669", border:"1.5px solid #059669", borderRadius:10, padding:"9px 16px", fontSize:13, fontWeight:700, cursor:"pointer", textDecoration:"none", marginRight:8 }}>📥 Download Template</a>
<button onClick={()=>setShowImport(true)} style={{ background:"#fff", color:"#059669", border:"1.5px solid #059669", borderRadius:10, padding:"9px 16px", fontSize:13, fontWeight:700, cursor:"pointer", marginRight:8 }}>📤 Import Excel</button>
<button onClick={()=>setShowForm(true)} style={{ background:"linear-gradient(90deg,#059669,#064e3b)", color:"#fff", border:"none", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>+ Enroll Student</button>
        </header>

        <main style={{ flex:1, overflowY:"auto", padding:22 }}>

          {/* Success message */}
          {success && (
            <div style={{ background:"#d1fae5", border:"1.5px solid #059669", borderRadius:10, padding:"10px 18px", marginBottom:16, color:"#059669", fontWeight:700, fontSize:13 }}>
              ✅ Student enrolled successfully!
            </div>
          )}

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {[
              { label:"Total Students", value: STUDENTS.length,                              color:"#059669", bg:"#d1fae5" },
              { label:"Fee Paid",       value: STUDENTS.filter(s=>s.fee==="Paid").length,    color:"#059669", bg:"#d1fae5" },
              { label:"Fee Pending",    value: STUDENTS.filter(s=>s.fee==="Pending").length, color:"#d97706", bg:"#fef3c7" },
              { label:"Fee Overdue",    value: STUDENTS.filter(s=>s.fee==="Overdue").length, color:"#dc2626", bg:"#fee2e2" },
            ].map(s=>(
              <div key={s.label} style={{ background:"#fff", borderRadius:14, padding:"16px 18px", boxShadow:"0 1px 4px rgba(0,0,0,0.05)", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:12, color:"#6b7280", fontWeight:500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Students Table */}
          <div style={{ background:"#fff", borderRadius:16, padding:22, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight:800, color:"#064e3b", fontSize:14, marginBottom:16 }}>
              All Students ({filtered.length})
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#d1fae5" }}>
                  {["Roll No.","Student Name","Class","Parent / Guardian","Phone","Fee Status","Actions"].map(h=>(
                    <th key={h} style={{ padding:"9px 13px", textAlign:"left", fontSize:10.5, color:"#059669", fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s,i)=>(
                  <tr key={s.id} style={{ borderTop:"1px solid #f0fdf4", background:i%2===0?"#fff":"#fafafa" }}>
                    <td style={{ padding:"11px 13px", fontSize:11, color:"#9ca3af", fontFamily:"monospace" }}>{s.id}</td>
                    <td style={{ padding:"11px 13px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <div style={{ width:34, height:34, borderRadius:"50%", background:`hsl(${140+i*45},50%,85%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:`hsl(${140+i*45},50%,35%)` }}>{s.firstName?.[0]||"S"}</div>
<div>
  <div style={{ fontSize:13, fontWeight:700, color:"#111827" }}>{s.firstName} {s.lastName}</div>
  <div style={{ fontSize:10.5, color:"#9ca3af" }}>{s.gender} • Class: {s.class?.name}-{s.class?.section}</div>
</div>
                      </div>
                    </td>
                    <td style={{ padding:"11px 13px", fontSize:13, color:"#4b5563" }}>{s.class?.name}-{s.class?.section}</td>
                    <td style={{ padding:"11px 13px", fontSize:13, color:"#4b5563" }}>—</td>
                    <td style={{ padding:"11px 13px", fontSize:13, color:"#4b5563" }}>{s.phone||"—"}</td>

                    <td style={{ padding:"11px 13px" }}>
                    <span style={{ background:"#fef3c7", color:"#d97706", padding:"3px 11px", borderRadius:99, fontSize:11, fontWeight:700 }}>Pending</span> 
                    </td>
                    <td style={{ padding:"11px 13px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        <button style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #d1fae5", background:"#d1fae5", cursor:"pointer", color:"#059669", fontWeight:700 }}>View</button>
                        <button style={{ fontSize:11, padding:"4px 10px", borderRadius:6, border:"1px solid #e5e7eb", background:"#f9fafb", cursor:"pointer", color:"#6b7280", fontWeight:600 }}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

{/* IMPORT POPUP */}
      {showImport && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:500,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>📤 Import Students from Excel</div>
              <button onClick={()=>{setShowImport(false);setImportResult(null);}} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            {!importResult ? (
              <div>
                <div style={{background:"#f0fdf4",borderRadius:10,padding:"14px 16px",marginBottom:16,border:"1px solid #d1fae5"}}>
                  <div style={{fontSize:12.5,color:"#064e3b",fontWeight:700,marginBottom:6}}>📋 Instructions:</div>
                  <div style={{fontSize:12,color:"#374151",lineHeight:1.8}}>
                    1. Download the Excel template using the button below<br/>
                    2. Fill in student details (Class and Section must match exactly)<br/>
                    3. Check the Class Reference sheet for exact class and section names<br/>
                    4. Upload the filled file here
                  </div>
                </div>
                <a href="/api/students/template" download style={{display:"block",textAlign:"center",background:"#d1fae5",color:"#059669",border:"1px solid #059669",borderRadius:10,padding:"10px",fontSize:13,fontWeight:700,textDecoration:"none",marginBottom:14}}>
                  📥 Download Excel Template
                </a>
                <div style={{border:"2px dashed #d1fae5",borderRadius:12,padding:"24px",textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:13,color:"#6b7280",marginBottom:10}}>Select your filled Excel file</div>
                  <input type="file" accept=".xlsx,.xls" onChange={e=>{const f=e.target.files?.[0]; if(f) handleImport(f);}} style={{fontSize:13}}/>
                </div>
                {importing && <div style={{textAlign:"center",color:"#059669",fontWeight:700,fontSize:13}}>⏳ Importing students... please wait</div>}
              </div>
            ) : (
              <div>
                <div style={{background:importResult.failed===0?"#d1fae5":"#fef3c7",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
                  <div style={{fontSize:14,fontWeight:800,color:importResult.failed===0?"#059669":"#d97706"}}>{importResult.message}</div>
                </div>
                {importResult.errors?.length>0 && (
                  <div style={{background:"#fee2e2",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#dc2626",marginBottom:6}}>Errors:</div>
                    {importResult.errors.map((e:string,i:number)=>(
                      <div key={i} style={{fontSize:11.5,color:"#dc2626"}}>{e}</div>
                    ))}
                  </div>
                )}
                <button onClick={()=>{setShowImport(false);setImportResult(null);}} style={{width:"100%",padding:"11px",background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  ✅ Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ADD STUDENT FORM */}
      {showForm && (
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:32, width:520, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#064e3b" }}>➕ Enroll New Student</div>
              <button onClick={()=>setShowForm(false)} style={{ background:"#fee2e2", border:"none", borderRadius:8, padding:"4px 10px", color:"#dc2626", fontWeight:700, cursor:"pointer", fontSize:16 }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>First Name *</label>
                <input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="Enter first name" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Last Name *</label>
                <input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Enter last name" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Date of Birth *</label>
                <input type="date" value={form.dateOfBirth} onChange={e=>setForm({...form,dateOfBirth:e.target.value})} style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Gender *</label>
                <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none" }}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Class *</label>
                <select value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})} style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none" }}>
                  <option value="">Select Class</option>
                  {classes.map((c:any)=>(
                    <option key={c.id} value={c.id}>{c.name} - {c.section}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Admission No. *</label>
                <input value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})} placeholder="e.g. NPSS-009" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Parent Name</label>
                <input value={form.parentName} onChange={e=>setForm({...form,parentName:e.target.value})} placeholder="Parent/Guardian name" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Parent Phone</label>
                <input value={form.parentPhone} onChange={e=>setForm({...form,parentPhone:e.target.value})} placeholder="Phone number" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
              <div style={{ gridColumn:"span 2" }}>
                <label style={{ fontSize:11.5, color:"#064e3b", fontWeight:700, display:"block", marginBottom:4 }}>Address</label>
                <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Home address" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:"1.5px solid #d1fae5", fontSize:13, outline:"none", boxSizing:"border-box" as "border-box" }}/>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} style={{ width:"100%", marginTop:20, padding:"12px", background:saving?"#9ca3af":"linear-gradient(90deg,#059669,#064e3b)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:saving?"not-allowed":"pointer" }}>
              {saving?"⏳ Saving...":"✅ Save Student"}
            </button>
          </div>
        {/* IMPORT POPUP */}
      {showImport && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:500,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>📤 Import Students from Excel</div>
              <button onClick={()=>{setShowImport(false);setImportResult(null);}} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>

            {!importResult ? (
              <div>
                <div style={{background:"#f0fdf4",borderRadius:10,padding:"14px 16px",marginBottom:16,border:"1px solid #d1fae5"}}>
                  <div style={{fontSize:12.5,color:"#064e3b",fontWeight:700,marginBottom:6}}>📋 Instructions:</div>
                  <div style={{fontSize:12,color:"#374151",lineHeight:1.8}}>
                    1. Download the Excel template using the button below<br/>
                    2. Fill in student details (Class and Section must match exactly)<br/>
                    3. Check the "Class Reference" sheet for exact class and section names<br/>
                    4. Upload the filled file here
                  </div>
                </div>
                <a href="/api/students/template" download style={{display:"block",textAlign:"center",background:G.pale,color:G.main,border:`1px solid ${G.main}`,borderRadius:10,padding:"10px",fontSize:13,fontWeight:700,textDecoration:"none",marginBottom:14}}>
                  📥 Download Excel Template
                </a>
                <div style={{border:"2px dashed #d1fae5",borderRadius:12,padding:"24px",textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:13,color:"#6b7280",marginBottom:10}}>Select your filled Excel file</div>
                  <input type="file" accept=".xlsx,.xls" onChange={e=>{const f=e.target.files?.[0]; if(f) handleImport(f);}} style={{fontSize:13}}/>
                </div>
                {importing && <div style={{textAlign:"center",color:"#059669",fontWeight:700,fontSize:13}}>⏳ Importing students... please wait</div>}
              </div>
            ) : (
              <div>
                <div style={{background:importResult.failed===0?"#d1fae5":"#fef3c7",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
                  <div style={{fontSize:14,fontWeight:800,color:importResult.failed===0?"#059669":"#d97706"}}>{importResult.message}</div>
                </div>
                {importResult.errors?.length>0 && (
                  <div style={{background:"#fee2e2",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#dc2626",marginBottom:6}}>Errors:</div>
                    {importResult.errors.map((e:string,i:number)=>(
                      <div key={i} style={{fontSize:11.5,color:"#dc2626"}}>{e}</div>
                    ))}
                  </div>
                )}
                <button onClick={()=>{setShowImport(false);setImportResult(null);}} style={{width:"100%",padding:"11px",background:"linear-gradient(90deg,#059669,#064e3b)",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  ✅ Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
        </div>
      )}

    </div>
  );
}