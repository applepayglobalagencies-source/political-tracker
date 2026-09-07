"use client";
import { useRouter } from "next/navigation";
export default function Login(){ const r=useRouter(); return <main className="min-h-screen bg-black text-white grid place-items-center"><div className="p-8 bg-zinc-900 rounded-2xl">LOGIN WORKS - <a href="/" className="underline">Home</a> <button onClick={()=>{localStorage.setItem("pt_session", JSON.stringify({name:"Test"})); r.push("/dashboard")}} className="bg-white text-black px-4 py-2 rounded-full ml-4">Test Login</button></div></main> }
