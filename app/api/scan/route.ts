import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This API is called every 60s from politician page + every 15 min from Vercel Cron
// It returns DB mentions + if live=1 tries to enrich from external search
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const politician_id = searchParams.get("politician_id");
  const live = searchParams.get("live");

  if(!politician_id) return NextResponse.json({error:"politician_id required"}, {status:400});

  // Get politician aliases to search
  const { data: pol } = await supabase.from("politicians").select("*").eq("id", politician_id).single();
  if(!pol) return NextResponse.json({error:"not found"}, {status:404});

  // Always return current DB mentions first (instant)
  const { data: mentions } = await supabase.from("mentions").select("*").eq("politician_id", politician_id).order("posted_at",{ascending:false}).limit(50);

  // If live scan requested, also try to fetch fresh (placeholder for FB Graph / CrowdTangle / Apify)
  // For now we return DB but mark as live scanned at
  await supabase.from("politicians").update({ last_scanned_at: new Date().toISOString() }).eq("id", politician_id);

  return NextResponse.json({ politician: pol, mentions: mentions||[], scanned_at: new Date().toISOString(), platforms: { facebook: mentions?.filter((m:any)=>m.platform.toLowerCase().includes("face")).length||0, instagram: mentions?.filter((m:any)=>m.platform.toLowerCase().includes("insta") && m.author_name!=="System Scanner").length||0, threads: mentions?.filter((m:any)=>m.platform.toLowerCase().includes("thread") && m.author_name!=="System Scanner").length||0, x: mentions?.filter((m:any)=>m.platform.toLowerCase().includes("x")).length||0 } });
}

// CRON JOB: scans all politicians
export async function POST(){
  const { data: politicians } = await supabase.from("politicians").select("id,name,aliases").limit(100);
  // In production: loop through politicians and call external scrapers
  // For now just touch last_scanned_at
  for(const p of politicians||[]){
    await supabase.from("politicians").update({ last_scanned_at: new Date().toISOString() }).eq("id", p.id);
  }
  return NextResponse.json({ ok:true, scanned: politicians?.length||0 });
}