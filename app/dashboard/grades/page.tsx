"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GRADE_SCALE = [
  { range:"91–100", grade:"A1", color:"#059669", bg:"#d1fae5" },
  { range:"81–90",  grade:"A2", color:"#10b981", bg:"#dcfce7" },
  { range:"71–80",  grade:"B1", color:"#3b82f6", bg:"#dbeafe" },
  { range:"61–70",  grade:"B2", color:"#6366f1", bg:"#e0e7ff" },
  { range:"51–60",  grade:"C1", color:"#f59e0b", bg:"#fef3c7" },
  { range:"41–50",  grade:"C2", color:"#f97316", bg:"#ffedd5" },
  { range:"33–40",  grade:"D",  color:"#ef4444", bg:"#fee2e2" },
  { range:"32&Below",grade:"E(Failed)",color:"#dc2626",bg:"#fecaca"},
];

function getGrade(m:number) {
  if(m>=91) return "A1"; if(m>=81) return "A2";
  if(m>=71) return "B1"; if(m>=61) return "B2";
  if(m>=51) return "C1"; if(m>=41) return "C2";
  if(m>=33) return "D";  return "E(Failed)";
}

const td = (bold=false, center=false) => ({
  padding:"5px 8px", border:"1px solid #ccc",
  fontSize:12, textAlign:(center?"center":"left") as any,
  fontWeight:bold?700:400,
});
const th = (center=false) => ({
  padding:"6px 8px", border:"1px solid #999",
  fontSize:11, textAlign:(center?"center":"left") as any,
  fontWeight:700, background:"#1a56a0", color:"#fff",
});

const RCHeader = ({examType="YEARLY EXAMINATION", session="2025-26"}:{examType?:string,session?:string}) => (
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"2px solid #1a56a0",paddingBottom:10,marginBottom:10}}>
    <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
    <div style={{textAlign:"center",flex:1}}>
      <div style={{fontSize:20,fontWeight:900,letterSpacing:1}}>NAVNEET PUBLIC SR. SEC. SCHOOL</div>
      <div style={{fontSize:11,fontStyle:"italic"}}>Affiliated To C.B.S.E , Affiliation No.1631259</div>
      <div style={{fontSize:12,fontWeight:700,color:"#1a56a0",marginTop:2}}>{examType} &nbsp;|&nbsp; <strong>SESSION {session}</strong></div>
    </div>
    <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
  </div>
);

const StudentInfo = ({s}:{s:any}) => (
  <div style={{marginBottom:10}}>
    <div style={{display:"flex",gap:16,marginBottom:6}}>
      <div style={{flex:1,fontSize:12}}><strong>Student&apos;s Name:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:160}}>{s.name}</span></div>
      <div style={{flex:1,fontSize:12}}><strong>Father&apos;s Name:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:160}}>{s.father}</span></div>
      <div style={{fontSize:12}}><strong>D.O.B.:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:80}}>{s.dob}</span></div>
    </div>
    <div style={{display:"flex",gap:16}}>
      <div style={{flex:1,fontSize:12}}><strong>Mother&apos;s Name:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:140}}>{s.mother||""}</span></div>
      <div style={{flex:1,fontSize:12}}><strong>Village:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:120}}>{s.village||""}</span></div>
      <div style={{fontSize:12}}><strong>Class:</strong> <span style={{borderBottom:"1px solid #333",display:"inline-block",minWidth:100}}>{s.class}</span></div>
    </div>
  </div>
);

const CoScholastic = ({scale="8"}:{scale?:string}) => (
  <div style={{marginTop:10,marginBottom:10}}>
    <table style={{width:"100%",borderCollapse:"collapse",marginBottom:6}}>
      <thead>
        <tr><th colSpan={2} style={{...th(true),background:"#f5f5f5",color:"#333",fontSize:11}}>CO – SCHOLASTIC AREAS</th></tr>
        <tr><th style={{...th(),background:"#f5f5f5",color:"#333",fontSize:10,width:"90%"}}>ON a {scale}-point (A1-E) Grading Scale</th><th style={{...th(true),background:"#f5f5f5",color:"#333",fontSize:10}}>Grade</th></tr>
      </thead>
      <tbody>
        {["WORK EXPERIENCE","HEALTH & PHY.EDUCATION","GENERAL STUDIES"].map(a=>(
          <tr key={a}><td style={td()}>{a}</td><td style={td(false,true)}></td></tr>
        ))}
      </tbody>
    </table>
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr><th style={{...th(),background:"#f5f5f5",color:"#333",fontSize:10,width:"90%"}}>ON a {scale}-point (A1-E) Grading Scale</th><th style={{...th(true),background:"#f5f5f5",color:"#333",fontSize:10}}>Grade</th></tr></thead>
      <tbody><tr><td style={td()}>Discipline</td><td style={td(false,true)}></td></tr></tbody>
    </table>
  </div>
);

