"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home(){
  const [politicians,setPoliticians]=useState<any[]>([]);
  const [mentionsCount,setMentionsCount]=useState(0);
  useEffect(()=>{
    (async()=>{
      const {data: pols} = await supabase.from("politicians").select("*").order("created_at",{ascending:false}).limit(20);
      setPoliticians(pols||[]);
      const {count} = await supabase.from("mentions").select("*",{count:"exact", head:true});
      setMentionsCount(count||0);
    })();
  },[]);
  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="h-[64px] px-6 md:px-10 flex items-center justify-between bg-white border-b">
        <b>POLITICAL TRACKER.KE</b>
        <Link href="/admin" className="text-[11px] opacity-50">Admin</Link>
      </header>
      <div className="px-6 md:px-10 py-10 max-w-[1100px] mx-auto">
        <div className="rounded-[28px] bg-black text-white p-8 md:p-12">
          <h1 className="font-black text-[32px] md:text-[48px] leading-[0.9]">We track what Bomet says about you — FB / IG / THREADS / X — LIVE.</h1>
          <div className="mt-4 text-[13px] opacity-70">{mentionsCount} mentions tracked • Auto-scan every 15 min • Till 8629094</div>
          <div className="mt-6 flex gap-3"><span className="px-3 py-1.5 rounded-full bg-[#1877F2] text-[10px] font-bold">FB LIVE</span><span className="px-3 py-1.5 rounded-full bg-[#E1306C] text-[10px] font-bold">IG SCANNING</span><span className="px-3 py-1.5 rounded-full bg-white text-black text-[10px] font-bold">THREADS SCANNING</span></div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {politicians.map(p=>(
            <Link key={p.id} href={`/politician/${p.id}`} className="rounded-[20px] bg-white border p-6 hover:shadow-lg transition">
              <div className="flex justify-between"><b className="text-[15px]">{p.name}</b><span className="text-[10px] px-2 py-1 rounded-full bg-black text-white">{p.status||"pending"}</span></div>
              <div className="mt-1 text-[11px] opacity-60">{p.role} • {p.county} • {p.aliases}</div>
              <div className="mt-3 text-[11px] font-bold">View live mentions →</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}