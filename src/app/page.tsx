"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home(){
  const [users,setUsers]=useState<any[]>([]);
  const [q,setQ]=useState("");
  useEffect(()=>{ (async()=>{ const {data}=await supabase.from("politicians").select("*").eq("verified",true).order("created_at",{ascending:false}); setUsers(data||[]); })(); },[]);

  const featured = users.filter(u=>u.tier==="featured");
  const verified = users.filter(u=>u.tier==="verified");
  const free = users.filter(u=>u.tier==="free");

  const filtered = users.filter(u => (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase()) || (u.party||"").toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <header className="max-w-[1240px] mx-auto px-8 py-7 flex justify-between items-center">
        <div className="font-black tracking-tight text-[18px]">POLITICAL TRACKER<span className="text-white/30">.KE</span> <span className="text-[10px] ml-2 px-2 py-1 rounded-full bg-[#FFD700] text-black">TILL 8629094</span></div>
        <div className="flex gap-2">
          <Link href="/register" className="h-11 px-7 rounded-full bg-white text-black font-black text-[13px] grid place-items-center">Register Politician</Link>
          <Link href="/admin" className="h-11 px-6 rounded-full bg-white/10 border border-white/10 text-[13px] grid place-items-center">Admin</Link>
        </div>
      </header>

      <section className="max-w-[1240px] mx-auto px-8 pt-10 pb-10">
        <h1 className="text-[64px] font-black leading-[0.85] tracking-tight">Find Your<br/><span className="text-white/20">Leader.</span></h1>
        <p className="text-white/40 mt-5 max-w-[560px] text-[14px] leading-relaxed">Kenya's first verified political directory. We list Governors, Senators, MPs, MCAs. <span className="text-[#FFD700] font-bold">FEATURED leaders pay KES 9,500</span> to appear on homepage gold + ads + top rank.</p>
        <div className="mt-8 flex gap-3 max-w-[640px]">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, county, party..." className="flex-1 h-[56px] px-6 rounded-full bg-[#121214] border border-white/10 outline-none focus:border-white/20"/>
          <Link href="/register" className="h-[56px] px-8 rounded-full bg-[#FFD700] text-black font-black text-[13px] grid place-items-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">Get Featured</Link>
        </div>
        <div className="mt-4 flex gap-2 text-[11px] text-white/30"><span>{featured.length} FEATURED •</span><span>{verified.length} VERIFIED •</span><span>{free.length} FREE •</span><span>Till 8629094</span></div>
      </section>

      {featured.length>0 &&!q && (
        <section className="max-w-[1240px] mx-auto px-8 pb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-7 px-4 rounded-full bg-[#FFD700] text-black text-[11px] font-black tracking-widest grid place-items-center">FEATURED • HOMEPAGE SPOTLIGHT</div>
            <div className="text-white/40 text-[12px]">These leaders invested KES 9,500 for max visibility</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((u:any)=><div key={u.id} className="group rounded-[28px] bg-[#FFD700] text-black p-[1px] shadow-[0_0_50px_rgba(255,215,0,0.2)]"><div className="rounded-[27px] bg-[#1A1A0A] text-white p-6 h-full"><div className="flex justify-between items-start"><div className="font-black text-[20px] leading-tight">{u.name}</div><span className="text-[9px] px-3 py-1 rounded-full bg-[#FFD700] text-black font-black">GOLD</span></div><div className="mt-3 text-[12px] text-white/60">{u.role} • {u.county}</div><div className="mt-2 text-[11px] inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10">{u.party}</div><div className="mt-6 flex justify-between items-center"><div className="text-[10px] text-white/30">Till 8629094 Verified</div><div className="text-[11px] font-bold text-[#FFD700]">Homepage + Ads</div></div></div></div>)}
          </div>
        </section>
      )}

      <section className="max-w-[1240px] mx-auto px-8 pb-20">
        <div className="flex justify-between items-center mb-5">
          <div className="text-[11px] tracking-[0.2em] text-white/30">{q? `SEARCH • ${filtered.length} RESULTS FOR "${q}"` : verified.length>0? `VERIFIED LEADERS • ${verified.length}` : `ALL VERIFIED LEADERS • ${users.length}`}</div>
          {!q && <Link href="/register" className="text-[11px] text-[#FFD700] font-bold tracking-widest">GET VERIFIED FOR KES 4,500 →</Link>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(q? filtered : verified.length>0? verified : users).map((u:any)=>(
            <div key={u.id} className={`rounded-[22px] border p-5 transition hover:border-white/20 ${u.tier==="featured"? "bg-[#FFD700]/5 border-[#FFD700]/20" : "bg-[#121214] border-white/5"}`}>
              <div className="flex justify-between"><div className="font-bold text-[15px]">{u.name}</div>{u.tier==="featured"? <span className="text-[8px] px-2 py-1 rounded-full bg-[#FFD700] text-black font-black h-fit">FEATURED</span> : <span className="text-[8px] px-2 py-1 rounded-full bg-white text-black font-black h-fit">VERIFIED</span>}</div>
              <div className="text-[12px] text-white/40 mt-2">{u.role} • {u.county} • {u.party}</div>
            </div>
          ))}
          {users.length===0 && <div className="col-span-3 rounded-[24px] border border-dashed border-white/10 p-12 text-center text-white/30 text-sm">No verified politicians yet. Be first — register and pay Till 8629094 to appear GOLD.</div>}
        </div>

        <div className="mt-16 rounded-[32px] bg-white text-black p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div><div className="font-black text-[24px] leading-tight">Want to be on Homepage<br/>Gold?</div><div className="text-[13px] opacity-60 mt-2">Pay Till 8629094 • KES 9,500 • FEATURED = Homepage + Ads + Verified badge</div></div>
          <Link href="/register" className="h-[56px] px-10 rounded-full bg-black text-white font-black text-[13px] grid place-items-center">Register Now →</Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-[11px] text-white/20">Political Tracker.KE • Till 8629094 • KES 0 / 4,500 / 9,500 • Built for Kenya 2026</footer>
    </main>
  )
}