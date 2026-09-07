"use client";
import { useState } from "react"; import { useRouter } from "next/navigation";

const COUNTIES = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const PARTIES = ["UDA","ODM","Wiper","Jubilee","ANC","FORD-Kenya","KANU","Independent","Other"];
const ROLES = ["Governor","Senator","MP","Woman Rep","MCA","Campaign Manager","Journalist","Analyst","Youth Leader"];

export default function ProRegister(){
  const r=useRouter();
  const [step,setStep]=useState(1);
  const [otpSent,setOtpSent]=useState(false);
  const [form,setForm]=useState<any>({});
  const [photo,setPhoto]=useState("");

  return (<main className="min-h-screen bg-[#050508] text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#008C51]/15 via-transparent to-[#CE1126]/10 blur-[120px] pointer-events-none"/>
    <div className="relative max-w-[1280px] mx-auto px-6 py-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">

      <div className="hidden lg:block sticky top-10 h-fit">
        <a href="/" className="flex items-center gap-3"><div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#CE1126] to-[#008C51] grid place-items-center font-black shadow-[0_0_20px_rgba(0,140,81,0.4)]">K</div><div><p className="font-black tracking-tighter">POLITICAL TRACKER KE</p><p className="text-[10px] tracking-[0.3em] text-white/30">PRO • SPECIAL EDITION</p></div></a>
        <h1 className="mt-14 text-[64px] font-black leading-[0.85] tracking-[-0.05em]">Claim<br/><span className="text-white/20">your power.</span></h1>
        <div className="mt-10 space-y-4">
          <div className="flex gap-3"><div className={`h-9 w-9 rounded-full grid place-items-center font-bold ${step>=1?'bg-white text-black':'bg-white/10'}`}>1</div><div><p className="font-bold text-sm">Identity</p><p className="text-xs text-white/40">Name, ID, Phone OTP</p></div></div>
          <div className="flex gap-3"><div className={`h-9 w-9 rounded-full grid place-items-center font-bold ${step>=2?'bg-white text-black':'bg-white/10'}`}>2</div><div><p className="font-bold text-sm">Political Profile</p><p className="text-xs text-white/40">County, Party, Role</p></div></div>
          <div className="flex gap-3"><div className={`h-9 w-9 rounded-full grid place-items-center font-bold ${step>=3?'bg-white text-black':'bg-white/10'}`}>3</div><div><p className="font-bold text-sm">Verification & Payment</p><p className="text-xs text-white/40">Photo, ID upload, M-Pesa</p></div></div>
        </div>
        <div className="mt-12 rounded-[24px] bg-white/[0.04] border border-white/10 p-5"><p className="text-xs tracking-widest text-white/40">WHY VERIFY?</p><ul className="mt-3 space-y-2 text-sm text-white/70 list-disc ml-4"><li>✓ badge on public tracker</li><li>Publish statements instantly</li><li>Access private county sentiment</li><li>Rank # tracking vs opponents</li></ul></div>
      </div>

      <div className="relative rounded-[32px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-2 backdrop-blur-2xl shadow-2xl">
        <div className="rounded-[24px] bg-[#0E0E11] border border-white/[0.06] p-7 lg:p-8">
          <div className="flex justify-between items-center"><h2 className="text-2xl font-black tracking-tighter">Pro Registration</h2><span className="text-[10px] px-3 py-1 rounded-full bg-[#008C51]/20 text-[#00FF88] border border-[#008C51]/20 font-black">STEP {step}/3</span></div>

          <form onSubmit={(e:any)=>{
            e.preventDefault();
            if(step<3){ setStep(step+1); return; }
            const users=JSON.parse(localStorage.getItem("pt_users")||"[]");
            const newUser={...form, photo, verified:false, tier:form.tier||"free", created:Date.now()};
            users.push(newUser);
            localStorage.setItem("pt_users", JSON.stringify(users));
            localStorage.setItem("pt_session", JSON.stringify(newUser));
            r.push("/dashboard");
          }} className="mt-8 space-y-4">

            {step===1&&<>
              <div className="grid grid-cols-2 gap-3"><input required placeholder="Full Legal Name (as on ID)" onChange={e=>setForm({...form,name:e.target.value})} className="col-span-2 h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none focus:border-white/30 placeholder:text-white/30"/><input required placeholder="ID / Passport Number" onChange={e=>setForm({...form,idNumber:e.target.value})} className="h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/><input required placeholder="Phone (07...)" onChange={e=>setForm({...form,phone:e.target.value})} className="h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/></div>
              <div className="flex gap-3"><input required placeholder="Enter OTP (we sent 1234)" className="flex-1 h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/><button type="button" onClick={()=>setOtpSent(true)} className="h-[56px] px-6 rounded-full bg-white/10 border border-white/10 font-bold text-sm">{otpSent?"OTP Sent ✓":"Send OTP"}</button></div>
              <input required type="email" placeholder="Official Email" onChange={e=>setForm({...form,email:e.target.value})} className="w-full h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/><input required type="password" placeholder="Create Password" onChange={e=>setForm({...form,password:e.target.value})} className="w-full h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/>
            </>}

            {step===2&&<>
              <select required onChange={e=>setForm({...form,role:e.target.value})} className="w-full h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"><option value="">Select Role</option>{ROLES.map(r=><option key={r} value={r}>{r}</option>)}</select>
              <div className="grid grid-cols-2 gap-3"><select required onChange={e=>setForm({...form,county:e.target.value})} className="h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"><option value="">County</option>{COUNTIES.map(c=><option key={c} value={c}>{c}</option>)}</select><input placeholder="Constituency / Ward" onChange={e=>setForm({...form,constituency:e.target.value})} className="h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/></div>
              <select required onChange={e=>setForm({...form,party:e.target.value})} className="w-full h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"><option value="">Political Party</option>{PARTIES.map(p=><option key={p} value={p}>{p}</option>)}</select>
              <div className="grid grid-cols-2 gap-3"><input placeholder="X (Twitter) @handle" onChange={e=>setForm({...form,twitter:e.target.value})} className="h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/><input placeholder="Facebook Page" onChange={e=>setForm({...form,facebook:e.target.value})} className="h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/></div>
            </>}

            {step===3&&<>
              <div className="rounded-2xl bg-white/[0.04] border border-dashed border-white/15 p-6 text-center"><input type="file" id="photo" accept="image/*" onChange={(e:any)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=ev=>setPhoto(ev.target?.result as string); r.readAsDataURL(f);}}} className="hidden"/><label htmlFor="photo" className="cursor-pointer">{photo?<img src={photo} className="h-24 w-24 rounded-full mx-auto object-cover border-2 border-white"/>:<div className="h-24 w-24 rounded-full bg-white/10 mx-auto grid place-items-center text-3xl">📸</div>}<p className="mt-3 font-bold text-sm">{photo?"Photo Selected ✓":"Upload Official Portrait *"}</p><p className="text-xs text-white/40">PNG/JPG, max 5MB</p></label></div>
              <div className="rounded-2xl bg-white/[0.04] border border-dashed border-white/15 p-6"><p className="font-bold text-sm">Upload ID (Private, for verification only) *</p><input type="file" className="mt-3 w-full text-sm text-white/60 file:mr-3 file:h-10 file:px-5 file:rounded-full file:bg-white file:text-black file:font-bold file:border-0"/></div>

              <div className="rounded-[20px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 p-5"><p className="font-black text-sm">Choose Tier *</p><div className="mt-4 space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-black border border-white/10 cursor-pointer hover:border-white/20"><div className="flex items-center gap-3"><input type="radio" name="tier" defaultChecked onChange={()=>setForm({...form,tier:"free"})}/><div><p className="font-bold text-sm">Free • Public</p><p className="text-xs text-white/40">View only, no badge</p></div></div><span className="font-black">KES 0</span></label>
                <label className="flex items-center justify-between p-4 rounded-2xl bg-white text-black cursor-pointer"><div className="flex items-center gap-3"><input type="radio" name="tier" onChange={()=>setForm({...form,tier:"verified"})}/><div><p className="font-black text-sm">Verified Politician ✓</p><p className="text-xs opacity-60">Badge + Dashboard + M-Pesa</p></div></div><span className="font-black">2,500/mo</span></label>
                <label className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#CE1126]/20 to-[#008C51]/20 border border-white/20 cursor-pointer"><div className="flex items-center gap-3"><input type="radio" name="tier" onChange={()=>setForm({...form,tier:"special"})}/><div><p className="font-black text-sm">SPECIAL • Ranked # + Press</p><p className="text-xs text-white/60">Publish, Report PDF, Support</p></div></div><span className="font-black">9,999/mo</span></label>
              </div></div>

              <label className="flex gap-3 text-xs text-white/50 leading-5"><input type="checkbox" required className="mt-1"/> I confirm details are true, I consent to processing under Kenya Data Protection Act 2019, and I agree to verification review within 24h.</label>
            </>}

            <div className="flex gap-3 pt-2">{step>1&&<button type="button" onClick={()=>setStep(step-1)} className="h-[56px] px-8 rounded-full bg-white/5 border border-white/10 font-bold">Back</button>}<button className="flex-1 h-[56px] rounded-full bg-white text-black font-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.01] transition">{step===3?"Create Verified Profile → M-Pesa":"Continue → Step "+(step+1)}</button></div>
            <p className="text-center text-xs text-white/30 pt-2">Already verified? <a href="/login" className="text-white font-bold underline">Login</a> • <a href="/" className="text-white/60">Home</a></p>
          </form>
        </div>
      </div>
    </div>
  </main>)
}
