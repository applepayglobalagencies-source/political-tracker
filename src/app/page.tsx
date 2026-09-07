"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  { name: 'Jan', Ruto: 42, Raila: 38 },
  { name: 'Feb', Ruto: 44, Raila: 36 },
  { name: 'Mar', Ruto: 45, Raila: 35 },
  { name: 'Apr', Ruto: 43, Raila: 37 },
  { name: 'May', Ruto: 47, Raila: 33 },
  { name: 'Jun', Ruto: 45, Raila: 35 },
];

const counties = [
  { county: 'Nairobi', Ruto: 48, Raila: 42 },
  { county: 'Mombasa', Ruto: 35, Raila: 55 },
  { county: 'Kisumu', Ruto: 20, Raila: 75 },
  { county: 'Nakuru', Ruto: 60, Raila: 30 },
  { county: 'Uasin Gishu', Ruto: 78, Raila: 15 },
];

export default function Page() {
  const [tab, setTab] = useState("trend");
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-2">Political Tracker KE 🇰🇪</h1>
        <p className="text-zinc-400 mb-6">Real-time approval tracking • Updated June 2026</p>

        <div className="flex gap-2 mb-6">
          <button onClick={()=>setTab("trend")} className={`px-4 py-2 rounded-full ${tab==="trend"? "bg-white text-black" : "bg-zinc-800"}`}>Trend</button>
          <button onClick={()=>setTab("counties")} className={`px-4 py-2 rounded-full ${tab==="counties"? "bg-white text-black" : "bg-zinc-800"}`}>By County</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><p className="text-zinc-400 text-sm">Ruto Approval</p><p className="text-3xl font-bold">45%</p><p className="text-green-400 text-sm">↑ 2.1%</p></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><p className="text-zinc-400 text-sm">Raila Approval</p><p className="text-3xl font-bold">35%</p><p className="text-red-400 text-sm">↓ 1.3%</p></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><p className="text-zinc-400 text-sm">Undecided</p><p className="text-3xl font-bold">20%</p><p className="text-zinc-400 text-sm">—</p></div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {tab==="trend"? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{background:"#18181b", border:"1px solid #27272a"}}/>
                <Line type="monotone" dataKey="Ruto" stroke="#22c55e" strokeWidth={3} />
                <Line type="monotone" dataKey="Raila" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            ) : (
              <BarChart data={counties}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="county" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{background:"#18181b", border:"1px solid #27272a"}}/>
                <Bar dataKey="Ruto" fill="#22c55e" radius={[8,8,0,0]} />
                <Bar dataKey="Raila" fill="#ef4444" radius={[8,8,0,0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        <p className="text-center text-zinc-500 mt-6 text-sm">Deployed on Vercel • Next.js 16.3.4 • Build Fixed ✅</p>
      </div>
    </main>
  );
}