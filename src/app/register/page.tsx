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
  const [showPay,setShowPay]=useState(false);
  async function submit(e:any){
    e.preventDefault();
    if(f.tier!=="free" &&!showPay){ setShowPay(true); return; }
    if(f.tier!=="free" &&!f.mpesaCode){ alert("Please paste M-Pesa code after paying Till 8629094"); return; }
    setLoading(true);
    const { error } = await supabase.from("politicians").insert([{ name:f.name, id_number:f.idNumber, email:f.email, phone:f.phone, county:f.county, party:f.party, role:f.role, tier:f.tier, verified:false, mpesa_code:f.mpesaCode||"", payment_status: f.tier==="free"?"paid":"pending" }]);
    setLoading(false);
    if(error){ alert(error.message); return; }
    if(f.tier==="free") alert("FREE registered!");
    else alert("Payment received! Code "+f.mpesaCode+" submitted. Till 8629094. We verify in 10 mins and you go FEATURED.");
    window.open("https://wa.me/254758973109?text="+encodeURIComponent("Hi, I just paid Till 8629094 - "+f.tier+" - "+f.name+" - Code: "+f.mpesaCode), "_blank"); router.push("/");
  }
  return (
    <main className="min-h-screen bg-[#050507] text-white flex justify-center px-6 py-12">
      <div className="w-full max-w-[640px]">
        <h1 className="text-[48px] font-black leading-[0.9]">Register<br/><span className="text-white/30">Politician.</span></h1>
        <form onSubmit={submit} className="mt-8 rounded-[32px] bg-[#121214] border border-white/10 p-8 space-y-4">
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
            <button type="button" onClick={()=>{setF({...f,tier:"free"}); setShowPay(false);}} className={`h-[72px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="free"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px]">FREE - Basic listing</div><div className="text-[10px] opacity-60">30 days</div></div><div className="font-black">KES 0</div></button>
            <button type="button" onClick={()=>{setF({...f,tier:"verified"}); setShowPay(true);}} className={`h-[72px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="verified"? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px]">VERIFIED</div><div className="text-[10px] opacity-60">Badge + top rank</div></div><div className="font-black">KES 4,500</div></button>
            <button type="button" onClick={()=>{setF({...f,tier:"featured"}); setShowPay(true);}} className={`h-[84px] rounded-[20px] border text-left px-6 flex justify-between items-center ${f.tier==="featured"? "bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.2)]" : "bg-white/5 border-white/10 text-white/60"}`}><div><div className="font-black text-[13px]">FEATURED</div><div className="text-[10px] opacity-70">Homepage + ads + Verified</div></div><div className="font-black">KES 9,500</div></button>
          </div>
          {showPay && f.tier!=="free" && (
            <div className="rounded-[20px] bg-[#FFD700]/10 border border-[#FFD700]/30 p-5 space-y-3 animate-in">
              <div className="font-black text-[13px] text-[#FFD700]">Lipa na M-Pesa - Till 8629094</div>
              <div className="rounded-[12px] bg-black border border-white/10 p-4 text-[12px] leading-relaxed font-mono">
                <div className="text-white/40 text-[10px] tracking-widest">STEPS</div>
                <div className="mt-2 text-white/80">1. M-Pesa -> Lipa na M-Pesa<br/>2. Buy Goods and Services<br/>3. Till No: <span className="text-[#FFD700] font-black text-[16px]">8629094</span><br/>4. Amount: <span className="font-black text-white">{f.tier==="verified"?"4,500":"9,500"}</span><br/>5. PIN -> Send</div>
              </div>
              <input required placeholder="Paste M-Pesa Code e.g. QGI7..." value={f.mpesaCode||""} onChange={e=>setF({...f,mpesaCode:e.target.value.toUpperCase()})} className="w-full h-[56px] px-6 rounded-full bg-black border border-[#FFD700]/30 outline-none text-white font-mono tracking-widest"/>
              <div className="text-[10px] text-white/40 text-center">We verify code Qxx... in admin then you appear GOLD on homepage</div>
            </div>
          )}
          <button disabled={loading} className="w-full h-[56px] rounded-full bg-white text-black font-black">{loading?"Submitting...": showPay && f.tier!=="free"? "Submit M-Pesa Code ->" : "Create Politician ->"}</button>
        </form>
      </div>
    </main>
  )
}