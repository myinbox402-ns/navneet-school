"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/* =========================
   👉 CLASS + SECTION LIST
========================= */
const CLASS_SECTION_LIST = [
  { value: "Class 5|Shaheed Bhagat Singh Ji", label: "Class 5 – Shaheed Bhagat Singh Ji" },
  { value: "Class 5|Udham Singh Ji", label: "Class 5 – Udham Singh Ji" },
  { value: "Class 7|Kalpana Chawla", label: "Class 7 – Kalpana Chawla" },
  { value: "Class 2|Bhai Veer Singh Ji", label: "Class 2 – Bhai Veer Singh Ji" },
];

/* =========================
   👉 TAB LOGIC
========================= */
function getTabForClass(cls: string): "35"|"68"|"910"|"1112" {
  if (["Class 1","Class 2","Class 3","Class 4","Class 5"].includes(cls)) return "35";
  if (["Class 6","Class 7","Class 8"].includes(cls)) return "68";
  if (["Class 9","Class 10"].includes(cls)) return "910";
  return "1112";
}

/* =========================
   👉 MAIN PAGE
========================= */
export default function GradesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selClassSection, setSelClassSection] = useState("");
  const [selStudentId, setSelStudentId] = useState("");

  const [students, setStudents] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any>(null);

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const [tab, setTab] = useState<"35"|"68"|"910"|"1112">("35");

  /* =========================
     👉 FETCH STUDENTS
  ========================= */
  useEffect(() => {
    setStudents([]);
    setSelStudentId("");
    setReportData(null);

    if (!selClassSection) return;

    const [cls, sec] = selClassSection.split("|");

    setLoadingStudents(true);
    fetch(`/api/students?class=${cls}&section=${sec}`)
      .then(r => r.json())
      .then(d => setStudents(d.students || d))
      .catch(() => setStudents([]))
      .finally(() => setLoadingStudents(false));
  }, [selClassSection]);

  /* =========================
     👉 FETCH REPORT
  ========================= */
  useEffect(() => {
    if (!selStudentId) return;

    const [cls] = selClassSection.split("|");
    setTab(getTabForClass(cls));

    setLoadingReport(true);
    fetch(`/api/grades/report?studentId=${selStudentId}`)
      .then(r => r.json())
      .then(d => setReportData(d))
      .finally(() => setLoadingReport(false));
  }, [selStudentId]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) { router.push("/"); return null; }

  return (
    <div style={{display:"flex",height:"100vh"}}>

      {/* =========================
         👉 SIDEBAR
      ========================= */}
      <aside className="no-print" style={{width:220,background:"#064e3b",color:"#fff"}}>
        <div style={{padding:20,fontWeight:800}}>Navneet School</div>
      </aside>

      {/* =========================
         👉 MAIN
      ========================= */}
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>

        {/* HEADER */}
        <header className="no-print" style={{padding:16,background:"#fff",borderBottom:"1px solid #ddd"}}>
          <button onClick={()=>window.print()}>🖨 Print</button>
        </header>

        <main className="print-main" style={{padding:20}}>

          {/* =========================
             👉 SELECTOR
          ========================= */}
          <div className="no-print" style={{marginBottom:20}}>

            {/* CLASS + SECTION */}
            <select
              value={selClassSection}
              onChange={(e)=>setSelClassSection(e.target.value)}
            >
              <option value="">Select Class & Section</option>
              {CLASS_SECTION_LIST.map(c=>(
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            {/* STUDENT */}
            <select
              value={selStudentId}
              onChange={(e)=>setSelStudentId(e.target.value)}
              disabled={!selClassSection}
            >
              <option value="">Select Student</option>
              {students.map((s:any)=>(
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

          </div>

          {/* =========================
             👉 REPORT CARD
          ========================= */}
          <div className="report-card">

            {!selStudentId && <div>Select student first</div>}

            {loadingReport && <div>Loading report...</div>}

            {reportData && (
              <div style={{border:"1px solid #000",padding:20}}>
                <h2>Report Card</h2>
                <p>Name: {reportData.student?.name}</p>
                <p>Class: {reportData.student?.className}</p>
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}