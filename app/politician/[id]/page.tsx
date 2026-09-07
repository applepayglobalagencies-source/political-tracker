"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type Mention = { id:string, platform:string, author_name:string, text:string, likes:number, comments:number, sentiment:string, url?:string, posted_at:string }

export default function PoliticianPage(){
  const params = useParams();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new")==="1";
  const id = params.id as string;
  const [politician,setPolitician]=useState<any>(null);
  const [mentions,setMentions]=useState<Mention[]>([]);

  useEffect(()=>{
    (async()=>{
      const {data: pol} = await supabase.from("politicians").select("*").eq("id", id).single();
      setPolitician(pol);
      const {data: mens} = await supabase.from("mentions").select("*").eq("politician_id", id).order("posted_at", {ascending:false});
      if(mens) setMentions(mens);
    })();
  },[id]);

  if(!politician) return <div className="min-h-screen grid place-items-center bg-[#F8F8F7] text-black">Loading Top Loya...</div>;

  const fb = mentions.filter(m=>m.platform.toLowerCase().includes("face"));
  const ig = mentions.filter(m=>m.platform.toLowerCase().includes("insta"));
  const threads = mentions.filter(m=>m.platform.toLowerCase().includes("thread"));
  const x = mentions.filter(m=>m.platform.toLowerCase().includes("x") || m.platform.toLowerCase().includes("twitter"));
  const realMentions = mentions.filter(m=>m.author_name!=="System Scanner");
  const totalLikes = realMentions.reduce((a,b)=>a+(b.likes||0),0);

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-10 bg-white border-b border-black/10 px-6 md:px-10 h-[64px] flex items-center justify-between">
        <Link href="/" className="font-black tracking-tight">POLITICAL TRACKER.KE</Link>
        <a href="https://wa.me/254758973109" className="h-9 px-5 rounded-full bg-black text-white text-[12px] font-bold grid place-items-center">Till 8629094</a>
      </header>

      <div className="px-6 md:px-10 py-8 max-w-[1100px] mx-auto">
        {isNew && (
          <div className="mb-6 rounded-[16px] bg-[#25D366] text-black p-4 flex items-center justify-between">
            <div><b className="text-[13px]">✅ Registration Received: {politician.mpesa_code}</b><div className="text-[11px] opacity-70">Verifying. Mentions live below.</div></div>
            <div className="text-[11px] font-black">VERIFIED IN 10 MINS</div>
          </div>
        )}

        <div className="rounded-[28px] bg-white border border-black/10 p-7 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-black text-[26px] md:text-[32px] leading-none text-black">{politician.name}</h1>
              <div className="mt-2 text-[12px] text-black/60">{politician.role} • {politician.county} • {politician.party} {politician.aliases? `• ${politician.aliases}`: ""}</div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="px-3 py-1.5 rounded-full bg-[#1877F2] text-white text-[10px] font-bold">FB: {fb.filter(m=>m.author_name!=="System Scanner").length || fb.length} live</span>
                <span className="px-3 py-1.5 rounded-full bg-white border text-[10px] font-bold">IG: {ig.filter(m=>m.author_name!=="System Scanner").length? `${ig.length} found` : "scanning 24/7"}</span>
                <span className="px-3 py-1.5 rounded-full bg-white border text-[10px] font-bold">THREADS: {threads.filter(m=>m.author_name!=="System Scanner").length? `${threads.length}` : "scanning 24/7"}</span>
                <span className="px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-bold">X: {x.length}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] tracking-widest text-black/40">TOTAL MENTIONS</div>
              <div className="font-black text-[28px] leading-none">{realMentions.length || mentions.length} live</div>
              <div className="text-[11px] text-black/50">{totalLikes} likes</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] bg-black text-white p-5 md:p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-[12px] tracking-widest">LIVE MENTIONS • FB / IG / THREADS / X</h2>
            <div className="text-[10px] opacity-50">Auto-refresh 15 min</div>
          </div>
          <div className="mt-5 grid gap-3">
            {mentions.length===0 && <div className="rounded-[16px] bg-white/5 border border-white/10 p-6 text-center text-[13px]">Scanning for "{politician.name}"...</div>}
            {mentions.map(m=>(
              <div key={m.id} className="rounded-[16px] p-4 border bg-white/[0.06] border-white/10">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-black">{m.platform.toUpperCase()}</span>
                  <span className="text-[11px] opacity-60">{m.sentiment} • {m.author_name}</span>
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-white/90">{m.text}</div>
                <div className="mt-2 text-[11px] opacity-60">{m.likes>0 && `❤️ ${m.likes} `}{m.comments>0 && `💬 ${m.comments} `}{m.url && <a href={m.url} target="_blank" className="underline">View</a>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}