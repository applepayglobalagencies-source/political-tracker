"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, saveUser } from "@/lib/auth";

export default function Register(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const router=useRouter();
  const submit=(e:any)=>{
    e.preventDefault();
    if(getUsers().find(u=>u.email===email)) return alert("Email already exists");
    saveUser({id:Date.now().toString(), name, email, role:"politician", password:pass});
    localStorage.setItem("pt_session", JSON.stringify({email, name}));
    router.push("/dashboard");
  }
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Create account</h1><p className="text-zinc-400 mb-6 text-sm">Political Tracker KE • Politician / Analyst</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-3 text-white" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-3 text-white" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" required className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-6 text-white" />
        <button className="w-full bg-white text-black font-bold rounded-xl p-3">Register</button>
        <p className="text-zinc-400 text-sm mt-4 text-center">Already have? <a href="/login" className="text-white underline">Login</a></p>
      </form>
    </main>
  )
}