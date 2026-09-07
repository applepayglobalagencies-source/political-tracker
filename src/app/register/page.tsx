"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const COUNTIES = ["Baringo","Bomet","Bungoma","Busia","Nairobi","Nakuru","Kiambu","Mombasa","Kisumu","Uasin Gishu","Kakamega","Machakos","Bomet","Kericho"];
const PARTIES = ["UDA","ODM","Wiper","Jubilee","Independent"];
const ROLES = ["Governor","Senator","MP","MCA","Woman Rep"];

export default function Page(){
  const router = useRouter();
  const [f,setF]=useState<any>({});
  const [loading,setLoading]=useState(false);
  async function submit(e:any){
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.from("politicians").insert([{ name:f.name, id_number:f.idNumber, email:f.email, phone:f.phone, county:f.county, party:f.party, role:f.role, tier:f.tier||"free", verified:false }]);
    setLoading(false);
    if(error){ alert(error.message); return; }
    alert("Saved to Supabase LIVE!"); router.push("/admin");
  }
  return (<main className="min-h-screen bg-black text-white p-8"><div className="max-w-[520px] mx-auto rounded-[24px] bg-[#121214] border border-white/10 p-8"><h1 className="text-3xl font-black">Register • Supabase LIVE</h1><p className="text-white/40 text-sm mt-2">DB: dnpjffnyjveywyurhekh</p><form onSubmit={submit} className="mt-6 space-y-3"><input required placeholder="Full Name" onChange={e=>setF({...f,name:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="ID Number" onChange={e=>setF({...f,idNumber:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required placeholder="Phone" onChange={e=>setF({...f,phone:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><input required type="email" placeholder="Email" onChange={e=>setF({...f,email:e.target.value})} className="w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><select required onChange={e=>setF({...f,county:e.target.value})} className="w-full h-12 px-5 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">County</option>{COUNTIES.map(c=><option key={c}>{c}</option>)}</select><select required onChange={e=>setF({...f,party:e.target.value})} className="w-full h-12 px-5 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Party</option>{PARTIES.map(p=><option key={p}>{p}</option>)}</select><select required onChange={e=>setF({...f,role:e.target.value})} className="w-full h-12 px-5 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Role</option>{ROLES.map(r=><option key={r}>{r}</option>)}</select><div className="flex gap-2 pt-2"><label className="flex-1 p-3 rounded-full bg-white/5 border border-white/10 text-center cursor-pointer"><input type="radio" name="tier" defaultChecked onChange={()=>setF({...f,tier:"free"})}/> Free</label><label className="flex-1 p-3 rounded-full bg-white text-black text-center font-black cursor-pointer"><input type="radio" name="tier" onChange={()=>setF({...f,tier:"verified"})}/> Verified</label></div><button disabled={loading} className="w-full h-14 rounded-full bg-white text-black font-black mt-4">{loading?"Saving...":"Create in Supabase →"}</button></form></div></main>)
}
