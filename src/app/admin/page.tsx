"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin(){
  const [users,setUsers]=useState<any[]>([]);
  const [pass,setPass]=useState(""); const [ok,setOk]=useState(false);
  const [filter,setFilter]=useState("all");
  const ADMIN_PASS = "admin123"; // CHANGE THIS TO YOUR PIN

  useEffect(()=>{ if(!ok) return; (async()=>{ const {data}=await supabase.from("politicians").select("*").order("created_at",{ascending:false}); setUsers(data||[]); })(); },[ok]);

  const stats = {
    total: users.length,
    pending: users.filter(u=>!u.verified).length,
    verified: users.filter(u=>u.verified && u.tier==="verified").length,
    featured: users.filter(u=>u.verified && u.tier==="featured").length,
    revenue: users.filter(u=>u.verified).reduce((s,u)=> s + (u.tier==="featured"? 9500 : 4500), 0)
  };

  const approve = async(id:string, tier:string)=>{
    await supabase.from("politicians").update({ verified:true, tier }).eq("id", id);
    setUsers(users.map(u=>u.id===id? {...u, verified:true, tier}: u));
  };
  const reject = async(id:string)=>{
    if(!confirm("Delete this request?")) return;
    await supabase.from("politicians").delete().eq("id", id);
    setUsers(users.filter(u=>u.id!==id));
  };

  const filtered = users.filter(u=>{
    if(filter==="pending") return!u.verified;
    if(filter==="verified") return u.verified && u.tier==="verified";
    if(filter==="featured") return u.verified && u.tier==="featured";
    return true;
  });

  if(!ok) return (
    <main className="min-h-screen bg-[#F8F8F7] grid place-items-center p-8">
      <div className="w-full max-w-[380px] rounded-[24px] bg-white border border-black/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
        <div className="h-10 w-10 rounded-full bg-black text-white grid place-items-center font-black">PT</div>
        <h1 className="mt-5 font-black text-[20px] leading-tight">Admin Access<br/><span className="text-black/40 text-[14px] font-normal">Political Tracker.KE • Till 8629094</span></h1>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter admin PIN" className="mt-6 w-full h-12 px-5 rounded-full bg-black/5 border border-black/10 outline-none focus:border-black/20 text-[14px]"/>
        <button onClick={()=>{ if(pass===ADMIN_PASS) setOk(true); else alert("Wrong PIN"); }} className="mt-4 w-full h-12 rounded-full bg-black text-white font-black text-[13px]">Unlock Dashboard</button>
        <div className="mt-4 text-[10px] text-center opacity-40">WhatsApp 0758973109 • Protected</div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-[#111]">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-8 h-[64px] flex justify-between items-center">
          <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-black text-[12px]">PT</div><div className="font-black text-[14px]">ADMIN • TILL 8629094</div><div className="hidden md:flex ml-6 gap-2"><span className="h-6 px-3 rounded-full bg-black text-white text-[10px] font-bold grid place-items-center">{stats.total} TOTAL</span><span className="h-6 px-3 rounded-full bg-[#FFD700] text-black text-[10px] font-black grid place-items-center">KES {stats.revenue.toLocaleString()} REVENUE</span></div></div>
          <div className="flex items-center gap-2"><div className="text-[11px] opacity-50">WhatsApp: 0758973109</div><a href="/" className="h-8 px-4 rounded-full bg-black/5 text-[11px] font-bold grid place-items-center">View Site</a></div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="rounded-[20px] bg-white border border-black/5 p-5"><div className="text-[11px] tracking-widest opacity-50">PENDING</div><div className="font-black text-[28px] mt-1">{stats.pending}</div><div className="text-[10px] mt-1 opacity-40">Need approval</div></div>
          <div className="rounded-[20px] bg-white border border-black/5 p-5"><div className="text-[11px] tracking-widest opacity-50">VERIFIED</div><div className="font-black text-[28px] mt-1">{stats.verified}</div><div className="text-[10px] mt-1 opacity-40">KES 4,500 each</div></div>
          <div className="rounded-[20px] bg-[#FFD700] border border-black/5 p-5"><div className="text-[11px] tracking-widest opacity-70">FEATURED GOLD</div><div className="font-black text-[28px] mt-1">{stats.featured}</div><div className="text-[10px] mt-1 opacity-60">KES 9,500 each</div></div>
          <div className="rounded-[20px] bg-black text-white p-5"><div className="text-[11px] tracking-widest opacity-50">REVENUE</div><div className="font-black text-[22px] mt-1">KES {stats.revenue.toLocaleString()}</div><div className="text-[10px] mt-1 opacity-50">Till 8629094</div></div>
          <div className="rounded-[20px] bg-white border border-black/5 p-5"><div className="text-[11px] tracking-widest opacity-50">TOTAL</div><div className="font-black text-[28px] mt-1">{stats.total}</div><div className="text-[10px] mt-1 opacity-40">All registrations</div></div>
        </div>

        {/* FILTERS */}
        <div className="mt-8 flex gap-2">
          {[
            {k:"all", l:`All (${stats.total})`},
            {k:"pending", l:`Pending (${stats.pending})`},
            {k:"featured", l:`Featured (${stats.featured})`},
            {k:"verified", l:`Verified (${stats.verified})`}
          ].map(f=><button key={f.k} onClick={()=>setFilter(f.k)} className={`h-9 px-5 rounded-full text-[12px] font-bold border ${filter===f.k? "bg-black text-white border-black" : "bg-white border-black/10 text-black/60 hover:border-black/20"}`}>{f.l}</button>)}
        </div>

        {/* TABLE */}
        <div className="mt-6 rounded-[24px] bg-white border border-black/5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-black/5 text-[10px] tracking-widest opacity-60"><tr><th className="text-left p-4 font-bold">POLITICIAN</th><th className="text-left p-4 font-bold">COUNTY / ROLE</th><th className="text-left p-4 font-bold">TIER</th><th className="text-left p-4 font-bold">M-PESA CODE</th><th className="text-left p-4 font-bold">STATUS</th><th className="text-right p-4 font-bold">ACTION</th></tr></thead>
              <tbody>
                {filtered.map(u=>(
                  <tr key={u.id} className="border-t border-black/5 hover:bg-black/[0.02]">
                    <td className="p-4"><div className="font-bold">{u.name}</div><div className="text-[11px] opacity-60">{u.phone} • {u.id.slice(0,8)}</div></td>
                    <td className="p-4"><div className="font-medium">{u.county}</div><div className="text-[11px] opacity-60">{u.role} • {u.party}</div></td>
                    <td className="p-4"><span className={`h-6 px-3 rounded-full text-[10px] font-black inline-grid place-items-center ${u.tier==="featured"? "bg-[#FFD700] text-black" : u.tier==="verified"? "bg-black text-white" : "bg-black/10 text-black/60"}`}>{(u.tier||"free").toUpperCase()} • {u.tier==="featured"? "9,500" : u.tier==="verified"? "4,500" : "0"}</span></td>
                    <td className="p-4"><div className="font-mono font-bold tracking-widest bg-black/5 px-3 py-1 rounded-full inline-block text-[12px]">{u.mpesa_code || u.mpesaCode || "NO CODE"}</div><div className="text-[10px] opacity-40 mt-1">Till 8629094</div></td>
                    <td className="p-4">{u.verified? <span className="h-6 px-3 rounded-full bg-[#25D366] text-black text-[10px] font-black inline-grid place-items-center">✓ VERIFIED</span> : <span className="h-6 px-3 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold inline-grid place-items-center">PENDING</span>}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!u.verified && (<><button onClick={()=>approve(u.id, "verified")} className="h-8 px-4 rounded-full bg-black text-white text-[11px] font-bold">Approve 4,500</button><button onClick={()=>approve(u.id, "featured")} className="h-8 px-4 rounded-full bg-[#FFD700] text-black text-[11px] font-black">GOLD 9,500</button></>)}
                        {u.verified && (<><a href={`/politician/${u.id}`} target="_blank" className="h-8 px-4 rounded-full bg-black/5 text-[11px] font-bold grid place-items-center">View</a></>)}
                        <button onClick={()=>reject(u.id)} className="h-8 w-8 rounded-full bg-[#FF3B30]/10 text-[#FF3B30] grid place-items-center">×</button>
                      </div>
                      <div className="mt-2 flex justify-end gap-2">
                        <a href={`https://wa.me/${(u.phone||"").replace(/[^0-9]/g,"")}?text=${encodeURIComponent(`Mheshimiwa ${u.name}, payment yako ya Till 8629094 imepokelewa. Umekuwa ${u.tier} verified kwa Political Tracker.KE — https://political-tracker-orpin.vercel.app/politician/${u.id}`)}`} target="_blank" className="text-[10px] font-bold underline opacity-60">WhatsApp Him</a>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={6} className="p-12 text-center opacity-40 text-[13px]">No politicians in this filter. Till 8629094 waiting for first payment.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-[16px] bg-black text-white p-5 flex flex-col md:flex-row justify-between gap-4 text-[11px]">
          <div><span className="opacity-50">How to verify M-Pesa:</span> Check SMS from M-Pesa → Match code + amount (4,500 / 9,500) → Approve</div>
          <div className="font-mono opacity-60">Till 8629094 • WhatsApp 0758973109 • {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </main>
  )
}