"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin(){
  const [users,setUsers]=useState<any[]>([]);
  const [ok,setOk]=useState(false);
  const [p,setP]=useState("");
  const [q,setQ]=useState("");
  const [filter,setFilter]=useState("all");
  async function load(){ const {data}=await supabase.from("politicians").select("*").order("created_at",{ascending:false}); setUsers(data||[]); }
  useEffect(()=>{ if(ok) load(); },[ok]);

  function tierStyle(tier:string, verified:boolean){
    if(tier==="featured") return "border-[#FFD700]/40 bg-[#FFD700]/5 shadow-[0_0_20px_rgba(255,215,0,0.15)]";
    if(tier==="verified" || verified) return "border-white/20 bg-white/[0.06]";
    return "border-white/5 bg-[#121214] opacity-80";
  }
  function badge(tier:string, verified:boolean){
    if(tier==="featured") return <span className="text-[9px] px-2.5 py-1 rounded-full bg-[#FFD700] text-black font-black tracking-widest">FEATURED • KES 9,500</span>;
    if(tier==="verified") return <span className="text-[9px] px-2.5 py-1 rounded-full bg-white text-black font-black tracking-widest">VERIFIED • KES 4,500</span>;
    return <span className="text-[9px] px-2.5 py-1 rounded-full bg-white/10 text-white/40 font-bold tracking-widest border border-white/10">FREE</span>;
  }

  if(!ok) return (<main className="min-h-screen bg-black grid place-items-center p-6"><div className="w-[380px] rounded-[28px] bg-[#121214] border border-white/10 p-8 text-white"><h1 className="text-[24px] font-black">Admin</h1><input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="admin123" className="mt-6 w-full h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/><button onClick={()=>{ if(p==="admin123") setOk(true); else alert("wrong"); }} className="mt-4 w-full h-[56px] rounded-full bg-white text-black font-black">Unlock</button></div></main>);

  const filtered = users.filter(u => {
    const matchQ = (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase());
    const matchF = filter==="all" || u.tier===filter;
    return matchQ && matchF;
  });

  const stats = { all: users.length, free: users.filter(u=>u.tier==="free").length, verified: users.filter(u=>u.tier==="verified").length, featured: users.filter(u=>u.tier==="featured").length };

  return (
    <main className="min-h-screen bg-[#050507] text-white p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="px-5 h-10 rounded-full bg-white text-black grid place-items-center font-black text-sm">{stats.all} Total</div>
          <div className="px-5 h-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-sm text-white/50">{stats.free} FREE</div>
          <div className="px-5 h-10 rounded-full bg-white text-black grid place-items-center text-sm font-black">{stats.verified} VERIFIED 4.5k</div>
          <div className="px-5 h-10 rounded-full bg-[#FFD700] text-black grid place-items-center text-sm font-black shadow-[0_0_20px_rgba(255,215,0,0.3)]">{stats.featured} FEATURED 9.5k</div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-[40px] font-black tracking-tight">Politicians</h1>
          <div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="h-11 w-[260px] px-5 rounded-full bg-white/5 border border-white/10 outline-none"/><select value={filter} onChange={e=>setFilter(e.target.value)} className="h-11 px-4 rounded-full bg-white/5 border border-white/10"><option value="all" className="text-black">All Tiers</option><option value="featured" className="text-black">Featured Only</option><option value="verified" className="text-black">Verified Only</option><option value="free" className="text-black">Free Only</option></select><button onClick={load} className="h-11 px-6 rounded-full bg-white text-black font-black text-sm">Refresh</button></div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((u:any)=><div key={u.id} className={`rounded-[24px] border p-6 flex justify-between items-center transition ${tierStyle(u.tier,u.verified)}`}><div className="flex-1"><div className="flex items-center gap-3 flex-wrap"><div className="font-black text-[16px]">{u.name}</div>{badge(u.tier,u.verified)}{u.verified && <span className="text-[8px] px-2 py-1 rounded-full bg-green-500 text-white font-black">APPROVED</span>}</div><div className="text-[12px] text-white/50 mt-2">{u.county} • {u.party} • {u.role}</div><div className="text-[11px] text-white/30 mt-1">{u.email} • {u.phone} • {new Date(u.created_at).toLocaleDateString()}</div></div><div className="flex flex-col gap-2 ml-4"><button onClick={async()=>{ await supabase.from("politicians").update({verified:true}).eq("id",u.id); load(); }} className="h-8 px-4 rounded-full bg-white text-black font-black text-[11px]">Approve</button><button onClick={async()=>{ await supabase.from("politicians").delete().eq("id",u.id); if(confirm("Delete "+u.name+"?")) load(); }} className="h-8 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">Delete</button></div></div>)}
        </div>
      </div>
    </main>
  )
}