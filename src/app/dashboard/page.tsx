"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
  const [user,setUser]=useState<any>(null);
  const router=useRouter();
  useEffect(()=>{
    const s=localStorage.getItem("pt_session");
    if(!s) router.push("/login"); else setUser(JSON.parse(s));
  },[]);
  if(!user) return null;
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-3xl font-black">Dashboard • Hi, {user.name}</h1>
        <button onClick={()=>{localStorage.removeItem("pt_session"); router.push("/login")}} className="bg-zinc-800 px-4 py-2 rounded-full">Logout</button>
      </div>
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><p className="text-zinc-400">Your Constituency</p><p className="text-2xl font-bold mt-2">Tracking Active</p></div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><p className="text-zinc-400">Mentions Today</p><p className="text-2xl font-bold mt-2">1,247</p></div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"><p className="text-zinc-400">Sentiment</p><p className="text-2xl font-bold mt-2 text-green-400">+68% Positive</p></div>
      </div>
    </main>
  )
}