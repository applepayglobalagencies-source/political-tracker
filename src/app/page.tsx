"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home(){
  const [users,setUsers]=useState<any[]>([]);
  const [q,setQ]=useState("");
  useEffect(()=>{ (async()=>{ const {data}=await supabase.from("politicians").select("*").order("created_at",{ascending:false}); setUsers(data||[]); })(); },[]);
  const featured = users.filter(u=>u.tier==="featured" && u.verified);
  const verified = users.filter(u=>u.tier==="verified" && u.verified);
  const free = users.filter(u=>u.tier==="free" ||!u.verified);
  const filtered = users.filter(u => (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <header className="max-w-[1200px] mx-auto px-8 py-6 flex justify-between items-center"><div className="font-black tracking-tight text-[18px]">POLITICAL TRACKER<span className="text-white/30">.KE</span></div><div className="flex gap-2"><Link href="/register" className="h-10 px-6 rounded-full bg-white text-black font-black text-sm grid place-items-center">Register Politician</Link><Link href="/admin" className="h-10 px-6 rounded-full bg-white/10 border border-white/10 text-sm grid place-items-center">Admin</Link></div></header>

      <section className="max-w-[1200px] mx-auto px-8 pt-12 pb-8">
        <h1 className="text-[56px] font-black leading-[0.9] tracking-tight">Find Your<br/><span className="text-white/20">Leader.</span></h1>
        <p className="text-white/40 mt-4 max-w-[520px] text-[14px]">Kenya's first verified political directory. FEATURED leaders are homepage verified - they paid KES 9,500 for maximum visibility.</p>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, county, party..." className="mt-8 h-[56px] w-full max-w-[520px] px-6 rounded-full bg-[#121214] border border-white/10 outline-none"/>
      </section>

      {!q && featured.length>0 && (
        <section className="max-w-[1200px] mx-auto px-8 pb-12">
          <div className="flex items-center gap-3 mb-4"><div className="h-6 px-3 rounded-full bg-[#FFD700] text-black text-[10px] font-black grid place-items-center tracking-widest">FEATURED • KES 9,500</div><div className="text-white/40 text-xs">Homepage Spotlight • Ads • Verified</div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((u:any)=><div key={u.id} className="rounded-[24px] bg-[#FFD700]/10 border border-[#FFD700]/30 p-6 shadow-[0_0_40px_rgba(255,215,0,0.15)]"><div className="flex justify-between"><div className="font-black text-[18px]">{u.name}</div><span className="text-[8px] h-5 px-2 rounded-full bg-[#FFD700] text-black font-black grid place-items-center">FEATURED</span></div><div className="text-[12px] text-white/60 mt-2">{u.role} • {u.county} • {u.party}</div><div className="mt-4 text-[11px] text-white/30">{u.email}</div></div>)}
          </div>
        </section>
      )}

      <section className="max-w-[1200px] mx-auto px-8 pb-20">
        <div className="text-[11px] tracking-[0.2em] text-white/30 mb-4">{q? `SEARCH RESULTS • ${filtered.length}` : `ALL POLITICIANS • ${users.length}`}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(q? filtered : users).map((u:any)=>(
            <div key={u.id} className={`rounded-[20px] border p-5 ${u.tier==="featured"? "bg-[#FFD700]/5 border-[#FFD700]/20" : u.tier==="verified"? "bg-white/[0.04] border-white/15" : "bg-[#121214] border-white/5 opacity-80"}`}>
              <div className="flex justify-between items-start"><div className="font-bold text-[14px]">{u.name}</div>{u.tier==="featured"? <span className="text-[8px] px-2 py-1 rounded-full bg-[#FFD700] text-black font-black">FEATURED</span> : u.tier==="verified"? <span className="text-[8px] px-2 py-1 rounded-full bg-white text-black font-black">VERIFIED</span> : <span className="text-[8px] px-2 py-1 rounded-full bg-white/10 text-white/40">FREE</span>}</div>
              <div className="text-[11px] text-white/40 mt-2">{u.county} • {u.party} • {u.role}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}