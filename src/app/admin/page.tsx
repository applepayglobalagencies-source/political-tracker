"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Admin(){
  const [users,setUsers]=useState<any[]>([]);
  const [ok,setOk]=useState(false);
  const [p,setP]=useState("");
  const [q,setQ]=useState("");
  async function load(){ const {data}=await supabase.from("politicians").select("*").order("created_at",{ascending:false}); setUsers(data||[]); }
  useEffect(()=>{ if(ok) load(); },[ok]);
  if(!ok) return (<main className="min-h-screen bg-black grid place-items-center p-6"><div className="w-[380px] rounded-[28px] bg-[#121214] border border-white/10 p-8 text-white"><h1 className="text-[24px] font-black">Admin • Till 8629094</h1><input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="admin123" className="mt-6 w-full h-[56px] px-6 rounded-full bg-[#1A1A1E] border border-white/10 outline-none"/><button onClick={()=>{ if(p==="admin123") setOk(true); else alert("wrong"); }} className="mt-4 w-full h-[56px] rounded-full bg-white text-black font-black">Unlock</button></div></main>);
  return (
    <main className="min-h-screen bg-[#050507] text-white p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4"><h1 className="text-[32px] font-black">Till 8629094 • {users.length} Politicians • KES {users.filter((u:any)=>u.payment_status==="pending").length} Pending</h1><div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search M-Pesa code..." className="h-11 w-[260px] px-5 rounded-full bg-white/5 border border-white/10 outline-none"/><button onClick={load} className="h-11 px-6 rounded-full bg-white text-black font-black text-sm">Refresh</button></div></div>
        <div className="mt-8 grid grid-cols-1 gap-4">
          {users.filter(u => (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.mpesa_code||"").toLowerCase().includes(q.toLowerCase())).map((u:any)=>(
            <div key={u.id} className={`rounded-[24px] border p-6 flex justify-between items-center ${u.tier==="featured"? "border-[#FFD700]/40 bg-[#FFD700]/5" : u.tier==="verified"? "border-white/20 bg-white/[0.06]" : "border-white/5 bg-[#121214]"}`}>
              <div className="flex-1"><div className="flex items-center gap-3 flex-wrap"><div className="font-black">{u.name}</div>{u.tier==="featured"? <span className="text-[9px] px-2.5 py-1 rounded-full bg-[#FFD700] text-black font-black">FEATURED 9,500</span> : u.tier==="verified"? <span className="text-[9px] px-2.5 py-1 rounded-full bg-white text-black font-black">VERIFIED 4,500</span> : <span className="text-[9px] px-2.5 py-1 rounded-full bg-white/10 text-white/40">FREE</span>}{u.mpesa_code && <span className="text-[10px] px-3 py-1 rounded-full bg-black border border-white/20 font-mono text-[#FFD700]">M-Pesa: {u.mpesa_code} • {u.payment_status}</span>}</div><div className="text-[12px] text-white/50 mt-2">{u.county} • {u.party} • {u.role} • {u.phone}</div></div>
              <div className="flex flex-col gap-2 ml-4"><button onClick={async()=>{ await supabase.from("politicians").update({verified:true, payment_status:"paid"}).eq("id",u.id); load(); }} className="h-10 px-5 rounded-full bg-green-500 text-black font-black text-[11px]">✓ Approve & Verify</button><button onClick={async()=>{ await supabase.from("politicians").delete().eq("id",u.id); load(); }} className="h-8 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">Delete</button></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}