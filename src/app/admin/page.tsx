"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Admin(){
  const [users,setUsers]=useState<any[]>([]); const [ok,setOk]=useState(false); const [p,setP]=useState("");
  async function load(){ const {data}=await supabase.from("politicians").select("*"); setUsers(data||[]); }
  useEffect(()=>{ if(ok) load(); },[ok]);
  if(!ok) return (<main className="min-h-screen bg-black grid place-items-center"><div className="bg-[#121214] p-8 rounded-[24px] border border-white/10 text-white w-[340px]"><h1 className="font-black">Admin</h1><input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="admin123" className="mt-4 w-full h-12 px-5 rounded-full bg-white/5 border border-white/10"/><button onClick={()=>{ if(p==="admin123") setOk(true); }} className="mt-3 w-full h-12 rounded-full bg-white text-black font-black">Unlock</button></div></main>);
  return (<main className="min-h-screen bg-black text-white p-8"><h1 className="text-2xl font-black">Admin - {users.length} Live</h1><div className="mt-6 space-y-2">{users.map((u:any)=><div key={u.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"><span><b>{u.name}</b> - {u.email} - {u.county}</span><button onClick={async()=>{ await supabase.from("politicians").delete().eq("id",u.id); load(); }} className="text-red-400">Delete</button></div>)}</div></main>)
}
