"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";

export default function Profile(){
  const { id } = useParams();
  const [u,setU]=useState<any>(null);
  const [copied,setCopied]=useState(false);

  useEffect(()=>{ (async()=>{ const {data}=await supabase.from("politicians").select("*").eq("id",id).single(); setU(data); })(); },[id]);

  async function share(){
    const url = window.location.href;
    if(navigator.share){ try{ await navigator.share({title: u.name + " - Political Tracker.KE", text: `Verified ${u.role} from ${u.county} - ${u.party}`, url}); }catch{} }
    else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),2000); }
  }

  if(!u) return <main className="min-h-screen bg-[#050507] grid place-items-center text-white/40">Loading profile...</main>;

  const whatsappMsg = `Hi, I saw ${u.name} on Political Tracker.KE - Till 8629094 - I want to connect`;
  const waLink = `https://wa.me/254758973109?text=${encodeURIComponent(whatsappMsg)}`;
  const adminWa = `https://wa.me/254758973109?text=${encodeURIComponent(`Hi, I just paid Till 8629094 for ${u.tier} - ${u.name} - Code: ${u.mpesa_code}. Please verify.`)}`;

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <header className="max-w-[900px] mx-auto px-8 py-7 flex justify-between"><Link href="/" className="font-black">POLITICAL TRACKER<span className="text-white/30">.KE</span></Link><Link href="/" className="h-9 px-5 rounded-full bg-white/10 border border-white/10 grid place-items-center text-sm">← Back</Link></header>

      <div className="max-w-[900px] mx-auto px-8 pb-20">
        <div className={`rounded-[32px] p-[1px] ${u.tier==="featured"? "bg-[#FFD700] shadow-[0_0_60px_rgba(255,215,0,0.25)]" : u.tier==="verified"? "bg-white/20" : "bg-white/10"}`}>
          <div className="rounded-[31px] bg-[#121214] p-8 md:p-10">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-[40px] font-black leading-none tracking-tight">{u.name}</h1>
                  {u.tier==="featured"? <span className="px-3 py-1 rounded-full bg-[#FFD700] text-black text-[10px] font-black tracking-widest">FEATURED • KES 9,500</span> : u.tier==="verified"? <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-black tracking-widest">VERIFIED • KES 4,500</span> : <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/40 text-[10px] font-bold">FREE</span>}
                  {u.verified && <span className="px-2 py-1 rounded-full bg-green-500 text-white text-[9px] font-black">✓ APPROVED</span>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10">{u.role}</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10">{u.county} County</span>
                  <span className="px-3 py-1.5 rounded-full bg-white text-black font-black">{u.party}</span>
                </div>
                <div className="mt-6 text-[13px] text-white/40 leading-relaxed max-w-[500px]">
                  {u.name} is a verified {u.role} from {u.county} representing {u.party}. Listed on Political Tracker.KE — Kenya's first verified political directory. Till 8629094.
                </div>
              </div>
              <div className="w-full md:w-[260px] space-y-3">
                <a href={`tel:${u.phone}`} className="w-full h-[48px] rounded-full bg-white text-black font-black text-[13px] grid place-items-center">📞 Call {u.phone}</a>
                <a href={waLink} target="_blank" className="w-full h-[48px] rounded-full bg-[#25D366] text-black font-black text-[13px] grid place-items-center">WhatsApp Politician</a>
                <a href={`mailto:${u.email}`} className="w-full h-[48px] rounded-full bg-white/10 border border-white/10 font-bold text-[13px] grid place-items-center">✉️ Email</a>
                <button onClick={share} className="w-full h-[48px] rounded-full bg-white/5 border border-white/10 font-bold text-[13px] grid place-items-center">{copied? "✓ Link Copied!" : "🔗 Share Profile"}</button>
              </div>
            </div>

            {u.tier!=="free" && (
              <div className="mt-8 rounded-[16px] bg-black border border-white/10 p-4 flex justify-between items-center text-[11px]">
                <div className="text-white/40">M-Pesa Payment</div>
                <div className="font-mono text-[#FFD700]">{u.mpesa_code || "PAID"} • Till 8629094 • {u.payment_status?.toUpperCase()}</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-[24px] bg-white text-black p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div><div className="font-black">Is this you? Claim this profile.</div><div className="text-[12px] opacity-60">Pay Till 8629094 to get Verified badge + Gold homepage</div></div>
          <div className="flex gap-2">
            <a href={`https://wa.me/254758973109?text=${encodeURIComponent(`Hi, I want to claim ${u.name} profile on Political Tracker.KE - Till 8629094`)}`} target="_blank" className="h-11 px-6 rounded-full bg-[#25D366] text-black font-black text-[12px] grid place-items-center">Claim via WhatsApp</a>
            <Link href="/register" className="h-11 px-6 rounded-full bg-black text-white font-black text-[12px] grid place-items-center">Register</Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-white/20">Share: political-tracker-orpin.vercel.app/politician/{u.id} • Political Tracker.KE • Till 8629094</div>
      </div>
    </main>
  )
}