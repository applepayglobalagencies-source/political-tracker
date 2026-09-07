"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "@/lib/auth";

export default function Login(){
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const router=useRouter();
  const submit=(e:any)=>{
    e.preventDefault();
    const u=getUsers().find(x=>x.email===email && x.password===pass);
    if(!u) return alert("Invalid credentials");
    localStorage.setItem("pt_session", JSON.stringify({email:u.email, name:u.name}));
    router.push("/dashboard");
  }
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Welcome back</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-3 text-white" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" required className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-6 text-white" />
        <button className="w-full bg-white text-black font-bold rounded-xl p-3">Login</button>
        <p className="text-zinc-400 text-sm mt-4 text-center">No account? <a href="/register" className="text-white underline">Register</a></p>
      </form>
    </main>
  )
}