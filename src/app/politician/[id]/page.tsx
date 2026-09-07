"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PoliticianPage(){
  const { id } = useParams();
  const [p,setP]=useState<any>(null);
  const [mentions,setMentions]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from("politicians").select("*").eq("id", id).single();
      setP(data);
      const {data: m}=await supabase.from("mentions").select("*").eq("politician_id", id).order("posted_at",{ascending:false}).limit(20);
      if(m && m.length>0){
        setMentions(m);
      } else {
        // Fallback: call live API that uses meta_1p.content_search
        const q = new URLSearchParams({ name: data.name, county: data.county||"", aliases: data.aliases||"" });
        const res = await fetch(`/api/mentions?${q.toString()}`);
        const j = await res.json();
        setMentions(j.sample_live_results || []);
      }
      setLoading(false);
    })();
  },[id]);

  if(!p) return <div className="min-h-screen grid place-items-center bg-[#F8F8F7]">Loading...</div>;
  const wa = `https://wa.me/254758973109?text=${encodeURIComponent(`FULL report for ${p.name} - Till 8629094`)}`;

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1080px] mx-auto px-6 h-[64px] flex justify-between items-center">
          <Link href="/" className="font-black text-[13px]">POLITICAL TRACKER.KE</Link>
          <a href={wa} target="_blank" className="h-9 px-5 rounded-full bg-black text-white text-[11px] font-black grid place-items-center">Till 8629094</a>
        </div>
      </header>
      <div className="max-w-[1080px] mx-auto px-6 py-8">
        <div className="rounded-[24px] bg-white border p-6 flex justify-between"><div><h1 className="font-black text-[24px]">{p.name}</h1><div className="text-[12px] opacity-60">{p.role} • {p.county} • Aliases: {p.aliases||"None"}</div></div><div className="text-[11px] opacity-50">{mentions.length} live mentions</div></div>
        <div className="mt-6 rounded-[24px] bg-black text-white p-6">
          <h2 className="font-black text-[12px] tracking-widest">LIVE SOCIAL MENTIONS • FB / IG / THREADS</h2>
          <div className="mt-4 space-y-3">
            {loading? <div className="py-10 text-center opacity-50">Scanning real posts...</div> : mentions.map((m:any,i:number)=>(
              <a key={i} href={m.url} target="_blank" className="block rounded-[14px] bg-white/10 p-4 hover:bg-white/15">
                <div className="flex justify-between text-[10px]"><span className="bg-white text-black px-2 py-1 rounded-full font-black">{m.platform}</span><span className="opacity-60">{m.sentiment} • {m.posted_at? new Date(m.posted_at).toLocaleDateString() : m.time}</span></div>
                <div className="mt-2 text-[13px] leading-snug">{m.text}</div>
                <div className="mt-2 text-[10px] opacity-50">❤️ {m.likes} • {m.comments} comments • View →</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}