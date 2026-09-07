"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin(){
  const [users,setUsers]=useState<any[]>([]);
  const [q,setQ]=useState("");
  const [auth,setAuth]=useState(false);
  const [pass,setPass]=useState("");
  const r=useRouter();

  useEffect(()=>{
    if(!auth) return;
    setUsers(JSON.parse(localStorage.getItem("pt_users")||"[]"));
  },[auth]);

  const save = (u:any[])=>{ localStorage.setItem("pt_users", JSON.stringify(u)); setUsers(u); }
  const approve = (email:string)=> save(users.map(x=> x.email===email? {...x, verified:true, badge:"SPECIAL ✓"} : x));
  const reject = (email:string)=> save(users.filter(x=> x.email!==email));
  const filtered = users.filter(u=> (u.name||"").toLowerCase().includes(q.toLowerCase()) || (u.email||"").toLowerCase().includes(q.toLowerCase()) || (u.county||"").toLowerCase().includes(q.toLowerCase()));

  const stats = {
    total: users.length,
    verified: users.filter(u=>u.verified).length,
    revenue: users.filter(u=>u.verified).length * 2500,
    pending: users.filter(u=>!u.verified).length
  };

  if(!auth){
    return (<main className="min-h-screen bg-[#050508] text-white grid place-items-center p-6 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/15 to-[#008C51]/15 blur-[100px]"/><div className="relative w-full max-w-[380px] rounded-[28px] bg-[#121214] border border-white/10 p-8 shadow-2xl"><div className="h-12 w-12 rounded-full bg-white text-black font-black grid place-items-center">K</div><h1 className="mt-6 text-3xl font-black tracking-tighter">Admin Access</h1><p className="text-white/40 text-sm mt-2">Enter admin password to control Political Tracker KE</p><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password: admin123" className="mt-8 w-full h-[56px] px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none"/><button onClick={()=>{ if(pass==="admin123"){ setAuth(true);} else alert("Wrong password - try admin123")}} className="mt-4 w-full h-[56px] rounded-full bg-white text-black font-black">Unlock Dashboard →</button><p className="text-[10px] text-white/20 mt-6 tracking-widest">PROTECTED • SPECIAL EDITION</p></div></main>)
  }

  return (<main className="min-h-screen bg-[#050508] text-white relative"><div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"/>
    <nav className="sticky top-0 z-20 h-[72px] border-b border-white/10 bg-black/50 backdrop-blur-2xl flex items-center justify-between px-8"><div className="flex items-center gap-4"><div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#CE1126] to-[#008C51] grid place-items-center font-black">K</div><span className="font-black tracking-tighter">ADMIN • TRACKER KE</span><span className="ml-4 hidden md:flex bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded-full font-black tracking-widest">● LIVE • {stats.total} USERS</span></div><div className="flex gap-2"><a href="/" className="h-10 px-5 rounded-full bg-white/5 border border-white/10 grid place-items-center text-sm">Live Site</a><a href="/dashboard" className="h-10 px-5 rounded-full bg-white text-black font-black grid place-items-center text-sm">Dashboard</a></div></nav>

    <div className="max-w-[1400px] mx-auto px-8 py-10">
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="rounded-[24px] bg-white text-black p-6"><p className="text-[11px] tracking-widest opacity-60 font-black">TOTAL REGISTRATIONS</p><p className="text-4xl font-black mt-2">{stats.total}</p><p className="text-sm mt-2 font-bold opacity-70">▲ +{stats.total} today</p></div>
        <div className="rounded-[24px] bg-white/[0.06] border border-white/10 backdrop-blur-xl p-6"><p className="text-[11px] tracking-widest text-white/40 font-black">PENDING VERIFY</p><p className="text-4xl font-black mt-2">{stats.pending}</p><p className="text-sm mt-2 text-amber-400 font-bold">Needs review</p></div>
        <div className="rounded-[24px] bg-[#008C51]/15 border border-[#008C51]/20 p-6"><p className="text-[11px] tracking-widest text-[#00FF88] font-black">VERIFIED</p><p className="text-4xl font-black mt-2">{stats.verified}</p><p className="text-sm mt-2 text-[#00FF88] font-bold">✓ Special badge</p></div>
        <div className="rounded-[24px] bg-gradient-to-br from-[#CE1126]/20 to-[#008C51]/10 border border-white/10 p-6"><p className="text-[11px] tracking-widest text-white/40 font-black">EST. REVENUE</p><p className="text-4xl font-black mt-2">KES {stats.revenue.toLocaleString()}</p><p className="text-sm mt-2 text-white/60">From M-Pesa tiers</p></div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-3 justify-between items-center">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, email, county..." className="w-full md:w-[380px] h-12 px-6 rounded-full bg-white/[0.06] border border-white/10 outline-none placeholder:text-white/30"/>
        <div className="flex gap-2"><button onClick={()=>{ if(confirm("Clear all?")) save([])}} className="h-11 px-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm">Clear All</button><button onClick={()=>{ const data=JSON.stringify(users,null,2); const blob=new Blob([data],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="politicians.json"; a.click();}} className="h-11 px-6 rounded-full bg-white text-black font-black text-sm">Export JSON</button></div>
      </div>

      <div className="mt-6 rounded-[28px] bg-[#0E0E11] border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between"><h3 className="font-black tracking-tighter text-lg">Politician Verifications</h3><span className="text-xs text-white/40">{filtered.length} results</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] tracking-widest text-white/30 border-b border-white/5"><tr><th className="p-4">POLITICIAN</th><th className="p-4">CONTACT</th><th className="p-4">COUNTY / PARTY / ROLE</th><th className="p-4">TIER</th><th className="p-4">STATUS</th><th className="p-4">ACTION</th></tr></thead>
            <tbody>
              {filtered.length===0&&<tr><td colSpan={6} className="p-12 text-center text-white/30">No registrations yet. Go to /register and create one.</td></tr>}
              {filtered.map((u,i)=><tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.03]">
                <td className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center font-black">{(u.name||"H")[0]}</div><div><p className="font-bold">{u.name}</p><p className="text-xs text-white/40">ID: {u.idNumber||"---"}</p></div></div></td>
                <td className="p-4"><p>{u.email}</p><p className="text-xs text-white/40">{u.phone||""}</p></td>
                <td className="p-4"><p className="font-bold">{u.county||"-"} <span className="text-white/30">• {u.constituency||""}</span></p><p className="text-xs"><span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{u.party||"Independent"}</span> <span className="ml-1 text-white/50">{u.role||""}</span></p></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-[11px] font-black ${u.tier==="special"?"bg-gradient-to-r from-[#CE1126] to-[#008C51] text-white":u.tier==="verified"?"bg-white text-black":"bg-white/10 text-white/60"}`}>{(u.tier||"free").toUpperCase()}</span></td>
                <td className="p-4">{u.verified?<span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-black">VERIFIED ✓</span>:<span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-black">PENDING</span>}</td>
                <td className="p-4 flex gap-2">{!u.verified&&<button onClick={()=>approve(u.email)} className="h-8 px-4 rounded-full bg-white text-black font-black text-xs">Approve</button>}<button onClick={()=>reject(u.email)} className="h-8 px-4 rounded-full bg-white/5 border border-white/10 text-xs">Delete</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] bg-white/[0.03] border border-white/10 p-6"><h4 className="font-black">Next Steps for Pro</h4><ul className="mt-3 text-sm text-white/60 space-y-1 list-disc ml-5"><li>Change admin password in code: search for "admin123"</li><li>Connect to Supabase to make data permanent for all users (not just your browser)</li><li>Add M-Pesa callback URL for auto-verification</li><li>Export daily for Nation Media reports</li></ul></div>
    </div>
  </main>)
}
