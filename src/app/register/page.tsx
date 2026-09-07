"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Register(){
  const [form,setForm]=useState({ name:"", county:"Bomet", role:"MCA", party:"UDA", phone:"", email:"", aliases:"", mpesa_code:"" });
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  const submit = async()=>{
    if(!form.name ||!form.phone ||!form.mpesa_code) return alert("Fill Name, Phone, M-Pesa Code");
    setLoading(true);
    const emailVal = form.email || `${form.phone}@tracker.ke`; // dummy if empty
    const { data, error } = await supabase.from("politicians").insert([{
      name: form.name,
      email: emailVal,
      county: form.county,
      role: form.role,
      party: form.party,
      phone: form.phone,
      aliases: form.aliases,
      mpesa_code: form.mpesa_code,
      tier: "verified",
      verified: false,
    }]).select().single();
    setLoading(false);
    if(error) return alert("Insert error: "+error.message);
    router.push(`/politician/${data.id}?new=1`);
  };

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111] grid place-items-center p-6">
      <div className="w-full max-w-[480px] rounded-[24px] bg-white border border-black/10 p-8">
        <div className="h-10 w-10 rounded-full bg-black text-white grid place-items-center font-black">PT</div>
        <h1 className="mt-4 font-black text-[22px] text-black leading-tight">Get Verified & See<br/>What People Say About You</h1>
        <p className="mt-2 text-[12px] text-black/60">We track Facebook, Instagram, Threads. Till 8629094</p>
        <div className="mt-6 space-y-3">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full Name e.g. Hon Wakili Hillary Sigei" className="w-full h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black placeholder:text-black/40 outline-none"/>
          <input value={form.aliases} onChange={e=>setForm({...form, aliases:e.target.value})} placeholder="Nicknames: Top Loya, Top Lawyer" className="w-full h-12 px-5 rounded-full bg-[#FFF7CC] border border-[#FFD700]/40 text-[13px] text-black font-bold outline-none"/>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email (optional)" className="w-full h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black placeholder:text-black/40 outline-none"/>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.county} onChange={e=>setForm({...form, county:e.target.value})} placeholder="County" className="h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black outline-none"/>
            <input value={form.role} onChange={e=>setForm({...form, role:e.target.value})} placeholder="Role: MCA, Senator..." className="h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.party} onChange={e=>setForm({...form, party:e.target.value})} placeholder="Party: UDA" className="h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black outline-none"/>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="WhatsApp e.g. 0711..." className="h-12 px-5 rounded-full bg-[#F3F3F2] border text-[13px] text-black outline-none"/>
          </div>
          <div className="rounded-[16px] bg-black text-white p-4">
            <div className="text-[11px] opacity-50">LIPA NA M-PESA</div>
            <div className="mt-1 font-black text-[14px]">Till 8629094 • Buy Goods</div>
            <input value={form.mpesa_code} onChange={e=>setForm({...form, mpesa_code:e.target.value})} placeholder="M-Pesa Code: UGI3F3V26R" className="mt-3 w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-[13px] text-white placeholder:text-white/40 outline-none"/>
          </div>
        </div>
        <button onClick={submit} disabled={loading} className="mt-5 w-full h-12 rounded-full bg-[#25D366] text-black font-black text-[13px]">{loading? "Submitting..." : "Submit & See My Mentions →"}</button>
      </div>
    </main>
  )
}