const GradeScaleTable = () => (
  <div style={{marginTop:10}}>
    <div style={{fontSize:10,fontWeight:700,marginBottom:4}}>GRADING SCALE FOR SCHOLASTIC AREAS</div>
    <table style={{borderCollapse:"collapse",width:200}}>
      <thead><tr><th style={{...th(true),background:"#1a56a0",fontSize:10}}>MARKS RANGE</th><th style={{...th(true),background:"#d4e6f1",color:"#333",fontSize:10}}>GRADE</th></tr></thead>
      <tbody>
        {GRADE_SCALE.map((g,i)=>(
          <tr key={g.grade} style={{background:i%2===0?"#fff":"#fef9e7"}}>
            <td style={{...td(false,true),fontSize:10}}>{g.range}</td>
            <td style={{...td(true,true),fontSize:10,color:g.color}}>{g.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Signatures912 = () => (
  <div style={{marginTop:16}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
      <div style={{fontSize:12}}><strong>Incharge Teacher Sign:</strong><span style={{display:"inline-block",minWidth:140,borderBottom:"1px solid #333"}}></span></div>
      <div style={{fontSize:12}}><strong>Principal:</strong><span style={{display:"inline-block",minWidth:160,borderBottom:"1px solid #333"}}></span></div>
    </div>
    <div style={{fontSize:12}}><strong>REMARKS:</strong><span style={{display:"inline-block",minWidth:200,borderBottom:"1px solid #333"}}></span></div>
  </div>
);

function RC_35({s,examType="YEARLY EXAMINATION",session="2025-26"}:{s:any,examType?:string,session?:string}) {
  const subjects35 = [
    {name:"ENGLISH",  data:s.eng  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"PUNJABI",  data:s.pun  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"HINDI",    data:s.hin  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"MATH",     data:s.math || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"COMPUTER", data:s.comp || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"E.V.S.",   data:s.evs  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
  ];
  const obtained = subjects35.reduce((a,x)=>a+x.data.total,0);
  const pct = Math.round((obtained/600)*100);
  return (
    <div style={{background:"#fffef0",border:"2px solid #ccc",padding:"20px 24px",fontFamily:"Arial,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,borderBottom:"3px solid #c00000",paddingBottom:10,marginBottom:10}}>
        <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:900,color:"#c00000",letterSpacing:1}}>NAVNEET PUBLIC SR. SEC. SCHOOL</div>
          <div style={{fontSize:11,fontWeight:700}}>AFFILIATED TO C.B.S.E. VIDE NUMBER 1631259</div>
          <div style={{fontSize:11}}>{examType} &nbsp;&nbsp; <strong>SESSION {session}</strong></div>
        </div>
        <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
      </div>
      <div style={{background:"#c00000",color:"#fff",textAlign:"center",fontSize:15,fontWeight:900,padding:"7px 0",marginBottom:12,letterSpacing:2}}>STUDENT REPORT CARD</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:12}}>
        <table style={{borderCollapse:"collapse",width:"100%"}}>
          <tbody>
            {[["ROLL NO.",s.roll||""],["CLASS",s.class||""],["S.NAME",s.name||""],["FATHER'S NAME",s.father||""],["D.O.B.",s.dob||""]].map(([l,v])=>(
              <tr key={String(l)}><td style={{...td(true),width:"40%"}}>{l}</td><td style={td()}>: {v}</td></tr>
            ))}
            <tr><td style={td(true)}>ADDRESS</td><td style={td()}>: {s.address||s.village||""}</td></tr>
          </tbody>
        </table>
        <div>
          <div style={{fontSize:10,fontWeight:800,color:"#c00000",marginBottom:4}}>CO-SCHOLASTIC AREAS (3 POINT GRADING SCALE)</div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["WORK\nEDU.","ART/CRAFT\nEDU","HEALTH\n&PHY.","DISCIPLINE","SKILL\nSUBJECT"].map(h=><th key={h} style={{padding:"3px 5px",fontSize:9,border:"1px solid #999",background:"#f5f5f5",textAlign:"center",whiteSpace:"pre-line"}}>{h}</th>)}</tr></thead>
            <tbody><tr>{[s.cosch?.work,s.cosch?.art,s.cosch?.health,s.cosch?.discipline,s.cosch?.skill].map((g,i)=><td key={i} style={{padding:"5px",fontSize:13,fontWeight:800,textAlign:"center",border:"1px solid #999",color:"#c00000"}}>{g||""}</td>)}</tr></tbody>
          </table>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:12}}>
        <thead>
          <tr style={{background:"#c00000"}}>
            {["SUBJECT","PERIODIC\nTEST","MULTIPLE\nAssessment","PORTFOLIO","SUBJECT\nEnrich-ment","HALF\nYEARLY (80)","MARKS OBT\n(100)","POSITIONAL\nGRADE"].map(h=>(
              <th key={h} style={{padding:"5px 7px",color:"#fff",fontSize:10,border:"1px solid #a00000",textAlign:"center",whiteSpace:"pre-line",fontWeight:700}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects35.map((sub,i)=>(
            <tr key={sub.name} style={{background:i%2===0?"#fff":"#fff9f9"}}>
              <td style={{padding:"5px 8px",fontSize:12,fontWeight:700,border:"1px solid #ddd"}}>{sub.name}</td>
              <td style={td(false,true)}>{sub.data.pt||""}</td>
              <td style={td(false,true)}>{sub.data.ma||""}</td>
              <td style={td(false,true)}>{sub.data.port||""}</td>
              <td style={td(false,true)}>{sub.data.se||""}</td>
              <td style={td(false,true)}>{sub.data.hy||""}</td>
              <td style={td(true,true)}>{sub.data.total||""}</td>
              <td style={{...td(true,true),color:"#c00000"}}>{sub.data.total?getGrade(sub.data.total):""}</td>
            </tr>
          ))}
          <tr><td style={{...td(true),fontSize:12}}>GK Grade</td><td colSpan={6} style={{border:"1px solid #ddd"}}></td><td style={{...td(true,true),color:"#c00000"}}>{s.gk||""}</td></tr>
        </tbody>
      </table>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14}}>
        <div style={{border:"1px solid #ddd",padding:"8px 12px",minHeight:60}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:4}}>REMARKS:</div>
          <div style={{fontSize:12,color:"#555"}}>{s.remarks||""}</div>
        </div>
        <table style={{borderCollapse:"collapse"}}>
          {[["TOTAL MARKS","600"],["OBTAINED MARKS",obtained?String(obtained):""],["PERCENTAGE",obtained?`${pct}%`:""],["FINAL RESULT",obtained?(pct>=33?"PASS":"FAIL"):""]].map(([l,v])=>(
            <tr key={l}><td style={{padding:"5px 10px",fontSize:12,fontWeight:700,border:"1px solid #ddd",background:"#f9f9f9"}}>{l}</td><td style={{padding:"5px 10px",fontSize:13,fontWeight:800,border:"1px solid #ddd",textAlign:"center",color:l==="FINAL RESULT"?(v==="PASS"?"#059669":"#dc2626"):"#333"}}>{v}</td></tr>
          ))}
        </table>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
        {["CLASS TEACHER'S SIGNATURE","PARENT'S SIGNATURE","PRINCIPAL'S SIGNATURE"].map(sig=>(
          <div key={sig} style={{textAlign:"center"}}>
            <div style={{height:36,borderBottom:"1px solid #333",marginBottom:5}}/>
            <div style={{fontSize:10,fontWeight:700}}>{sig}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RC_68({s,examType="YEARLY EXAMINATION",session="2025-26"}:{s:any,examType?:string,session?:string}) {
  const subjects68 = [
    {name:"ENGLISH",     data:s.eng  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"PUNJABI",     data:s.pun  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"HINDI",       data:s.hin  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"MATH",        data:s.math || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"SCIENCE",     data:s.sci  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"COMPUTER",    data:s.comp || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
    {name:"SOCIAL SCI.", data:s.sst  || {pt:0,ma:0,port:0,se:0,hy:0,total:0}},
  ];
  const obtained = subjects68.reduce((a,x)=>a+x.data.total,0);
  const pct = Math.round((obtained/700)*100);
  return (
    <div style={{background:"#fffef0",border:"2px solid #ccc",padding:"20px 24px",fontFamily:"Arial,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,borderBottom:"3px solid #c00000",paddingBottom:10,marginBottom:10}}>
        <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:900,color:"#c00000",letterSpacing:1}}>NAVNEET PUBLIC SR. SEC. SCHOOL</div>
          <div style={{fontSize:11,fontWeight:700}}>AFFILIATED TO C.B.S.E. VIDE NUMBER 1631259</div>
          <div style={{fontSize:11}}>{examType} &nbsp;&nbsp; <strong>SESSION {session}</strong></div>
        </div>
        <img src="/logo.png" alt="Logo" style={{width:60,height:60,objectFit:"contain"}}/>
      </div>
      <div style={{background:"#c00000",color:"#fff",textAlign:"center",fontSize:15,fontWeight:900,padding:"7px 0",marginBottom:12,letterSpacing:2}}>STUDENT REPORT CARD</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:12}}>
        <table style={{borderCollapse:"collapse",width:"100%"}}>
          <tbody>
            {[["ROLL NO.",s.roll||""],["CLASS",s.class||""],["S.NAME",s.name||""],["FATHER'S NAME",s.father||""],["D.O.B.",s.dob||""]].map(([l,v])=>(
              <tr key={String(l)}><td style={{...td(true),width:"40%"}}>{l}</td><td style={td()}>: {v}</td></tr>
            ))}
            <tr><td style={td(true)}>ADDRESS</td><td style={td()}>: {s.address||s.village||""}</td></tr>
          </tbody>
        </table>
        <div>
          <div style={{fontSize:10,fontWeight:800,color:"#c00000",marginBottom:4}}>CO-SCHOLASTIC AREAS (3 POINT GRADING SCALE)</div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["WORK\nEDU.","ART/CRAFT\nEDU","HEALTH\n&PHY.","DISCIPLINE","SKILL\nSUBJECT"].map(h=><th key={h} style={{padding:"3px 5px",fontSize:9,border:"1px solid #999",background:"#f5f5f5",textAlign:"center",whiteSpace:"pre-line"}}>{h}</th>)}</tr></thead>
            <tbody><tr>{[s.cosch?.work,s.cosch?.art,s.cosch?.health,s.cosch?.discipline,s.cosch?.skill].map((g,i)=><td key={i} style={{padding:"5px",fontSize:13,fontWeight:800,textAlign:"center",border:"1px solid #999",color:"#c00000"}}>{g||""}</td>)}</tr></tbody>
          </table>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:12}}>
        <thead>
          <tr style={{background:"#c00000"}}>
            {["SUBJECT","PERIODIC\nTEST","MULTIPLE\nASSESS-\nMENT","PORTFOLIO","SUBJECT\nENRICH-\nMENT","HALF YEARLY\n80","MARKS OBT\n100","POSITIONAL\nGRADE"].map(h=>(
              <th key={h} style={{padding:"5px 7px",color:"#fff",fontSize:10,border:"1px solid #a00000",textAlign:"center",whiteSpace:"pre-line",fontWeight:700}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects68.map((sub,i)=>(
            <tr key={sub.name} style={{background:i%2===0?"#fff":"#fff9f9"}}>
              <td style={{padding:"5px 8px",fontSize:12,fontWeight:700,border:"1px solid #ddd"}}>{sub.name}</td>
              <td style={td(false,true)}>{sub.data.pt||""}</td>
              <td style={td(false,true)}>{sub.data.ma||""}</td>
              <td style={td(false,true)}>{sub.data.port||""}</td>
              <td style={td(false,true)}>{sub.data.se||""}</td>
              <td style={td(false,true)}>{sub.data.hy||""}</td>
              <td style={td(true,true)}>{sub.data.total||""}</td>
              <td style={{...td(true,true),color:"#c00000"}}>{sub.data.total?getGrade(sub.data.total):""}</td>
            </tr>
          ))}
          <tr><td style={{...td(true),fontSize:12}}>GK Grade</td><td colSpan={6} style={{border:"1px solid #ddd"}}></td><td style={{...td(true,true),color:"#c00000"}}>{s.gk||""}</td></tr>
        </tbody>
      </table>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14}}>
        <div style={{border:"1px solid #ddd",padding:"8px 12px",minHeight:60}}>
          <div style={{fontSize:11,fontWeight:700,marginBottom:4}}>Remarks</div>
          <div style={{fontSize:12,color:"#555"}}>{s.remarks||""}</div>
        </div>
        <table style={{borderCollapse:"collapse"}}>
          {[["TOTAL MARKS","700"],["OBTAINED MARKS",obtained?String(obtained):""],["PERCENTAGE",obtained?`${pct.toFixed(2)}`:""],["FINAL RESULT",obtained?(pct>=33?"PASS":"FAIL"):""]].map(([l,v])=>(
            <tr key={l}><td style={{padding:"5px 10px",fontSize:12,fontWeight:700,border:"1px solid #ddd",background:"#f9f9f9"}}>{l}</td><td style={{padding:"5px 10px",fontSize:13,fontWeight:800,border:"1px solid #ddd",textAlign:"center",color:l==="FINAL RESULT"?(v==="PASS"?"#059669":"#dc2626"):"#333"}}>{v}</td></tr>
          ))}
        </table>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
        {["CLASS TEACHER'S SIGNATURE","PARENT'S SIGNATURE","PRINCIPAL'S SIGNATURE"].map(sig=>(
          <div key={sig} style={{textAlign:"center"}}>
            <div style={{height:36,borderBottom:"1px solid #333",marginBottom:5}}/>
            <div style={{fontSize:10,fontWeight:700}}>{sig}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RC_910({s,examType="YEARLY EXAMINATION",session="2025-26"}:{s:any,examType?:string,session?:string}) {
  const subjects910 = [
    {code:"184", name:"ENGLISH LNG & LIT",        theory:s.eng?.theory||0,  ia:s.eng?.ia||0  },
    {code:"004", name:"PUNJABI",                   theory:s.pun?.theory||0,  ia:s.pun?.ia||0  },
    {code:"041", name:"MATHEMATICS STANDARD/BASIC",theory:s.math?.theory||0, ia:s.math?.ia||0 },
    {code:"086", name:"SCIENCE",                   theory:s.sci?.theory||0,  ia:s.sci?.ia||0  },
    {code:"087", name:"SOCIAL SCIENCE",            theory:s.sst?.theory||0,  ia:s.sst?.ia||0  },
  ];
  const addl910 = [
    {code:"402", name:"INFORMATION TECHNOLOGY",   theory:s.it?.theory||0,   ia:s.it?.ia||0   },
    {code:"085", name:"HINDI COURSE-B",            theory:s.hin?.theory||0,  ia:s.hin?.ia||0  },
  ];
  const allSubs = [...subjects910,...addl910];
  const totalObt = allSubs.reduce((a,x)=>a+(x.theory+x.ia),0);
  const totalMax = allSubs.length*100;
  const pct = Math.round((totalObt/totalMax)*100);
  return (
    <div style={{background:"#fff",border:"2px solid #ccc",padding:"20px 24px",fontFamily:"Arial,sans-serif"}}>
      <RCHeader examType={examType} session={session}/>
      <StudentInfo s={s}/>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:4}}>
        <thead>
          <tr>
            <th style={th(true)}>SUB CODE</th>
            <th style={th()}>SUB NAME</th>
            <th style={th(true)}>THEORY</th>
            <th style={th(true)}>I.A/PRACTICAL</th>
            <th style={th(true)}>TOTAL</th>
            <th style={th(true)}>POSITIONAL GRADE</th>
          </tr>
        </thead>
        <tbody>
          {subjects910.map((sub,i)=>{
            const total = sub.theory+sub.ia;
            return (
              <tr key={sub.code} style={{background:i%2===0?"#fff":"#f9f9f9"}}>
                <td style={td(false,true)}>{sub.code}</td>
                <td style={td(true)}>{sub.name}</td>
                <td style={td(false,true)}>{sub.theory||""}</td>
                <td style={td(false,true)}>{sub.ia||""}</td>
                <td style={td(true,true)}>{total||""}</td>
                <td style={{...td(true,true),color:"#1a56a0"}}>{total?getGrade(total):""}</td>
              </tr>
            );
          })}
          <tr><td colSpan={6} style={{padding:"4px 8px",fontSize:11,fontWeight:700,background:"#e8f4f8",border:"1px solid #ccc"}}>Additional Subject</td></tr>
          {addl910.map((sub)=>{
            const total = sub.theory+sub.ia;
            return (
              <tr key={sub.code} style={{background:"#fafafa"}}>
                <td style={td(false,true)}>{sub.code}</td>
                <td style={td(true)}>{sub.name}</td>
                <td style={td(false,true)}>{sub.theory||""}</td>
                <td style={td(false,true)}>{sub.ia||""}</td>
                <td style={td(true,true)}>{total||""}</td>
                <td style={{...td(true,true),color:"#1a56a0"}}>{total?getGrade(total):""}</td>
              </tr>
            );
          })}
          <tr style={{background:"#f0f0f0"}}>
            <td colSpan={2} style={{...td(true),fontSize:12}}>Result:</td>
            <td colSpan={2} style={td()}></td>
            <td style={td(true,true)}>{totalObt||""}</td>
            <td style={td()}></td>
          </tr>
          <tr style={{background:"#f0f0f0"}}>
            <td colSpan={4} style={td()}></td>
            <td style={td(true,true)}>{pct?`${pct}%`:""}</td>
            <td style={td()}></td>
          </tr>
        </tbody>
      </table>
      <CoScholastic scale="5"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:10}}>
        <GradeScaleTable/>
        <div style={{paddingTop:80}}>
          <div style={{fontSize:12,marginBottom:8}}><strong>PROMOTED TO CLASS:</strong><span style={{display:"inline-block",minWidth:140,borderBottom:"1px solid #333"}}></span></div>
        </div>
      </div>
      <Signatures912/>
    </div>
  );
}

function RC_1112({s,examType="YEARLY EXAMINATION",session="2025-26"}:{s:any,examType?:string,session?:string}) {
  const STREAMS: Record<string,{code:string,name:string}[]> = {
    "Arts": [
      {code:"301",name:"English Core"},{code:"104",name:"Punjabi"},
      {code:"028",name:"Political Science"},{code:"029",name:"Geography"},
      {code:"030",name:"Economics"},{code:"041",name:"Math"},
      {code:"027",name:"History"},{code:"048",name:"Physical Education"},
    ],
    "Commerce": [
      {code:"301",name:"English Core"},{code:"083",name:"Computer Science"},
      {code:"055",name:"Accountancy"},{code:"054",name:"Business Studies"},
      {code:"030",name:"Economics"},{code:"104",name:"Punjabi"},
      {code:"041",name:"Math"},{code:"048",name:"Physical Education"},
    ],
    "Science (PCM)": [
      {code:"301",name:"English Core"},{code:"042",name:"Physics"},
      {code:"043",name:"Chemistry"},{code:"041",name:"Math"},
      {code:"083",name:"Computer Science"},{code:"104",name:"Punjabi"},
      {code:"048",name:"Physical Education"},
    ],
    "Science (PCB)": [
      {code:"301",name:"English Core"},{code:"044",name:"Biology"},
      {code:"042",name:"Physics"},{code:"043",name:"Chemistry"},
      {code:"083",name:"Computer Science"},{code:"048",name:"Physical Education"},
      {code:"041",name:"Math"},
    ],
  };
  const stream = s.stream || "Science (PCB)";
  const subs = STREAMS[stream] || STREAMS["Science (PCB)"];
  const marks = s.marks || {};
  const totalObt = subs.reduce((a,x)=>a+((marks[x.code]?.theory||0)+(marks[x.code]?.ia||0)),0);
  const pct = Math.round((totalObt/(subs.length*100))*100);
  return (
    <div style={{background:"#fff",border:"2px solid #ccc",padding:"20px 24px",fontFamily:"Arial,sans-serif"}}>
      <RCHeader examType={examType} session={session}/>
      <StudentInfo s={s}/>
      <table style={{width:"100%",borderCollapse:"collapse",marginBottom:4}}>
        <thead>
          <tr>
            <th style={th(true)}>SUB CODE</th>
            <th style={th()}>SUB NAME</th>
            <th style={th(true)}>THEORY</th>
            <th style={th(true)}>I.A/PRACTICAL</th>
            <th style={th(true)}>TOTAL</th>
            <th style={th(true)}>POSITIONAL GRADE</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub,i)=>{
            const m = marks[sub.code] || {theory:0,ia:0};
            const total = m.theory+m.ia;
            return (
              <tr key={sub.code} style={{background:i%2===0?"#fff":"#f9f9f9"}}>
                <td style={td(false,true)}>{sub.code}</td>
                <td style={td(true)}>{sub.name}</td>
                <td style={td(false,true)}>{m.theory||""}</td>
                <td style={td(false,true)}>{m.ia||""}</td>
                <td style={td(true,true)}>{total||""}</td>
                <td style={{...td(true,true),color:"#1a56a0"}}>{total?getGrade(total):""}</td>
              </tr>
            );
          })}
          <tr style={{background:"#f0f0f0"}}>
            <td colSpan={3} style={{...td(true),fontSize:12}}>Result:</td>
            <td style={td()}></td>
            <td style={td(true,true)}>{totalObt||""}</td>
            <td style={td()}></td>
          </tr>
          <tr style={{background:"#f0f0f0"}}>
            <td colSpan={4} style={td()}></td>
            <td style={td(true,true)}>{pct?`${pct}%`:""}</td>
            <td style={td()}></td>
          </tr>
        </tbody>
      </table>
      <CoScholastic scale="8"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:10}}>
        <GradeScaleTable/>
        <div style={{paddingTop:80}}>
          <div style={{fontSize:12,marginBottom:8}}><strong>PROMOTED TO CLASS:</strong><span style={{display:"inline-block",minWidth:140,borderBottom:"1px solid #333"}}></span></div>
        </div>
      </div>
      <Signatures912/>
    </div>
  );
}

