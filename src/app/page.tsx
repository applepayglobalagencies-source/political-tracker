"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const trend = [
  { d: 'Jan', Ruto: 42, Raila: 38, Gachagua: 22 },
  { d: 'Feb', Ruto: 44, Raila: 36, Gachagua: 24 },
  { d: 'Mar', Ruto: 48, Raila: 35, Gachagua: 26 },
  { d: 'Apr', Ruto: 46, Raila: 37, Gachagua: 23 },
  { d: 'May', Ruto: 51, Raila: 33, Gachagua: 28 },
  { d: 'Jun', Ruto: 49, Raila: 34, Gachagua: 27 },
];

export default function Page() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{ const s=localStorage.getItem("pt_session"); if(s) setUser(JSON.parse(s)); },[]);

  return (
    <main className="min-h-screen bg-[#050507] text-white selection:bg-white selection:text-black">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/50 backdrop-blur-2xl">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-white text-black grid place-items-center font-black">K</div><span className="font-bold tracking-tight">POLITICAL TRACKER <span className="text-white/40">KE</span></span><span className="ml-3 text-[10px] tracking-widest bg-white text-black px-2 py-0.5 rounded-full">LIVE</span></div>
          <div className="flex items-center gap-2">
            {user? <><span className="text-sm text-white/60">Hi, {user.name}</span><a href="/dashboard" className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">Dashboard</a></> : <button onClick={()=>{setAuthOpen(true); setIsLogin(false)}} className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition">Get Started</button>}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] px-3 py-1 rounded-full text-[11px] tracking-widest text-white/60 mb-6">🇰🇪 47 COUNTIES • REAL-TIME SENTIMENT • 2027 ELECTION TRACKER</div>
          <h1 className="text-[48px] md:text-[72px] font-[900] leading-[0.9] tracking-tighter">Know who’s <span className="text-white/20">winning.</span><br/>Before the ballot.</h1>
          <p className="text-[18px] leading-7 text-white/50 mt-6 max-w-[520px]">The professional OS for politicians, campaign teams and journalists. Track approval, county breakdown, and public sentiment in real-time.</p>
          <div className="flex gap-3 mt-8"><button onClick={()=>{setAuthOpen(true); setIsLogin(false)}} className="bg-white text-black px-7 h-12 rounded-full font-bold">Create Politician Account</button><a href="#charts" className="h-12 px-7 rounded-full bg-white/[0.08] border border-white/[0.12] grid place-items-center font-bold">View Live Data →</a></div>
          <div className="flex gap-6 mt-10 text-sm"><div><p className="text-2xl font-bold">12.4k+</p><p className="text-white/40">Active trackers</p></div><div className="h-10 w-px bg-white/10"/><div><p className="text-2xl font-bold">47</p><p className="text-white/40">Counties covered</p></div><div className="h-10 w-px bg-white/10"/><div><p className="text-2xl font-bold">99.9%</p><p className="text-white/40">Uptime on Vercel</p></div></div>
        </div>
        {/* GLASS CARD */}
        <div className="relative"><div className="absolute -inset-20 bg-gradient-to-br from-white/20 to-transparent blur-[80px] rounded-full"/><div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.12] backdrop-blur-xl rounded-[32px] p-3"><div className="bg-[#0a0a0b] rounded-[24px] p-6 border border-white/[0.06]"><div className="flex justify-between mb-6"><p className="text-sm font-bold tracking-widest text-white/60">APPROVAL TREND</p><span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">▲ Live</span></div><div className="h-[280px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff" stopOpacity={0.3}/><stop offset="100%" stopColor="#fff" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#ffffff0e" vertical={false}/><XAxis dataKey="d" stroke="#ffffff40" fontSize={11} axisLine={false} tickLine={false}/><YAxis stroke="#ffffff40" fontSize={11} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#111", border:"1px solid #222", borderRadius:12}}/><Area dataKey="Ruto" stroke="#fff" fill="url(#g)" strokeWidth={2.5}/><Line dataKey="Raila" stroke="#ffffff40" strokeDasharray="6 6" strokeWidth={2} dot={false}/></AreaChart></ResponsiveContainer></div><div className="grid grid-cols-3 gap-3 mt-6"><div className="bg-white text-black rounded-2xl p-4"><p className="text-[10px] tracking-widest opacity-60">RUTO</p><p className="text-xl font-black">49.2%</p></div><div className="bg-white/10 border border-white/10 rounded-2xl p-4"><p className="text-[10px] tracking-widest opacity-60">RAILA</p><p className="text-xl font-black">34.1%</p></div><div className="bg-white/5 border border-white/10 rounded-2xl p-4"><p className="text-[10px] tracking-widest opacity-60">UNDECIDED</p><p className="text-xl font-black">16.7%</p></div></div></div></div></div>
      </section>

      {/* CHARTS */}
      <section id="charts" className="max-w-[1280px] mx-auto px-6 pb-24"><div className="grid lg:grid-cols-3 gap-4"><div className="lg:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-6"><h3 className="font-bold mb-6">6-Month Momentum</h3><div className="h-[320px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="#ffffff0a" vertical={false}/><XAxis dataKey="d" stroke="#fff5" fontSize={12} axisLine={false} tickLine={false}/><YAxis stroke="#fff5" fontSize={12} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#0a0a0b", border:"1px solid #222", borderRadius:16}}/><Line dataKey="Ruto" stroke="#22c55e" strokeWidth={3} dot={false}/><Line dataKey="Raila" stroke="#ef4444" strokeWidth={3} dot={false}/><Line dataKey="Gachagua" stroke="#ffffff30" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></div><div className="bg-[#0f0f10] border border-white/[0.08] rounded-[24px] p-6"><h3 className="font-bold mb-2">Politician Login</h3><p className="text-sm text-white/40 mb-6">Register to claim your profile, publish statements, and view your county sentiment.</p><div className="space-y-3"><a href="/register" className="block text-center bg-white text-black rounded-full py-3 font-bold">Register as Politician</a><a href="/login" className="block text-center bg-white/10 border border-white/10 rounded-full py-3 font-bold">Login</a></div><div className="mt-8 p-4 bg-white/[0.04] rounded-2xl border border-white/[0.06]"><p className="text-xs text-white/40 tracking-widest">VERIFIED TODAY</p><div className="mt-3 space-y-2 text-sm"><p>• Hon. John K. — Nakuru</p><p>• Hon. Aisha M. — Mombasa</p><p>• Analyst: The Star</p></div></div></div></div></section>

      {/* AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl grid place-items-center p-6">
          <div className="w-full max-w-[420px] bg-[#121214] border border-white/10 rounded-[24px] p-8 shadow-2xl">
            <div className="flex justify-between mb-6"><h2 className="text-xl font-black">{isLogin? "Welcome back":"Create Politician Account"}</h2><button onClick={()=>setAuthOpen(false)} className="text-white/40">✕</button></div>
            <form onSubmit={(e:any)=>{e.preventDefault(); const f=new FormData(e.target); const name=f.get("name"); const email=f.get("email"); localStorage.setItem("pt_session", JSON.stringify({name:name||"Politician", email})); setUser({name:name||"Politician", email}); setAuthOpen(false); window.location.href="/dashboard";}} className="space-y-3">
              {!isLogin && <input name="name" placeholder="Full Name (Hon.)" required className="w-full bg-white/[0.06] border border-white/10 rounded-full px-5 py-3.5 outline-none focus:border-white/20"/>}
              <input name="email" placeholder="Email address" type="email" required className="w-full bg-white/[0.06] border border-white/10 rounded-full px-5 py-3.5 outline-none"/>
              <input name="password" placeholder="Password" type="password" required className="w-full bg-white/[0.06] border border-white/10 rounded-full px-5 py-3.5 outline-none"/>
              <button className="w-full bg-white text-black font-bold rounded-full py-3.5 mt-2">{isLogin? "Login":"Create Account & Go to Dashboard"}</button>
            </form>
            <button onClick={()=>setIsLogin(!isLogin)} className="w-full text-sm text-white/40 mt-4">{isLogin? "No account? Register":"Already have account? Login"}</button>
          </div>
        </div>
      )}
    </main>
  );
}