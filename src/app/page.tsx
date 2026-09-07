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
  const filtered = users.filter(u => (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase()) || (u.party||"").toLowerCase().includes(q.toLowerCase()));
  const waAdmin = "https://wa.me/254758973109?text="+encodeURIComponent("Mheshimiwa here - I want to be FEATURED on Political Tracker.KE - Till 8629094");

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111] selection:bg-[#FFD700]">
      {/* TOP TRUST BAR */}
      <div className="bg-black text-white text-[11px] py-2.5 text-center tracking-widest">OFFICIAL POLITICAL DIRECTORY • VERIFIED BY ID • TILL 8629094 • WHATSAPP 0758973109 • KENYA 2026</div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#F8F8F7]/80 border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex justify-between items-center">
          <div className="flex items-center gap-4"><div className="h-9 w-9 rounded-full bg-black text-white grid place-items-center font-black text-[14px]">PT</div><div><div className="font-black tracking-tight leading-none text-[16px]">POLITICAL TRACKER</div><div className="text-[10px] tracking-[0.2em] opacity-50">KENYA • EST. 2026</div></div><div className="ml-6 hidden md:flex items-center gap-2 text-[11px]"><span className="h-6 px-3 rounded-full bg-[#111] text-white grid place-items-center font-bold">✓ VERIFIED</span><span className="h-6 px-3 rounded-full bg-[#FFD700] text-black grid place-items-center font-black">FEATURED</span></div></div>
          <div className="flex items-center gap-2"><Link href="/register" className="h-10 px-6 rounded-full bg-black text-white font-bold text-[12px] grid place-items-center hover:bg-[#222] transition">List Your Profile</Link><a href={waAdmin} target="_blank" className="h-10 px-6 rounded-full bg-[#25D366] text-black font-black text-[12px] grid place-items-center">WhatsApp</a></div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-black text-white text-[10px] font-bold tracking-widest"><span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span> LIVE • {users.length} VERIFIED LEADERS ONLINE</div>
            <h1 className="mt-6 text-[56px] md:text-[72px] font-black leading-[0.85] tracking-[-0.03em]">The official<br/>directory for<br/><span className="text-black/20">Kenya's leaders.</span></h1>
            <p className="mt-6 text-[15px] leading-[1.6] text-black/60 max-w-[520px]">Voters, journalists, and donors search Political Tracker to verify leaders. <span className="font-bold text-black">If you're not verified, you don't exist.</span> Join Governors, Senators, MPs, and MCAs already listed.</p>

            <div className="mt-8 flex gap-3 max-w-[520px]"><div className="flex-1 relative"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Governor, MP, MCA, County..." className="w-full h-[52px] pl-12 pr-6 rounded-full bg-white border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] outline-none focus:border-black/20 text-[14px]"/><span className="absolute left-5 top-[16px] text-black/30">⌕</span></div><Link href="/register" className="h-[52px] px-8 rounded-full bg-[#FFD700] text-black font-black text-[13px] grid place-items-center shadow-[0_10px_30px_rgba(255,215,0,0.3)]">Get Verified</Link></div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-[520px] border-t border-black/5 pt-6">
              <div><div className="font-black text-[28px] leading-none">{featured.length || 0}</div><div className="text-[11px] tracking-widest opacity-50 mt-1">FEATURED GOLD</div></div>
              <div><div className="font-black text-[28px] leading-none">{verified.length || users.length}</div><div className="text-[11px] tracking-widest opacity-50 mt-1">VERIFIED LEADERS</div></div>
              <div><div className="font-black text-[28px] leading-none">47</div><div className="text-[11px] tracking-widest opacity-50 mt-1">COUNTIES</div></div>
            </div>
          </div>

          {/* PRICING CARD */}
          <div className="rounded-[32px] bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-2">
            <div className="rounded-[24px] bg-black text-white p-7">
              <div className="flex justify-between items-center"><div className="text-[11px] tracking-[0.2em] opacity-60">WHY LEADERS PAY</div><div className="h-6 px-3 rounded-full bg-[#FFD700] text-black text-[10px] font-black">MOST POPULAR</div></div>
              <h3 className="mt-4 text-[28px] font-black leading-[0.9]">Be found by<br/>voters & donors.</h3>
              <div className="mt-6 space-y-3 text-[13px]">
                <div className="flex gap-3"><span className="text-[#FFD700]">✓</span><span><span className="font-bold">Homepage Gold</span> — top 3 visible to all visitors</span></div>
                <div className="flex gap-3"><span className="text-[#FFD700]">✓</span><span><span className="font-bold">Verified Badge</span> — ID & M-Pesa verified</span></div>
                <div className="flex gap-3"><span className="text-[#FFD700]">✓</span><span><span className="font-bold">Google + Ads</span> — we promote you</span></div>
                <div className="flex gap-3"><span className="text-[#FFD700]">✓</span><span><span className="font-bold">Shareable Profile</span> — link for posters, WhatsApp</span></div>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <Link href="/register" className="h-[48px] rounded-full bg-white text-black font-black text-[12px] grid place-items-center">VERIFIED 4,500</Link>
                <Link href="/register" className="h-[48px] rounded-full bg-[#FFD700] text-black font-black text-[12px] grid place-items-center">FEATURED 9,500</Link>
              </div>
              <div className="mt-4 text-center text-[10px] opacity-40">Lipa na M-Pesa Till 8629094 • WhatsApp 0758973109</div>
            </div>
            <div className="px-7 py-5 flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-[#25D366] grid place-items-center text-black font-black text-[12px]">✓</div><div className="text-[12px]"><span className="font-bold">Trusted by leaders in</span><br/><span className="opacity-60">Bomet, Nairobi, Kisumu, Mombasa, Kiambu...</span></div></div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length>0 &&!q && (
        <section className="max-w-[1280px] mx-auto px-8 pb-12">
          <div className="flex items-center gap-3 mb-6"><h2 className="font-black text-[13px] tracking-[0.2em]">FEATURED GOLD • HOMEPAGE SPOTLIGHT</h2><div className="h-[1px] flex-1 bg-black/5"></div><div className="text-[11px] opacity-50">Paid KES 9,500 for max visibility</div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((u:any)=><Link key={u.id} href={`/politician/${u.id}`} className="group rounded-[24px] bg-black text-white p-6 hover:bg-[#111] transition border border-[#FFD700]/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"><div className="flex justify-between items-start"><div className="font-black text-[18px] leading-tight">{u.name}</div><span className="h-6 px-3 rounded-full bg-[#FFD700] text-black text-[9px] font-black grid place-items-center">GOLD</span></div><div className="mt-3 text-[12px] opacity-70">{u.role} • {u.county}</div><div className="mt-3 inline-block h-6 px-3 rounded-full bg-white text-black text-[10px] font-bold grid place-items-center">{u.party}</div><div className="mt-6 flex justify-between items-center text-[11px]"><span className="opacity-40">Till 8629094 ✓ Verified</span><span className="font-bold text-[#FFD700] group-hover:translate-x-1 transition">View Profile →</span></div></Link>)}
          </div>
        </section>
      )}

      {/* ALL LEADERS */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="flex justify-between items-center mb-6"><h2 className="font-black text-[13px] tracking-[0.2em]">{q? `SEARCH RESULTS • ${filtered.length}` : `VERIFIED LEADERS • ${users.length}`}</h2><a href={waAdmin} target="_blank" className="text-[11px] font-bold underline">Claim your profile via WhatsApp</a></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(q? filtered : users).map((u:any)=><Link key={u.id} href={`/politician/${u.id}`} className="group rounded-[20px] bg-white border border-black/5 p-5 hover:border-black/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition"><div className="flex justify-between"><div className="font-bold text-[14px]">{u.name}</div>{u.tier==="featured"? <span className="h-5 px-2 rounded-full bg-[#FFD700] text-black text-[8px] font-black grid place-items-center">FEATURED</span> : <span className="h-5 px-2 rounded-full bg-black text-white text-[8px] font-bold grid place-items-center">VERIFIED</span>}</div><div className="mt-2 text-[12px] opacity-60">{u.role} • {u.county} County • {u.party}</div><div className="mt-4 text-[10px] font-bold opacity-30 group-hover:opacity-100 transition">VIEW OFFICIAL PROFILE →</div></Link>)}
          {users.length===0 && (<div className="col-span-3 rounded-[24px] bg-white border border-dashed border-black/10 p-16 text-center"><div className="font-black text-[20px]">No leaders verified yet</div><div className="text-[13px] opacity-60 mt-2">Be the first in your county. Till 8629094.</div><Link href="/register" className="mt-6 inline-grid h-12 px-8 rounded-full bg-black text-white font-black text-[13px] place-items-center">Get Verified Now</Link></div>)}
        </div>
      </section>

      {/* FOOTER TRUST */}
      <section className="border-t border-black/5 bg-white">
        <div className="max-w-[1280px] mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-[12px]">
          <div><div className="font-black tracking-widest text-[11px] mb-3">WHY WE EXIST</div><div className="opacity-60 leading-relaxed">Kenya has 47 counties, 290 constituencies, 1,450 wards. Voters cannot find verified info. Political Tracker.KE is the first ID-verified directory. No fake profiles.</div></div>
          <div><div className="font-black tracking-widest text-[11px] mb-3">HOW VERIFICATION WORKS</div><div className="opacity-60 leading-relaxed">1. Register with ID • 2. Pay Till 8629094 (4,500 / 9,500) • 3. We verify M-Pesa code • 4. You get badge + homepage. WhatsApp 0758973109 for support.</div></div>
          <div><div className="font-black tracking-widest text-[11px] mb-3">CONTACT</div><div className="opacity-60 leading-relaxed">Till No: 8629094<br/>WhatsApp: 0758973109<br/>Email: info@politicaltracker.ke<br/>Nairobi • Bomet • Kenya 2026</div></div>
        </div>
        <div className="border-t border-black/5 py-6 text-center text-[10px] tracking-widest opacity-40">© 2026 POLITICAL TRACKER.KE • TILL 8629094 • ALL RIGHTS RESERVED • MADE FOR KENYA</div>
      </section>

      <a href={waAdmin} target="_blank" className="fixed bottom-6 right-6 h-[56px] px-6 rounded-full bg-black text-white font-bold text-[13px] flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 border border-white/10"><span className="h-7 w-7 rounded-full bg-[#25D366] grid place-items-center text-black">✦</span> WhatsApp Us • 0758973109</a>
    </main>
  )
}