// ─── Class & Named Section lists ─────────────────────────────────────────────
const ALL_CLASSES = [
  "Nursery","KG1","KG2",
  "Class 1","Class 2","Class 3","Class 4","Class 5",
  "Class 6","Class 7","Class 8",
  "Class 9","Class 10",
  "Class 11","Class 12",
];

const CLASS_SECTIONS: Record<string, string[]> = {
  "Nursery":  ["TINY CHAMPIONS","BRIGHTER RAINBOW","SHINING STARS","MORNING SUNBEAMS"],
  "KG1":      ["APPLE","PEAR","MANGO","PINE APPLE"],
  "KG2":      ["TULIP","ROSE","LOTUS"],
  "Class 1":  ["ZINCRON","CORAL","SAPPHIRE","OPAL","TOPAZ","STUD"],
  "Class 2":  ["BHAI DAYALA JI","BHAGAT PURAN","BHAI NAND LAL JI","BHAI VEER SINGH JI","BHAI KANHAIYA JI","DR. INDERJIT KAUR"],
  "Class 3":  ["BHAI RANDHIR SINGH JI","RIPUDAMAN SINGH JI","BHAI KAHAN SINGH JI","BABA GURDITT SINGH JI","CAPTAIN MOHAN SINGH JI"],
  "Class 4":  ["MAHARAJA KHARAK SINGH JI","MATA RAJ KAUR JI","SR. CHARAT SINGH JI","S. SHER SINGH JI"],
  "Class 5":  ["DR. DIWAN SINGH KALEPANI","BHAI KISHAN SINGH JI","SR. KARTAR SINGH SARABHA","SHAHEED BHAGAT SINGH JI","SHAHEED UDHAM SINGH JI"],
  "Class 6":  ["BHAI PARTAP SINGH JI","BABA BANDA SINGH BAHADUR JI","GIANI DITT SINGH JI","BHAI BACHITTAR SINGH JI","BHAI JIWAN SINGH JI"],
  "Class 7":  ["C.V. RAMAN","SUNITA WILLIAM","KALPANA CHAWLA","BACHENDRI PAL","NEIL ARMSTRONG"],
  "Class 8":  ["BHAI MANI SINGH JI","BHAI MATI DASS JI","BHAI SATI DASS JI","BHAI TARU SINGH JI"],
  "Class 9":  ["MATA BHAG KAUR JI","BHAI NIBAHU SINGH JI","BHAI SUBEG SINGH JI","BHAI SEHWAJ SINGH JI","BHAI BAGHEL SINGH JI"],
  "Class 10": ["BHAI DAYA SINGH JI","BHAI DHARAM SINGH JI","BHAI SAHIB SINGH JI","BHAI MOHKAM SINGH JI","BHAI HIMMAT SINGH JI"],
  "Class 11": ["MAHARAJA RANJIT SINGH JI (Science)","MAHARAJA DULEEP SINGH JI (Commerce)","SHAM SINGH ATTARI (Arts)"],
  "Class 12": ["SARDAR HARI SINGH NALWA JI (Science)","BABA DEEP SINGH JI (Commerce)","SARDAR JASSA SINGH RAMGARHIA (Arts+Com)","NAWAB KAPOOR SINGH JI (Arts)"],
};

