"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password!");
      return;
    }
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("❌ Wrong email or password!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background:"linear-gradient(135deg, #064e3b 0%, #065f46 100%)"}}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl" style={{background:"#d1fae5",border:"3px solid #059669"}}>
            🏫
          </div>
          <h1 className="text-2xl font-black" style={{color:"#064e3b"}}>Navneet Public Sr. Sec. School</h1>
          <p className="text-sm mt-1" style={{color:"#059669"}}>CBSE Affiliated — School Management System</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{background:"#fee2e2",border:"1.5px solid #dc2626",borderRadius:10,padding:"10px 14px",marginBottom:16,color:"#dc2626",fontWeight:600,fontSize:13}}>
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1" style={{color:"#064e3b"}}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 outline-none text-sm"
              style={{borderColor:"#d1fae5"}}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1" style={{color:"#064e3b"}}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              className="w-full px-4 py-3 rounded-xl border-2 outline-none text-sm"
              style={{borderColor:"#d1fae5"}}
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold text-sm mt-2"
            style={{background:loading?"#9ca3af":"linear-gradient(90deg,#059669,#064e3b)",cursor:loading?"not-allowed":"pointer"}}
          >
            {loading?"⏳ Logging in...":"Login to Dashboard"}
          </button>
        </div>

        {/* Roles */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            {role:"Admin",   icon:"👨‍💼", email:"admin@npss.edu"},
            {role:"Teacher", icon:"👩‍🏫", email:"teacher@npss.edu"},
            {role:"Parent",  icon:"👨‍👩‍👧", email:"parent@npss.edu"},
          ].map((r)=>(
            <div key={r.role} onClick={()=>setEmail(r.email)} className="text-center p-3 rounded-xl cursor-pointer" style={{background:"#f0fdf4",border:"1.5px solid #d1fae5"}}>
              <div className="text-2xl">{r.icon}</div>
              <div className="text-xs font-bold mt-1" style={{color:"#064e3b"}}>{r.role}</div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div style={{background:"#f0fdf4",borderRadius:10,padding:"10px 14px",marginTop:16,textAlign:"center"}}>
          <div style={{fontSize:11.5,color:"#059669",fontWeight:600}}>Demo Admin Login:</div>
          <div style={{fontSize:11,color:"#6b7280"}}>Email: admin@npss.edu</div>
          <div style={{fontSize:11,color:"#6b7280"}}>Password: Admin@2026</div>
        </div>

        <p className="text-center text-xs mt-6" style={{color:"#9ca3af"}}>
          © 2026 Navneet Public Sr. Sec. School
        </p>
      </div>
    </div>
  );
}