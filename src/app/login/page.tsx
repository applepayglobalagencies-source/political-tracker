"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  return (
    <main className="min-h-screen bg-[#060608] grid lg:grid-cols-2">
      <div className="p-8 lg:p-16 flex flex-col justify-between">
        <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-white text-black font-black grid place-items-center">K</div><b className="tracking-tighter text-white">POLITICAL TRACKER KE</b></div>
        <div className="max-w-[420px] w-full mx-auto">
          <h1 className="text-[44px] font-black tracking-tighter leading-[0.9] text-white">Welcome<br/><span className="text-white/20">back.</span></h1>
          <p className="text-white/40 mt-4">Login to access your private dashboard and county sentiment.</p>
          <form onSubmit={(e:any)=>{e.preventDefault(); setLoading(true); const d=new FormData(e.target); const email=d.get("email"); const users=JSON.parse(localStorage.getItem("pt_users")||"[]"); const u=users.find((x:any)=>x.email===email); if(!u) {alert("No account found. Please register."); setLoading(false); return;} localStorage.setItem("pt_session", JSON.stringify({name:u.name,email})); router.push("/dashboard");}} className="mt-10 space-y-3">
            <input name="email" required type="email" placeholder="Email address" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none focus:border-white/20 placeholder:text-white/30" />
            <input name="password" required type="password" placeholder="Password" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none focus:border-white/20 placeholder:text-white/30" />
            <button disabled={loading} className="w-full h-[52px] rounded-full bg-white text-black font-bold mt-4 disabled:opacity-50">{loading? "Signing in...":"Login →"}</button>
          </form>
          <p className="text-white/40 text-sm mt-6 text-center">No account? <a href="/register" className="text-white font-bold underline">Create one</a> • <a href="/" className="text-white/60">Home</a></p>
        </div>
        <p className="text-[11px] tracking-widest text-white/20">SECURED BY VERCEL • NEXT.JS 16.3.4</p>
      </div>
      <div className="hidden lg:grid place-items-center bg-[#0c0c0e] border-l border-white/[0.06] p-12 relative overflow-hidden">
        <div className="absolute -inset-40 bg-white/[0.06] blur-[100px] rounded-full" />
        <div className="relative w-full max-w-[420px] rounded-[28px] bg-white/[0.04] border border-white/10 p-3 backdrop-blur-xl">
          <div className="rounded-[20px] bg-black p-6 border border-white/10"><p className="text-xs tracking-widest text-white/40">LIVE PREVIEW</p><div className="mt-6 space-y-3"><div className="h-12 rounded-full bg-white text-black grid place-items-center font-bold">Hon. John K. — Verified ✓</div><div className="h-24 rounded-2xl bg-white/5 border border-white/10 p-4"><p className="text-xs text-white/40">Nakuru • Approval</p><p className="text-2xl font-black text-white">68.2% ↑</p></div></div></div>
        </div>
      </div>
    </main>
  )
}