// Auto-detect stream from Class 11/12 section name
function getStreamFromSection(section: string): string {
  const s = section.toLowerCase();
  if (s.includes("science"))           return "Science (PCB)";
  if (s.includes("commerce"))          return "Commerce";
  if (s.includes("arts+com"))          return "Commerce";
  if (s.includes("arts"))              return "Arts";
  return "Science (PCB)";
}

// Determine which report card tab to use based on class
function getTabForClass(cls: string): "35"|"68"|"910"|"1112" {
  if (["Class 9","Class 10"].includes(cls)) return "910";
  if (["Class 11","Class 12"].includes(cls)) return "1112";
  if (["Class 6","Class 7","Class 8"].includes(cls)) return "68";
  return "35"; // Nursery, KG1, KG2, Class 1-5
}

// Convert a DB student record → report card student object
function buildStudentData(dbStudent: any, extraGrades?: any) {
  const dob = dbStudent.dateOfBirth
    ? new Date(dbStudent.dateOfBirth).toLocaleDateString("en-IN")
    : "";
  return {
    roll: dbStudent.rollNumber || dbStudent.admissionNo || "",
    name: dbStudent.name || "",
    father: dbStudent.fatherName || "",
    mother: dbStudent.motherName || "",
    dob,
    class: `${dbStudent.class || ""} ${dbStudent.section || ""}`,
    address: dbStudent.address || dbStudent.village || "",
    village: dbStudent.village || dbStudent.address || "",
    stream: dbStudent.stream || "Science (PCB)",
    // Grade data (populated after grade import)
    ...(extraGrades || {}),
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GradesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Tab & stream
  const [tab, setTab] = useState<"35"|"68"|"910"|"1112">("35");
  const [stream, setStream] = useState("Science (PCB)");

  // Import modal
  const [showImport, setShowImport] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [examName, setExamName] = useState("Midterm 2025-26");

  // ── Exam & Session state ───────────────────────────────────────────────────
  const [selExamType, setSelExamType] = useState("YEARLY EXAMINATION");
  const [selSession,  setSelSession]  = useState("2025-26");

  // ── Student Selector state ──────────────────────────────────────────────────
  const [selClass,   setSelClass]   = useState("");
  const [selSection, setSelSection] = useState("");
  const [selStudent, setSelStudent] = useState("");
  const [students,   setStudents]   = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [activeStudent, setActiveStudent] = useState<any>(null); // student shown in RC

  // Fetch students when class + section are selected
  useEffect(() => {
    if (!selClass || !selSection) { setStudents([]); setSelStudent(""); setActiveStudent(null); return; }
    setLoadingStudents(true);
    setSelStudent("");
    setActiveStudent(null);
    fetch(`/api/students?class=${encodeURIComponent(selClass)}&section=${encodeURIComponent(selSection)}`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.students || []);
        setStudents(list);
      })
      .catch(() => setStudents([]))
      .finally(() => setLoadingStudents(false));
  }, [selClass, selSection]);

  // When class changes, auto-switch the report card tab
  useEffect(() => {
    if (selClass) setTab(getTabForClass(selClass));
  }, [selClass]);

  // When student is selected, build their data for the report card
  const handleStudentSelect = async (studentId: string) => {
    setSelStudent(studentId);
    if (!studentId) { setActiveStudent(null); return; }
    const found = students.find(s => s.id === studentId);
    if (!found) return;
    // Optionally fetch grades for this student (if your grade API supports it)
    let grades = {};
    try {
      const gRes = await fetch(`/api/grades?studentId=${studentId}`);
      if (gRes.ok) grades = await gRes.json();
    } catch { /* grades stay empty */ }
    setActiveStudent(buildStudentData(found, grades));
  };

  const handlePrint = () => {
    if (!activeStudent) {
      alert("Please select a student first!");
      return;
    }
    window.print();
  };

  const handleGradeImport = async (file: File) => {
    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("examName", examName);
    try {
      const res = await fetch("/api/grades/import", { method:"POST", body:formData });
      const data = await res.json();
      setImportResult(data);
    } catch { alert("Import failed!"); }
    setImporting(false);
  };

  if (status==="loading") return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:18,color:"#059669"}}>⏳ Loading...</div>;
  if (!session) { router.push("/"); return null; }

  const sample1112 = {roll:1,name:"Priya Sharma",father:"Mr. Raj Sharma",dob:"15.06.2008",mother:"Mrs. Meena Sharma",village:"Narmana",class:"11th Maharaja Ranjit Singh Ji (Science)",stream,marks:{"301":{theory:72,ia:18},"044":{theory:68,ia:17},"042":{theory:65,ia:16},"043":{theory:62,ia:17},"083":{theory:75,ia:19},"048":{theory:70,ia:18},"041":{theory:78,ia:19}}};

  // Decide what to render in the report card
  const rc35Data   = activeStudent || {roll:"",name:"",father:"",dob:"",class:"",address:""};
  const rc68Data   = activeStudent || {roll:"",name:"",father:"",dob:"",class:"",address:""};
  const rc910Data  = activeStudent || {roll:"",name:"",father:"",dob:"",class:"",mother:"",village:""};
  const rc1112Data = activeStudent ? {...activeStudent, stream} : {...sample1112, stream};

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",display:"flex",height:"100vh",background:"#f0fdf4",overflow:"hidden"}}>
      {/* ── Sidebar ── */}
      <aside style={{width:240,minWidth:240,background:"linear-gradient(170deg,#064e3b,#065f46)",display:"flex",flexDirection:"column",boxShadow:"4px 0 24px rgba(0,0,0,0.18)",zIndex:10}}>
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
          ].map(n=>(
            <Link key={n.label} href={n.href} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 11px",borderRadius:10,marginBottom:3,color:n.label==="Grades"?"#fff":"#6ee7b7",fontWeight:n.label==="Grades"?700:400,fontSize:13,textDecoration:"none",background:n.label==="Grades"?"linear-gradient(90deg,#059669,#064e3b)":"transparent"}}>
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

      {/* ── Main Content ── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Header */}
        <header style={{background:"#fff",padding:"0 24px",height:62,display:"flex",alignItems:"center",gap:10,borderBottom:"2px solid #d1fae5"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:17,fontWeight:800,color:"#064e3b"}}>📊 Grades & Report Cards</div>
            <div style={{fontSize:10.5,color:"#9ca3af"}}>CBSE Pattern — Session 2025-26</div>
          </div>
          <button onClick={()=>setShowImport(true)} style={{background:"#f0fdf4",color:"#059669",border:"1.5px solid #059669",borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",marginRight:8}}>📤 Import Grades</button>
          <button onClick={handlePrint} style={{background:"linear-gradient(90deg,#c00000,#8b0000)",color:"#fff",border:"none",borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🖨 Print Report Card</button>
        </header>

        <main style={{flex:1,overflowY:"auto",padding:22}}>

          {/* ── Student Selector Card ── */}
          <div style={{background:"#fff",borderRadius:14,padding:"16px 20px",marginBottom:16,boxShadow:"0 1px 6px rgba(0,0,0,0.07)",border:"1.5px solid #d1fae5"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#064e3b",marginBottom:12}}>🎓 Select Student for Report Card</div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>

              {/* Exam Type */}
              <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:180}}>
                <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>📝 Examination</label>
                <select
                  value={selExamType}
                  onChange={e=>setSelExamType(e.target.value)}
                  style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",color:"#064e3b",background:"#f0fdf4",fontWeight:600,cursor:"pointer"}}
                >
                  <option value="YEARLY EXAMINATION">Yearly Examination</option>
                  <option value="HALF YEARLY EXAMINATION">Half Yearly Examination</option>
                  <option value="FIRST TERM EXAMINATION">First Term Examination</option>
                  <option value="SECOND TERM EXAMINATION">Second Term Examination</option>
                  <option value="UNIT TEST">Unit Test</option>
                </select>
              </div>

              {/* Session */}
              <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:130}}>
                <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>📅 Session</label>
                <select
                  value={selSession}
                  onChange={e=>setSelSession(e.target.value)}
                  style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",color:"#064e3b",background:"#f0fdf4",fontWeight:600,cursor:"pointer"}}
                >
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2026-27">2026-27</option>
                  <option value="2027-28">2027-28</option>
                </select>
              </div>

              {/* Class */}
              <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:150}}>
                <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>📚 Class</label>
                <select
                  value={selClass}
                  onChange={e=>{setSelClass(e.target.value);setSelSection("");}}
                  style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",color:"#064e3b",background:"#f0fdf4",fontWeight:600,cursor:"pointer"}}
                >
                  <option value="">-- Select Class --</option>
                  {ALL_CLASSES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Section */}
              <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:220}}>
                <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>🏷 Section</label>
                <select
                  value={selSection}
                  onChange={e=>{
                    setSelSection(e.target.value);
                    if (selClass==="Class 11"||selClass==="Class 12") {
                      setStream(getStreamFromSection(e.target.value));
                    }
                  }}
                  disabled={!selClass}
                  style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:12,outline:"none",color:selClass?"#064e3b":"#9ca3af",background:selClass?"#f0fdf4":"#f9fafb",fontWeight:600,cursor:selClass?"pointer":"not-allowed"}}
                >
                  <option value="">-- Select Section --</option>
                  {(CLASS_SECTIONS[selClass]||[]).map(sec=>(
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              {/* Student */}
              <div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:200}}>
                <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>
                  👤 Student {loadingStudents && <span style={{color:"#059669"}}>⏳ Loading...</span>}
                </label>
                <select
                  value={selStudent}
                  onChange={e=>handleStudentSelect(e.target.value)}
                  disabled={!selSection || loadingStudents}
                  style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",color:selSection?"#064e3b":"#9ca3af",background:selSection?"#f0fdf4":"#f9fafb",fontWeight:600,cursor:selSection?"pointer":"not-allowed"}}
                >
                  <option value="">-- Select Student --</option>
                  {students.length === 0 && selSection && !loadingStudents && (
                    <option disabled>No students found</option>
                  )}
                  {students.map(s=>(
                    <option key={s.id} value={s.id}>
                      {s.rollNumber ? `[${s.rollNumber}] ` : ""}{s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Print Button */}
              <button
                onClick={handlePrint}
                disabled={!activeStudent}
                style={{padding:"8px 20px",borderRadius:8,border:"none",background:activeStudent?"linear-gradient(90deg,#c00000,#8b0000)":"#e5e7eb",color:activeStudent?"#fff":"#9ca3af",fontWeight:700,fontSize:13,cursor:activeStudent?"pointer":"not-allowed",whiteSpace:"nowrap",height:38}}
              >
                🖨 Print
              </button>

              {/* Clear Button */}
              {activeStudent && (
                <button
                  onClick={()=>{setSelClass("");setSelSection("");setSelStudent("");setActiveStudent(null);setStudents([]);}}
                  style={{padding:"8px 14px",borderRadius:8,border:"1.5px solid #fee2e2",background:"#fee2e2",color:"#dc2626",fontWeight:700,fontSize:12,cursor:"pointer",height:38}}
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Selected Student Info Badge */}
            {activeStudent && (
              <div style={{marginTop:12,padding:"10px 14px",background:"#d1fae5",borderRadius:10,display:"flex",gap:20,flexWrap:"wrap"}}>
                <span style={{fontSize:12,fontWeight:700,color:"#064e3b"}}>✅ Selected:</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Name:</strong> {activeStudent.name}</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Father:</strong> {activeStudent.father}</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Class:</strong> {selClass} – {selSection}</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Roll:</strong> {activeStudent.roll||"—"}</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Exam:</strong> {selExamType}</span>
                <span style={{fontSize:12,color:"#065f46"}}><strong>Session:</strong> {selSession}</span>
              </div>
            )}

            {/* No students found message */}
            {selSection && !loadingStudents && students.length === 0 && (
              <div style={{marginTop:10,padding:"8px 14px",background:"#fef3c7",borderRadius:8,fontSize:12,color:"#92400e"}}>
                ⚠️ No students found in {selClass} – Section {selSection}. Please check the Students page.
              </div>
            )}
          </div>

          {/* ── Report Card Tabs ── */}
          <div style={{display:"flex",gap:8,marginBottom:20,background:"#fff",borderRadius:14,padding:"12px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <span style={{fontSize:13,fontWeight:700,color:"#064e3b",alignSelf:"center",marginRight:4}}>Report Card:</span>
            {[
              {id:"35",   label:"Class 3–5",   sub:"Primary"},
              {id:"68",   label:"Class 6–8",   sub:"Middle"},
              {id:"910",  label:"Class 9–10",  sub:"Secondary"},
              {id:"1112", label:"Class 11–12", sub:"Sr. Secondary"},
            ].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id as any)} style={{padding:"8px 16px",borderRadius:10,border:`1.5px solid ${tab===t.id?"#c00000":"#e5e7eb"}`,background:tab===t.id?"#fee2e2":"#fff",color:tab===t.id?"#c00000":"#6b7280",cursor:"pointer",fontWeight:700,fontSize:12}}>
                {t.label}<div style={{fontSize:9,opacity:0.7}}>{t.sub}</div>
              </button>
            ))}
            {tab==="1112" && (
              <select value={stream} onChange={e=>setStream(e.target.value)} style={{marginLeft:"auto",padding:"7px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",color:"#064e3b",fontWeight:600}}>
                <option>Science (PCB)</option>
                <option>Science (PCM)</option>
                <option>Commerce</option>
                <option>Arts</option>
              </select>
            )}
          </div>

          {/* ── Report Card Preview ── */}
          <div className="report-card" style={{maxWidth:780,margin:"0 auto"}}>
            {!activeStudent && (
              <div style={{textAlign:"center",padding:"32px 20px",background:"#fff",borderRadius:14,border:"2px dashed #d1fae5",color:"#6b7280",marginBottom:16}}>
                <div style={{fontSize:36,marginBottom:8}}>👆</div>
                <div style={{fontSize:14,fontWeight:700,color:"#064e3b",marginBottom:4}}>Select a student above to preview their report card</div>
                <div style={{fontSize:12,color:"#9ca3af"}}>Choose Class → Section → Student, then click Print</div>
              </div>
            )}
            {tab==="35"   && <RC_35   s={rc35Data}  examType={selExamType} session={selSession}/>}
            {tab==="68"   && <RC_68   s={rc68Data}  examType={selExamType} session={selSession}/>}
            {tab==="910"  && <RC_910  s={rc910Data} examType={selExamType} session={selSession}/>}
            {tab==="1112" && <RC_1112 s={rc1112Data} examType={selExamType} session={selSession}/>}
          </div>
        </main>
      </div>

      {/* ── Import Modal ── */}
      {showImport && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#fff",borderRadius:20,padding:32,width:520,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:"#064e3b"}}>📤 Import Grades from Excel</div>
              <button onClick={()=>{setShowImport(false);setImportResult(null);}} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"4px 10px",color:"#dc2626",fontWeight:700,cursor:"pointer",fontSize:16}}>✕</button>
            </div>
            {!importResult ? (
              <div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:700,color:"#064e3b",display:"block",marginBottom:6}}>Exam Name:</label>
                  <input value={examName} onChange={e=>setExamName(e.target.value)} style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1.5px solid #d1fae5",fontSize:13,outline:"none",boxSizing:"border-box" as "border-box"}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,fontWeight:700,color:"#064e3b",display:"block",marginBottom:6}}>📥 Download Template:</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {[
                      {label:"Class 3-5",val:"35"},
                      {label:"Class 6-8",val:"68"},
                      {label:"Class 9-10",val:"910"},
                      {label:"11-12 PCB",val:"1112_science_pcb"},
                      {label:"11-12 PCM",val:"1112_science_pcm"},
                      {label:"11-12 Commerce",val:"1112_commerce"},
                      {label:"11-12 Arts",val:"1112_arts"},
                    ].map(t=>(
                      <a key={t.val} href={`/api/grades/template?class=${t.val}`} download style={{background:"#d1fae5",color:"#059669",border:"1px solid #059669",borderRadius:8,padding:"6px 12px",fontSize:11.5,fontWeight:700,textDecoration:"none"}}>
                        📥 {t.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{background:"#f0fdf4",borderRadius:10,padding:"12px 14px",marginBottom:14,border:"1px solid #d1fae5",fontSize:12,color:"#374151",lineHeight:1.8}}>
                  <strong style={{color:"#064e3b"}}>📋 Instructions:</strong><br/>
                  1. Download template for your class group<br/>
                  2. Fill Admission No (must match exactly)<br/>
                  3. Enter marks out of 100 for each subject<br/>
                  4. Upload the filled file below
                </div>
                <div style={{border:"2px dashed #d1fae5",borderRadius:12,padding:"20px",textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:13,color:"#6b7280",marginBottom:10}}>Select your filled Excel grades file</div>
                  <input type="file" accept=".xlsx,.xls" onChange={e=>{const f=e.target.files?.[0];if(f) handleGradeImport(f);}} style={{fontSize:13}}/>
                </div>
                {importing && <div style={{textAlign:"center",color:"#059669",fontWeight:700,fontSize:13}}>⏳ Importing grades... please wait</div>}
              </div>
            ) : (
              <div>
                <div style={{background:importResult.failed===0?"#d1fae5":"#fef3c7",borderRadius:10,padding:"14px 16px",marginBottom:14}}>
                  <div style={{fontSize:14,fontWeight:800,color:importResult.failed===0?"#059669":"#d97706"}}>{importResult.message}</div>
                </div>
                {importResult.errors?.length>0 && (
                  <div style={{background:"#fee2e2",borderRadius:10,padding:"12px",marginBottom:12}}>
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
  );
}
