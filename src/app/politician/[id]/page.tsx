"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PoliticianPage(){
  const { id } = useParams();
  const [p,setP]=useState<any>(null);
  const [mentions,setMentions]=useState<any[]>([]);
  const [loadingMentions,setLoadingMentions]=useState(true);

  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from("politicians").select("*").eq("id", id).single();
      setP(data);
      // Simulate fetching social mentions - in production this calls /api/mentions with meta_1p.content_search
      setTimeout(()=>{
        setMentions([
          { platform:"Facebook", text:`People in ${data?.county} are praising ${data?.name} for development projects. "Mheshimiwa amefanya kazi!"`, sentiment:"Positive", time:"2h ago", likes:234 },
          { platform:"Threads", text:`Is ${data?.name} the next Governor? Debate getting heated in Bomet.`, sentiment:"Neutral", time:"5h ago", likes:89 },
          { platform:"Instagram", text:`Photo: ${data?.name} at a funeral in ${data?.county} - comments mixed`, sentiment:"Mixed", time:"1d ago", likes:412 },
        ]);
        setLoadingMentions(false);
      }, 1000);
    })();
  },[id]);

  if(!p) return <div className="min-h-screen grid place-items-center bg-[#F8F8F7]"><div className="h-8 w-8 rounded-full border-2 border-black/20 border-t-black animate-spin"></div></div>;

  const wa = `https://wa.me/254758973109?text=${encodeURIComponent(`I want FULL social mentions report for ${p.name} - Till 8629094`)}`;

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#F8F8F7]/80 border-b border-black/5">
        <div className="max-w-[1080px] mx-auto px-6 h-[64px] flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-black text-[12px]">PT</div><div className="font-black text-[13px]">POLITICAL TRACKER.KE</div></Link>
          <a href={wa} target="_blank" className="h-9 px-5 rounded-full bg-[#25D366] text-black font-black text-[11px] grid place-items-center">Get Full Report</a>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* LEFT - PROFILE */}
        <div>
          <div className="rounded-[28px] bg-white border border-black/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3"><h1 className="font-black text-[28px] leading-[0.9]">{p.name}</h1>{p.verified && <span className="h-6 px-3 rounded-full bg-black text-white text-[10px] font-black grid place-items-center">✓ VERIFIED</span>}</div>
                <div className="mt-3 text-[13px] text-black/60">{p.role} • {p.county} County • {p.party}</div>
                <div className="mt-3 flex gap-2"><span className={`h-6 px-3 rounded-full text-[10px] font-black grid place-items-center ${p.tier==="featured"? "bg-[#FFD700] text-black" : "bg-black/10"}`}>{(p.tier||"free").toUpperCase()}</span><span className="h-6 px-3 rounded-full bg-black/5 text-[10px] font-bold grid place-items-center">ID VERIFIED</span></div>
              </div>
              <div className="h-14 w-14 rounded-full bg-black text-white grid place-items-center font-black text-[18px]">{p.name?.[0]}</div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-[16px] bg-black/5 p-4"><div className="text-[10px] tracking-widest opacity-50">MENTIONS</div><div className="font-black text-[20px] mt-1">1.2k</div><div className="text-[10px] opacity-40 mt-1">Last 30 days</div></div>
              <div className="rounded-[16px] bg-black/5 p-4"><div className="text-[10px] tracking-widest opacity-50">SENTIMENT</div><div className="font-black text-[20px] mt-1 text-[#25D366]">68% +</div><div className="text-[10px] opacity-40 mt-1">Positive</div></div>
              <div className="rounded-[16px] bg-[#FFD700] p-4"><div className="text-[10px] tracking-widest opacity-60">REACH</div><div className="font-black text-[20px] mt-1">45k</div><div className="text-[10px] opacity-60 mt-1">People</div></div>
            </div>
          </div>

          {/* SOCIAL MENTIONS - THE CORE PRODUCT */}
          <div className="mt-6 rounded-[28px] bg-black text-white p-8">
            <div className="flex justify-between items-center"><h2 className="font-black text-[14px] tracking-[0.15em]">LIVE SOCIAL MENTIONS • WHAT KENYANS SAY</h2><span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span></div>
            <div className="mt-2 text-[11px] opacity-60">Tracking Facebook, Instagram, Threads, TikTok for "{p.name}" in {p.county}</div>

            <div className="mt-6 space-y-3">
              {loadingMentions? (
                <div className="py-12 text-center opacity-50 text-[13px]">Scanning social media for mentions of {p.name}...</div>
              ) : mentions.map((m,i)=>(
                <div key={i} className="rounded-[16px] bg-white/10 border border-white/10 p-4">
                  <div className="flex justify-between items-center text-[10px]"><span className={`h-5 px-2 rounded-full font-black grid place-items-center ${m.platform==="Facebook"? "bg-[#1877F2] text-white" : m.platform==="Instagram"? "bg-[#E4405F] text-white" : "bg-white text-black"}`}>{m.platform}</span><span className={`px-2 py-1 rounded-full text-[9px] font-bold ${m.sentiment==="Positive"? "bg-[#25D366]/20 text-[#25D366]" : m.sentiment==="Mixed"? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-white/20"}`}>{m.sentiment.toUpperCase()} • {m.time}</span></div>
                  <div className="mt-3 text-[13px] leading-[1.5] opacity-90">{m.text}</div>
                  <div className="mt-3 text-[11px] opacity-50">❤️ {m.likes} likes • View original post →</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[16px] bg-[#FFD700] text-black p-5 flex justify-between items-center gap-4">
              <div><div className="font-black text-[14px]">Want FULL report + sentiment analysis?</div><div className="text-[11px] opacity-70 mt-1">We track 1000s of mentions daily. Pay Till 8629094 to unlock 30 days.</div></div>
              <a href={wa} target="_blank" className="h-10 px-6 rounded-full bg-black text-white font-black text-[11px] grid place-items-center shrink-0">Unlock • 9,500</a>
            </div>
          </div>
        </div>

        {/* RIGHT - CTA */}
        <div className="space-y-4">
          <div className="rounded-[24px] bg-white border border-black/5 p-6">
            <div className="text-[11px] tracking-widest opacity-50">WHY THIS MATTERS</div>
            <h3 className="mt-3 font-black text-[18px] leading-[1.1]">Voters talk before they vote.</h3>
            <p className="mt-3 text-[12px] leading-[1.6] opacity-60">We scan Facebook groups, Instagram comments, Threads debates in {p.county} to show {p.name} what people REALLY think. No more surprises on election day.</p>
            <div className="mt-5 space-y-2 text-[11px]">
              <div className="flex gap-2"><span className="text-[#25D366]">✓</span> Daily mention alerts via WhatsApp</div>
              <div className="flex gap-2"><span className="text-[#25D366]">✓</span> Positive vs Negative sentiment score</div>
              <div className="flex gap-2"><span className="text-[#25D366]">✓</span> Top Facebook groups talking about you</div>
              <div className="flex gap-2"><span className="text-[#25D366]">✓</span> Competitor comparison</div>
            </div>
            <a href={wa} target="_blank" className="mt-6 h-11 w-full rounded-full bg-black text-white font-black text-[12px] grid place-items-center">Unlock Full Intel • Till 8629094</a>
            <div className="mt-3 text-center text-[10px] opacity-40">Lipa na M-Pesa • Till No: 8629094 (Buy Goods)</div>
          </div>

          <div className="rounded-[24px] bg-black text-white p-6">
            <div className="text-[11px] tracking-widest opacity-50">FOR {p.county.toUpperCase()} LEADERS</div>
            <div className="mt-3 font-bold text-[13px] leading-snug">"{p.name} has {Math.floor(Math.random()*200)+50} new mentions this week — mostly in {p.county} Facebook groups. 3 negative posts need response."</div>
            <div className="mt-4 text-[10px] opacity-40">Sample alert — real report is 10x detailed</div>
          </div>
        </div>
      </div>
    </main>
  )
}