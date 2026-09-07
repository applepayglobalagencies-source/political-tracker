"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
export default function Page(){
  const r=useRouter(); const [f,setF]=useState<any>({}); const [loading,setLoading]=useState(false);
  async function submit(e:any){
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.from("politicians").insert([{ name:f.name, email:f.email, phone:f.phone, county:f.county, party:f.party, role:f.role }]);
    setLoading(false); if(error){ alert(error.message); return; } alert("Saved LIVE to Supabase!"); r.push("/admin");
  }
  return (<main className="min-h-screen bg-black text-white p-8"><div className="max-w-[520px] mx-auto bg-[#121214] border border-white/10 rounded-[24px] p-8"><h1 className="text-2xl font-black">Register - Supabase LIVE</h1><form onSubmit={submit} className="mt-6 space-y-3"><input required placeholder="Name" onChange={e=>setF({...f,name:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="Email" onChange={e=>setF({...f,email:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="Phone" onChange={e=>setF({...f,phone:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="County" onChange={e=>setF({...f,county:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="Party" onChange={e=>setF({...f,party:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="Role" onChange={e=>setF({...f,role:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><button disabled={loading} className="w-full h-12 rounded-full bg-white text-black font-black">{loading?"Saving...":"Save to DB"}</button></form></div></main>)
}
