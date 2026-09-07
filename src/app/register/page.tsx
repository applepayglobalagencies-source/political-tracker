"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const COUNTIES = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Muranga","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const PARTIES = ["UDA","ODM","Wiper","Jubilee","ANC","FORD-Kenya","KANU","Independent","Other"];
const ROLES = ["Governor","Senator","MP","MCA","Woman Rep","Youth Leader","Campaign Manager"];

export default function Page(){
  const router = useRouter();
  const [f,setF]=useState<any>({tier:"free"});
  const [loading,setLoading]=useState(false);
  async function submit(e:any){
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.from("politicians").insert([{ name:f.name, id_number:f.idNumber, email:f.email, phone:f.phone, county:f.county, party:f.party, role:f.role, tier:f.tier, verified:false }]);
    setLoading(false);
    if(error){ alert(error.message); return; }
    alert("Registered LIVE to Supabase!");
    router.push("/admin");
  }
  return (
    <main className="min-h-screen bg-[#050507] text-white flex justify-center px-6 py-12">
      <div className="w-full max-w-[640px]">
        <div className="mb-8"><div className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.2em] text-white/60">SUPABASE LIVE • dnpjffnyjveywyurhekh</div><h1 className="mt-4 text-[48px] leading-[0.9] font-black tracking-tight">Register<br/><span className="text-white/30">Politician.</span></h1><p className="mt-3 text-white/40 text-sm">Production DB connected. Data goes straight to Supabase.</p></div>
        <form onSubmit={submit} className="rounded-[32px] bg-[#121214] border border-white/10 p-8 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Full Name" onChange={e=>setF({...f,name:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none focus:border-white/20"/>
            <input required placeholder="ID Number" onChange={e=>setF({...f,idNumber:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <input required placeholder="Phone" onChange={e=>setF({...f,phone:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <input required type="email" placeholder="Email" onChange={e=>setF({...f,email:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <select required onChange={e=>setF({...f,county:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">County</option>{COUNTIES.map(c=><option key={c}>{c}</option>)}</select>
            <select required onChange={e=>setF({...f,party:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Party</option>{PARTIES.map(p=><option key={p}>{p}</option>)}</select>
            <select required onChange={e=>setF({...f,role:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Role</option>{ROLES.map(r=><option key={r}>{r}</option>)}</select>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button type="button" onClick={()=>setF({...f,tier:"free"})} className={`h-[72px] rounded-[20px] border text-left px-5 ${f.tier==="free"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div className="font-black">FREE</div><div className="text-[10px] opacity-60">Basic listing</div></button>
            <button type="button" onClick={()=>setF({...f,tier:"verified"})} className={`h-[72px] rounded-[20px] border text-left px-5 ${f.tier==="verified"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div className="font-black">VERIFIED • KES 2,500</div><div className="text-[10px] opacity-60">Badge + top rank</div></button>
          </div>
          <button disabled={loading} className="w-full h-[56px] rounded-full bg-white text-black font-black text-[14px] tracking-wide hover:bg-white/90 transition">{loading?"Saving to Supabase...":"Create Politician ->"}</button>
        </form>
      </div>
    </main>
  )
}