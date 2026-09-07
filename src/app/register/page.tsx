"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const COUNTIES = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Muranga","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const PARTIES = ["UDA","ODM","Wiper","Jubilee","ANC","FORD-Kenya","KANU","Independent","Other"];
const ROLES = ["Governor","Senator","MP","MCA","Woman Rep","Youth Leader"];

export default function Page(){
  const router = useRouter();
  const [f,setF]=useState<any>({tier:"free"});
  const [loading,setLoading]=useState(false);
  async function submit(e:any){
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.from("politicians").insert([{ name:f.name, id_number:f.idNumber, email:f.email, phone:f.phone, county:f.county, party:f.party, role:f.role, tier:f.tier, verified:false }]);
    setLoading(false);
    if(error){ alert(error.message); return; }
    if(f.tier==="free") alert("FREE registered!");
    if(f.tier==="verified") alert("VERIFIED KES 4,500 - Pay M-Pesa to complete");
    if(f.tier==="featured") alert("FEATURED KES 9,500 - Pay M-Pesa to complete");
    router.push("/admin");
  }
  return (
    <main className="min-h-screen bg-[#050507] text-white flex justify-center px-6 py-12">
      <div className="w-full max-w-[640px]">
        <div className="mb-8"><h1 className="text-[48px] font-black leading-[0.9]">Register<br/><span className="text-white/30">Politician.</span></h1><p className="text-white/40 text-sm mt-2">Choose your listing tier</p></div>
        <form onSubmit={submit} className="rounded-[32px] bg-[#121214] border border-white/10 p-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Full Name" onChange={e=>setF({...f,name:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <input required placeholder="ID Number" onChange={e=>setF({...f,idNumber:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <input required placeholder="Phone (M-Pesa)" onChange={e=>setF({...f,phone:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <input required type="email" placeholder="Email" onChange={e=>setF({...f,email:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/>
            <select required onChange={e=>setF({...f,county:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">County</option>{COUNTIES.map(c=><option key={c}>{c}</option>)}</select>
            <select required onChange={e=>setF({...f,party:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Party</option>{PARTIES.map(p=><option key={p}>{p}</option>)}</select>
            <select required onChange={e=>setF({...f,role:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10"><option value="">Role</option>{ROLES.map(r=><option key={r}>{r}</option>)}</select>
          </div>
          <div className="grid grid-cols-1 gap-3 pt-4">
            <button type="button" onClick={()=>setF({...f,tier:"free"})} className={`h-[72px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="free"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px]">FREE - Basic listing</div><div className="text-[10px] opacity-60">30 days • Standard rank</div></div><div className="font-black text-[14px]">KES 0</div></button>
            <button type="button" onClick={()=>setF({...f,tier:"verified"})} className={`h-[72px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="verified"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px]">VERIFIED</div><div className="text-[10px] opacity-60">Badge + top rank</div></div><div className="font-black text-[14px]">KES 4,500</div></button>
            <button type="button" onClick={()=>setF({...f,tier:"featured"})} className={`h-[84px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="featured"? "bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.2)]" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px] flex items-center gap-2">FEATURED <span className="text-[8px] px-2 py-0.5 rounded-full bg-black text-[#FFD700] tracking-widest">BEST VALUE</span></div><div className="text-[10px] opacity-70">Homepage + ads + Verified</div></div><div className="font-black text-[16px]">KES 9,500</div></button>
          </div>
          <div className="pt-2 text-[11px] text-white/30 text-center">M-Pesa Paybill • Lipa na M-Pesa to activate VERIFIED / FEATURED</div>
          <button disabled={loading} className="w-full h-[56px] rounded-full bg-white text-black font-black tracking-wide">{loading?"Saving to Supabase...":"Create Politician ->"}</button>
        </form>
      </div>
    </main>
  )
}