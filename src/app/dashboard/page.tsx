"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [{d:1,v:40},{d:2,v:44},{d:3,v:42},{d:4,v:49},{d:5,v:51},{d:6,v:48}];

export default function Dashboard(){
  const [user,setUser]=useState<any>(null);
  const router=useRouter();
  useEffect(()=>{ const s=localStorage.getItem("pt_session"); if(!s) router.push("/login"); else setUser(JSON.parse(s)); },[]);
  if(!user) return null;
  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <nav className="h-[64px] border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 max-w-[1300px] mx-auto">
        <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-white text-black font-black grid place-items-center">K</div><span className="font-bold tracking-tighter">DASHBOARD</span><span className="text-white/20 text-sm">/ {user.name}</span></div>
        <div className="flex gap-2"><a href="/" className="h-9 px-4 grid place-items-center rounded-full bg-white/5 border border-white/10 text-sm">Live Site</a><button onClick={()=>{localStorage.removeItem("pt_session"); router.push("/");}} className="h-9 px-4 rounded-full bg-white text-black font-bold text-sm">Logout</button></div>
      </nav>

      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <h1 className="text-[40px] font-black tracking-tighter leading-none">Hi, {user.name?.split(" ")[0]} 👋<br/><span className="text-white/20">Your county is trending.</span></h1>

        <div className="grid lg:grid-cols-3 gap-4 mt-10">
          <div className="rounded-[24px] bg-white text-black p-6"><p className="text-[11px] tracking-widest opacity-60">APPROVAL SCORE</p><p className="text-4xl font-black mt-2">49.2%</p><div className="h-[80px] mt-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><Tooltip contentStyle={{background:"#111",border:"1px solid #222",borderRadius:12}}/><Area dataKey="v" stroke="#000" strokeWidth={2.5} fill="black" fillOpacity={0.08} /></AreaChart></ResponsiveContainer></div></div>
          <div className="rounded-[24px] bg-white/[0.05] border border-white/10 p-6"><p className="text-[11px] tracking-widest text-white/40">MENTIONS TODAY</p><p className="text-4xl font-black mt-2">1,247</p><p className="text-sm text-emerald-400 mt-2">↑ 12% vs yesterday</p><div className="mt-6 flex gap-2 text-[11px]"><span className="px-2 py-1 rounded-full bg-white/10">#Ruto</span><span className="px-2 py-1 rounded-full bg-white/10">#FinanceBill</span></div></div>
          <div className="rounded-[24px] bg-[#101012] border border-white/10 p-6"><p className="text-[11px] tracking-widest text-white/40">VERIFICATION</p><p className="text-xl font-bold mt-2">✅ Verified Politician</p><p className="text-sm text-white/40 mt-2 leading-6">Your profile is visible on the public tracker. You can now publish statements.</p><button className="mt-6 w-full h-11 rounded-full bg-white/10 border border-white/10 font-bold text-sm">Publish Statement</button></div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="rounded-[24px] bg-white/[0.03] border border-white/[0.08] p-6"><h3 className="font-bold mb-6">County Breakdown • Your Strongholds</h3><div className="space-y-3">{[["Nairobi","68%","High"],["Mombasa","42%","Medium"],["Kisumu","21%","Low"],["Nakuru","74%","High"]].map(([c,p,s])=><div key={c} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06]"><span className="font-bold">{c}</span><span className="text-sm text-white/50">{s} • {p}</span><div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-white" style={{width:p as string}}/></div></div>)}</div></div>
          <div className="rounded-[24px] bg-[#0f0f11] border border-white/10 p-6"><h3 className="font-bold">Quick Actions</h3><div className="mt-6 space-y-3"><button className="w-full h-12 rounded-full bg-white text-black font-bold">Share Approval Card</button><button className="w-full h-12 rounded-full bg-white/5 border border-white/10 font-bold">Download Report PDF</button><button className="w-full h-12 rounded-full bg-white/5 border border-white/10 font-bold">Invite Campaign Team</button></div><p className="text-[11px] text-white/20 mt-8 text-center tracking-widest">political-trackers.vercel.app • LIVE</p></div>
        </div>
      </div>
    </main>
  )
}