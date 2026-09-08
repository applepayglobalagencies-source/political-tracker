"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type Mention = { id:string, platform:string, author_name:string, text:string, likes:number, comments:number, sentiment:string, url?:string, posted_at:string, politician_id:string }

export default function PoliticianPage(){
  const params = useParams(); const searchParams = useSearchParams();
  const isNew = searchParams.get("new")==="1";
  const id = params.id as string;
  const [politician,setPolitician]=useState<any>(null);
  const [mentions,setMentions]=useState<Mention[]>([]);
  const [loading,setLoading]=useState(true);

  const load = async()=>{
    const {data: pol} = await supabase.from("politicians").select("*").eq("id", id).single();
    setPolitician(pol);
    // First get DB mentions
    let {data: mens} = await supabase.from("mentions").select("*").eq("politician_id", id).order("posted_at",{ascending:false}).limit(50);
    setMentions(mens||[]);
    setLoading(false);
    // Then try live scan API (real FB search)
    try{
      const r = await fetch(`/api/scan?politician_id=${id}&live=1`, {cache:"no-store"});
      const j = await r.json();
      if(j.mentions?.length){ setMentions(j.mentions); }
    }catch{}
  };

  useEffect(()=>{ load(); const t=setInterval(load, 60000); return ()=>clearInterval(t); },[id]);

  if(loading) return <div className="min-h-screen grid place-items-center bg-[#F8F8F7]">Loading Top Loya...</div>;
  if(!politician) return <div className="min-h-screen grid place-items-center">Not found</div>;

  const fb = mentions.filter(m=>m.platform.toLowerCase().includes("face"));
  const ig = mentions.filter(m=>m.platform.toLowerCase().includes("insta") && m.author_name!=="System Scanner");
  const th = mentions.filter(m=>m.platform.toLowerCase().includes("thread") && m.author_name!=="System Scanner");
  const x = mentions.filter(m=>m.platform.toLowerCase().includes("x") || m.platform.toLowerCase().includes("twitter"));
  const real = mentions.filter(m=>m.author_name!=="System Scanner");
  const totalLikes = real.reduce((a,b)=>a+(b.likes||0),0);

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-10 bg-white border-b px-6 md:px-10 h-[64px] flex items-center justify-between">
        <Link href="/" className="font-black">POLITICAL TRACKER.KE</Link>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">LIVE • AUTO 60s</span>
          <a href="https://wa.me/254758973109" className="h-9 px-5 rounded-full bg-black text-white text-[12px] font-bold grid place-items-center">Till 8629094</a>
        </div>
      </header>
      <div className="px-6 md:px-10 py-8 max-w-[1100px] mx-auto">
        {isNew && <div className="mb-6 rounded-[16px] bg-[#25D366] p-4 flex justify-between"><div><b className="text-[13px]">✅ {politician.mpesa_code} Received</b><div className="text-[11px]">Verifying — mentions live below</div></div><b className="text-[11px]">GOLD ACTIVE</b></div>}
        <div className="rounded-[28px] bg-white border p-7 md:p-9">
          <h1 className="font-black text-[30px] leading-none">{politician.name}</h1>
          <div className="mt-2 text-[12px] opacity-60">{politician.role} • {politician.county} • {politician.party} • {politician.aliases}</div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-full bg-[#1877F2] text-white text-[10px] font-bold">FB: {fb.filter(m=>m.author_name!=="System Scanner").length} live • {fb.reduce((a,b)=>a+(b.likes||0),0)} likes</span>
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${ig.length? "bg-[#E1306C] text-white" : "bg-white border"}`}>IG: {ig.length||0} {ig.length? "found" : "scanning 24/7"}</span>
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${th.length? "bg-black text-white" : "bg-white border"}`}>THREADS: {th.length||0} {th.length? "found" : "scanning 24/7"}</span>
            <span className="px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-bold">X: {x.length}</span>
            <span className="px-3 py-1.5 rounded-full bg-[#FFD700] text-black text-[10px] font-bold">{totalLikes} total likes</span>
          </div>
        </div>
        <div className="mt-6 rounded-[24px] bg-black text-white p-5 md:p-7">
          <h2 className="font-black text-[12px] tracking-widest">LIVE MENTIONS • AUTO UPDATING</h2>
          <div className="mt-5 grid gap-3">
            {real.length===0 && <div className="rounded-[16px] bg-white/5 border border-white/10 p-6 text-center text-[13px]">No mentions yet — scanner running every 15 min for "{politician.name}"</div>}
            {mentions.filter(m=>m.author_name!=="System Scanner").map(m=>(
              <div key={m.id} className="rounded-[16px] p-4 border bg-white/[0.06] border-white/10">
                <div className="flex justify-between"><span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-black">{m.platform.toUpperCase()}</span><span className="text-[11px] opacity-60">{m.sentiment} • {m.author_name} • {new Date(m.posted_at).toLocaleDateString()}</span></div>
                <div className="mt-3 text-[13px]">{m.text}</div>
                <div className="mt-2 text-[11px] opacity-60">{m.likes>0 && `❤️ ${m.likes} `}{m.comments>0 && `💬 ${m.comments} `}{m.url && <a href={m.url} target="_blank" className="underline">View source →</a>}</div>
              </div>
            ))}
            {mentions.filter(m=>m.author_name==="System Scanner").map(m=>(
              <div key={m.id} className="rounded-[16px] p-4 border bg-white/[0.02] border-white/10 opacity-60"><span className="text-[10px]">{m.platform}: {m.text}</span></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}