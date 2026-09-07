"use client";
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const data = [
  { m: "Jan", r: 42, o: 38 }, { m: "Feb", r: 44, o: 36 },
  { m: "Mar", r: 48, o: 35 }, { m: "Apr", r: 46, o: 37 },
  { m: "May", r: 51, o: 33 }, { m: "Jun", r: 49, o: 34 },
];

export default function Home(){
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"login"|"register">("register");
  const [user, setUser] = useState<any>(null);
  useEffect(()=>{ const s=localStorage.getItem("pt_session"); if(s) setUser(JSON.parse(s)); },[]);

  return (
    <main className="min-h-screen bg-[#060608] text-white antialiased">
      <nav className="sticky top-0 z-40 border-b border-white/[0.07] bg-black/60 backdrop-blur-2xl">
        <div className="mx-auto max-w-[1300px] px-6 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white text-black font-black grid place-items-center">K</div>
            <b className="tracking-tighter">POLITICAL TRACKER <span className="text-white/30">KE</span></b>
            <span className="hidden md:inline ml-3 text-[10px] tracking-[0.2em] border border-white/10 px-2.5 py-1 rounded-full text-white/50">LIVE • 2027 ELECTION</span>
          </div>
          <div className="flex gap-2">
            <a href="https://github.com/applepayglobalagencies-source/political-tracker" className="hidden md:grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-white/10">↗</a>
            {user? <a href="/dashboard" className="h-10 px-6 grid place-items-center bg-white text-black rounded-full font-bold text-sm">Dashboard</a> : <button onClick={()=>setOpen(true)} className="h-10 px-6 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200">Sign In</button>}
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-[1300px] px-6 pt-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12">
        <div>
          <h1 className="text-[56px] md:text-[84px] leading-[0.85] tracking-[-0.05em] font-black">Track power.<br/><span className="text-white/20">Before it shifts.</span></h1>
          <p className="mt-6 text-[18px] leading-8 text-white/50 max-w-[560px]">Built for Kenyan politicians, campaign strategists & media. Real-time approval, county heatmaps, and sentiment analysis — deployed on Vercel.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={()=>{setMode("register"); setOpen(true)}} className="h-[48px] px-8 rounded-full bg-white text-black font-bold">Register as Politician →</button>
            <a href="#live" className="h-[48px] px-8 rounded-full bg-white/[0.08] border border-white/10 grid place-items-center font-bold">View Live Data</a>
          </div>
          <div className="mt-12 grid grid-cols-3 max-w-[420px] border-t border-white/10 pt-6">
            <div><p className="text-2xl font-bold">12k+</p><p className="text-xs text-white/40 tracking-widest uppercase">Users</p></div>
            <div><p className="text-2xl font-bold">47</p><p className="text-xs text-white/40 tracking-widest uppercase">Counties</p></div>
            <div><p className="text-2xl font-bold">4.9★</p><p className="text-xs text-white/40 tracking-widest uppercase">Trust</p></div>
          </div>
        </div>

        <div id="live" className="relative">
          <div className="absolute -inset-20 bg-white/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="relative rounded-[32px] bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/[0.12] p-2 backdrop-blur-xl">
            <div className="rounded-[24px] bg-[#0c0c0e] border border-white/[0.06] p-6">
              <div className="flex justify-between items-center mb-4"><span className="text-xs tracking-widest text-white/40 font-bold">NATIONAL APPROVAL</span><span className="text-xs bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">● LIVE</span></div>
              <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff" stopOpacity={0.4}/><stop offset="100%" stopColor="#fff" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" hide/><YAxis hide/><Tooltip contentStyle={{background:"#151517", border:"1px solid #222", borderRadius:16}}/><Area dataKey="r" stroke="#fff" strokeWidth={3} fill="url(#grad)" /><Area dataKey="o" stroke="#ffffff30" strokeWidth={2} fill="transparent" strokeDasharray="6 6"/></AreaChart></ResponsiveContainer></div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white text-black p-4"><p className="text-[10px] opacity-60 tracking-widest">RUTO</p><p className="text-2xl font-black">49.2%</p><p className="text-xs text-emerald-600 font-bold">↑ 2.4% this week</p></div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><p className="text-[10px] opacity-60 tracking-widest">ODM</p><p className="text-2xl font-black">34.1%</p><p className="text-xs text-red-400 font-bold">↓ 1.1%</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-6 mt-20 pb-24">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-[28px] bg-white/[0.04] border border-white/[0.08] p-7">
            <h3 className="font-bold mb-6">Momentum (6 months)</h3>
            <div className="h-[340px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid stroke="#ffffff08" vertical={false}/><XAxis dataKey="m" stroke="#fff5" fontSize={12} axisLine={false} tickLine={false}/><YAxis stroke="#fff5" fontSize={12} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#111", border:"1px solid #222", borderRadius:16}}/><Line dataKey="r" type="monotone" stroke="#fff" strokeWidth={3} dot={false}/><Line dataKey="o" type="monotone" stroke="#ef4444" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></div>
          </div>
          <div className="rounded-[28px] bg-[#101012] border border-white/[0.08] p-7 flex flex-col justify-between">
            <div><h3 className="font-black text-xl leading-tight">Claim your politician profile</h3><p className="text-white/40 text-sm mt-3 leading-6">Get verified, publish statements, respond to tracking, and access your private county breakdown.</p></div>
            <div className="mt-8 space-y-3"><button onClick={()=>{setMode("register"); setOpen(true)}} className="w-full h-12 rounded-full bg-white text-black font-bold">Create Account</button><button onClick={()=>{setMode("login"); setOpen(true)}} className="w-full h-12 rounded-full bg-white/5 border border-white/10 font-bold">Login</button><p className="text-center text-[11px] text-white/30 mt-4 tracking-widest">SECURED BY VERCEL • NEXT.JS 16.3.4</p></div>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl grid place-items-center p-5">
          <div className="w-full max-w-[420px] rounded-[28px] bg-[#131315] border border-white/10 p-8 shadow-2xl">
            <div className="flex justify-between"><h2 className="text-2xl font-black tracking-tighter">{mode==="register"? "Create account":"Welcome back"}</h2><button onClick={()=>setOpen(false)} className="h-8 w-8 grid place-items-center rounded-full bg-white/5">✕</button></div>
            <form onSubmit={(e:any)=>{e.preventDefault(); const d=new FormData(e.target); const name=d.get("name")||"Hon. Member"; const email=d.get("email"); localStorage.setItem("pt_session", JSON.stringify({name,email})); location.href="/dashboard";}} className="mt-8 space-y-3">
              {mode==="register" && <input name="name" required placeholder="Full Name (e.g Hon. John Doe)" className="w-full h-12 px-5 rounded-full bg-white/[0.06] border border-white/10 outline-none focus:border-white/20"/>}
              <input name="email" required type="email" placeholder="Email" className="w-full h-12 px-5 rounded-full bg-white/[0.06] border border-white/10 outline-none"/>
              <input name="password" required type="password" placeholder="Password" className="w-full h-12 px-5 rounded-full bg-white/[0.06] border border-white/10 outline-none"/>
              <button className="w-full h-12 rounded-full bg-white text-black font-bold mt-2">{mode==="register"? "Create & Continue →":"Login"}</button>
            </form>
            <button onClick={()=>setMode(mode==="login"?"register":"login")} className="w-full text-sm text-white/40 mt-6">{mode==="login"? "No account? Create one":"Have account? Login"}</button>
          </div>
        </div>
      )}
    </main>
  )
}