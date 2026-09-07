"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register(){
  const router=useRouter();
  return (
    <main className="min-h-screen bg-[#060608] grid lg:grid-cols-2">
      <div className="p-8 lg:p-16 flex flex-col justify-between">
        <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-white text-black font-black grid place-items-center">K</div><b className="tracking-tighter text-white">POLITICAL TRACKER KE</b><span className="text-[10px] border border-white/10 px-2 py-0.5 rounded-full text-white/40 ml-2">POLITICIAN ACCESS</span></div>
        <div className="max-w-[440px] w-full mx-auto">
          <h1 className="text-[44px] font-black tracking-tighter leading-[0.9] text-white">Claim your<br/><span className="text-white/20">profile.</span></h1>
          <p className="text-white/40 mt-4 leading-6">Join 12k+ politicians & journalists tracking 47 counties in real-time.</p>
          <form onSubmit={(e:any)=>{e.preventDefault(); const d=new FormData(e.target); const name=d.get("name"); const email=d.get("email"); const password=d.get("password"); const users=JSON.parse(localStorage.getItem("pt_users")||"[]"); if(users.find((u:any)=>u.email===email)) return alert("Email exists, please login"); users.push({name,email,password}); localStorage.setItem("pt_users", JSON.stringify(users)); localStorage.setItem("pt_session", JSON.stringify({name,email})); router.push("/dashboard");}} className="mt-10 space-y-3">
            <input name="name" required placeholder="Full Name (Hon....)" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none placeholder:text-white/30" />
            <select name="role" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none"><option className="bg-black">Politician / MP / MCA</option><option className="bg-black">Campaign Team</option><option className="bg-black">Journalist / Media</option><option className="bg-black">Analyst</option></select>
            <input name="email" required type="email" placeholder="Official Email" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none placeholder:text-white/30" />
            <input name="password" required type="password" placeholder="Create Password" className="w-full h-[52px] px-6 rounded-full bg-white/[0.06] border border-white/10 text-white outline-none placeholder:text-white/30" />
            <button className="w-full h-[52px] rounded-full bg-white text-black font-bold mt-2">Create Account & Go to Dashboard →</button>
            <p className="text-[11px] text-white/30 text-center leading-4">By creating account you agree to verification. Profiles are reviewed within 24h.</p>
          </form>
          <p className="text-white/40 text-sm mt-6 text-center">Have account? <a href="/login" className="text-white font-bold underline">Login</a></p>
        </div>
        <p className="text-[11px] tracking-widest text-white/20">TRUSTED BY NATION MEDIA • THE STAR • CITIZEN</p>
      </div>
      <div className="hidden lg:block bg-[#0a0a0c] border-l border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
        <div className="relative h-full grid place-items-center p-12"><div className="w-full max-w-[380px] rounded-[32px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-2 backdrop-blur-2xl"><div className="rounded-[24px] bg-[#0f0f11] p-6 border border-white/5"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-white"/><div><p className="font-bold text-white text-sm">Hon. Aisha M.</p><p className="text-xs text-white/40">Mombasa • Verified Politician</p></div><span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">VERIFIED</span></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="bg-white rounded-2xl p-4 text-black"><p className="text-[10px] opacity-60">APPROVAL</p><p className="font-black text-xl">72%</p></div><div className="bg-white/5 border border-white/10 rounded-2xl p-4"><p className="text-[10px] opacity-60 text-white">MENTIONS</p><p className="font-black text-xl text-white">1.2k</p></div></div></div></div></div>
      </div>
    </main>
  )
}