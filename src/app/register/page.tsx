"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Register(){
  const [form,setForm]=useState({ name:"", county:"Bomet", role:"MCA", party:"UDA", phone:"", aliases:"", mpesa_code:"" });
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  const submit = async()=>{
    if(!form.name ||!form.phone ||!form.mpesa_code) return alert("Fill Name, Phone, M-Pesa Code");
    setLoading(true);
    const { data, error } = await supabase.from("politicians").insert([{
      name: form.name,
      county: form.county,
      role: form.role,
      party: form.party,
      phone: form.phone,
      aliases: form.aliases,
      mpesa_code: form.mpesa_code,
      mpesaCode: form.mpesa_code,
      tier: "verified",
      verified: false,
    }]).select().single();
    setLoading(false);
    if(error) return alert(error.message);
    router.push(`/politician/${data.id}?new=1`);
  };

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111] grid place-items-center p-6">
      <div className="w-full max-w-[480px] rounded-[24px] bg-white border border-black/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="h-10 w-10 rounded-full bg-black text-white grid place-items-center font-black text-[14px]">PT</div>
        <h1 className="mt-4 font-black text-[22px] leading-tight text-black">Get Verified & See<br/>What People Say About You</h1>
        <p className="mt-2 text-[12px] text-black/60">We track Facebook, Instagram, Threads mentions of you in {form.county}. Till 8629094</p>

        <div className="mt-6 space-y-3">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full Official Name e.g. Hon Felix Kipyegon" className="w-full h-12 px-5 rounded-full bg-[#F3F3F2] border border-black/10 text-[13px] text-black placeholder:text-black/40 outline-none focus:border-black/20"/>
          <input value={form.aliases} onChange={e=>setForm({...form, aliases:e.target.value})} placeholder="Nicknames people use: e.g. Kimoche, Kip, Albats" className="w-full h-12 px-5 rounded-full bg-[#FFF7CC] border border-[#FFD700]/40 text-[13px] text-black placeholder:text-black/50 outline-none font-bold"/>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.county} onChange={e=>setForm({...form, county:e.target.value})} placeholder="County" className="h-12 px-5 rounded-full bg-[#F3F3F2] border border-black/10 text-[13px] text-black placeholder:text-black/40 outline-none"/>
            <input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} placeholder="Role: MCA, MP..." className="h-12 px-5 rounded-full bg-[#F3F3F2] border border-black/10 text-[13px] text-black placeholder:text-black/40 outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.party} onChange={e=>setForm({...form, party:e.target.value})} placeholder="Party: UDA..." className="h-12 px-5 rounded-full bg-[#F3F3F2] border border-black/10 text-[13px] text-black placeholder:text-black/40 outline-none"/>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="WhatsApp e.g. 0758..." className="h-12 px-5 rounded-full bg-[#F3F3F2] border border-black/10 text-[13px] text-black placeholder:text-black/40 outline-none"/>
          </div>
          <div className="rounded-[16px] bg-black text-white p-4">
            <div className="text-[11px] tracking-widest opacity-50">LIPA NA M-PESA</div>
            <div className="mt-1 font-black text-[14px] text-white">Till No: 8629094 • Buy Goods</div>
            <div className="mt-1 text-[11px] text-white/60">KES 4,500 Verified • KES 9,500 Featured Gold (Homepage)</div>
            <input value={form.mpesa_code} onChange={e=>setForm({...form, mpesa_code:e.target.value})} placeholder="Enter M-Pesa Code e.g. SHX123..." className="mt-3 w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-[13px] text-white placeholder:text-white/40 outline-none"/>
          </div>
        </div>

        <button onClick={submit} disabled={loading} className="mt-5 w-full h-12 rounded-full bg-[#25D366] text-black font-black text-[13px] hover:bg-[#20BD5A] transition">{loading? "Submitting..." : "Submit & See My Mentions →"}</button>
        <div className="mt-3 text-center text-[10px] text-black/40">After payment, admin verifies in 10 mins • WhatsApp 0758973109</div>
      </div>
    </main>
  )
}