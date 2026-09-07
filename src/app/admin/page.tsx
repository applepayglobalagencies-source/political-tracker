"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin(){
  const [users,setUsers]=useState<any[]>([]);
  const [ok,setOk]=useState(false);
  const [p,setP]=useState("");
  const [q,setQ]=useState("");
  async function load(){ const {data}=await supabase.from("politicians").select("*").order("created_at",{ascending:false}); setUsers(data||[]); }
  useEffect(()=>{ if(ok) load(); },[ok]);
  if(!ok) return (<main className="min-h-screen bg-black grid place-items-center p-6"><div className="w-[380px] rounded-[28px] bg-[#121214] border border-white/10 p-8 text-white"><h1 className="text-[24px] font-black">Admin</h1><p className="text-white/40 text-sm mt-1">Supabase Live Dashboard</p><input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="admin123" className="mt-6 w-full h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/><button onClick={()=>{ if(p==="admin123") setOk(true); else alert("wrong password"); }} className="mt-4 w-full h-[56px] rounded-full bg-white text-black font-black">Unlock Dashboard</button></div></main>);
  const filtered = users.filter(u => (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase()));
  return (
    <main className="min-h-screen bg-[#050507] text-white p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end">
          <div><h1 className="text-[40px] font-black tracking-tight leading-none">{users.length} Politicians</h1><p className="text-white/40 mt-2 text-sm">Live from Supabase: dnpjffnyjveywyurhekh • {users.filter((u:any)=>u.verified).length} Verified</p></div>
          <div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search county, name..." className="h-11 w-[260px] px-5 rounded-full bg-white/5 border border-white/10 outline-none"/><button onClick={load} className="h-11 px-6 rounded-full bg-white text-black font-black text-sm">Refresh</button></div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((u:any)=><div key={u.id} className="rounded-[20px] bg-[#121214] border border-white/10 p-5 flex justify-between items-center"><div><div className="font-black text-[16px]">{u.name} {u.verified && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-white text-black">VERIFIED</span>}</div><div className="text-[12px] text-white/50 mt-1">{u.county} • {u.party} • {u.role} • {u.tier}</div><div className="text-[11px] text-white/30 mt-1">{u.email} • {u.phone}</div></div><div className="flex gap-2"><button onClick={async()=>{ await supabase.from("politicians").update({verified:true}).eq("id",u.id); load(); }} className="h-8 px-4 rounded-full bg-white text-black font-black text-[11px]">Approve</button><button onClick={async()=>{ await supabase.from("politicians").delete().eq("id",u.id); load(); }} className="h-8 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">Delete</button></div></div>)}
        </div>
      </div>
    </main>
  )
}