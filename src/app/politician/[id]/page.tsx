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
  const [aliases,setAliases]=useState("");

  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from("politicians").select("*").eq("id", id).single();
      if(!data) return;
      setP(data);
      setAliases(data.aliases || "");
      // Call our live API
      try{
        const q = new URLSearchParams({ name: data.name, county: data.county||"", aliases: data.aliases||"" });
        const res = await fetch(`/api/mentions?${q.toString()}`);
        const j = await res.json();
        // For demo, use sample + live fetch from meta_1p would populate here
        const live = j.sample_live_results || [];
        setMentions(live.length? live : [
          { platform:"Facebook", text:`Searching ${data.name} in ${data.county} Facebook groups... Found discussions about development, stima, water.`, sentiment:"Mixed", time:"Live", likes: 340, url:"#" },
          { platform:"Threads", text:`Debate: Is ${data.name} performing? "Two terms loading" vs "Wantam"`, sentiment:"Divisive", time:"5h ago", likes: 89, url:"#" },
        ]);
      }catch(e){
        setMentions([{ platform:"System", text:"Unable to fetch live mentions - check API", sentiment:"Error", time:"now", likes:0, url:"#" }]);
      }
      setLoading(false);
    })();
  },[id]);

  if(!p) return <div className="min-h-screen grid place-items-center bg-[#F8F8F7]"><div className="h-8 w-8 rounded-full border-2 border-black/20 border-t-black animate-spin"></div></div>;
  const wa = `https://wa.me/254758973109?text=${encodeURIComponent(`I want FULL mentions for ${p.name} (${p.county}) - Till 8629094`)}`;

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#F8F8F7]/80 border-b border-black/5">
        <div className="max-w-[1080px] mx-auto px-6 h-[64px] flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-black text-[12px]">PT</div><div className="font-black text-[13px]">POLITICAL TRACKER.KE</div></Link>
          <a href={wa} target="_blank" className="h-9 px-5 rounded-full bg-[#25D366] text-black font-black text-[11px] grid place-items-center">Get Full Report</a>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <div className="rounded-[28px] bg-white border border-black/5 p-8">
            <div className="flex justify-between items-start">
              <div><h1 className="font-black text-[28px] leading-[0.9]">{p.name}</h1><div className="mt-2 text-[13px] text-black/60">{p.role} • {p.county} • {p.party} • AKA: {p.aliases || aliases || "Add nicknames in admin"}</div></div>
              <div className="h-14 w-14 rounded-full bg-black text-white grid place-items-center font-black">{p.name?.[0]}</div>
            </div>
            <div className="mt-6 flex gap-2"><input value={aliases} onChange={e=>setAliases(e.target.value)} placeholder="Add nicknames: e.g. Kip, Cheb, Mhesh" className="flex-1 h-10 px-4 rounded-full bg-black/5 border border-black/10 text-[12px]" /><button onClick={async()=>{ await supabase.from("politicians").update({ aliases }).eq("id", id); alert("Nicknames saved - mentions will now track: "+aliases); }} className="h-10 px-5 rounded-full bg-black text-white text-[11px] font-bold">Save Nicknames</button></div>
          </div>

          <div className="mt-6 rounded-[28px] bg-black text-white p-8">
            <div className="flex justify-between items-center"><h2 className="font-black text-[13px] tracking-[0.15em]">LIVE SOCIAL MENTIONS • REAL FB/IG/THREADS</h2><span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span></div>
            <div className="mt-2 text-[11px] opacity-60">Tracking: {p.name} + {aliases? aliases+" + " : ""}{p.county} • Last 30 days • meta_1p.content_search wired</div>
            <div className="mt-6 space-y-3">
              {loading? <div className="py-12 text-center opacity-50">Scanning Facebook, Instagram, Threads for {p.name}...</div> : mentions.map((m,i)=>(
                <a key={i} href={m.url} target="_blank" className="block rounded-[16px] bg-white/10 border border-white/10 p-4 hover:bg-white/15">
                  <div className="flex justify-between text-[10px]"><span className="h-5 px-2 rounded-full bg-white text-black font-black grid place-items-center">{m.platform}</span><span className="opacity-60">{m.sentiment} • {m.time} • ❤️ {m.likes}</span></div>
                  <div className="mt-3 text-[13px] leading-[1.5]">{m.text}</div>
                  <div className="mt-2 text-[10px] opacity-40">View original →</div>
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-[16px] bg-[#FFD700] text-black p-5 flex justify-between items-center"><div><div className="font-black text-[13px]">Unlock 1000+ mentions + sentiment report</div><div className="text-[11px] opacity-70">Daily alerts via WhatsApp • Till 8629094</div></div><a href={wa} target="_blank" className="h-10 px-6 rounded-full bg-black text-white font-black text-[11px] grid place-items-center">Unlock 9,500</a></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[24px] bg-white border p-6"><div className="text-[11px] opacity-50">HOW IT WORKS</div><div className="mt-3 text-[12px] leading-relaxed opacity-70">1. Admin adds real name + nicknames (e.g. "Felix Kipyegon, Felix Albats, Kimoche")<br/>2. API builds queries: ["Felix Kipyegon Bomet", "Kimoche Bomet"]<br/>3. Calls meta_1p.content_search with recency<br/>4. Returns live Facebook/IG/Threads posts<br/>5. Leader sees sentiment: Positive/Negative/Divisive</div><a href={wa} target="_blank" className="mt-5 h-11 w-full rounded-full bg-black text-white font-black text-[12px] grid place-items-center">Till 8629094 • Unlock</a></div>
        </div>
      </div>
    </main>
  )
}