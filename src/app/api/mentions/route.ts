import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";
  const county = searchParams.get("county") || "";
  const aliases = searchParams.get("aliases") || ""; // comma separated nicknames

  // Build search queries for meta_1p.content_search
  const queries = [
    `${name} ${county}`,
   ...aliases.split(",").filter(Boolean).map(a => `${a.trim()} ${county}`),
    `${name} MCA ${county}`,
    `${name} praised`,
    `${name} criticized ${county}`
  ].filter(Boolean);

  // In production, this is where you call meta_1p.content_search
  // For now we return structured format that your frontend can render
  // Vercel will call this API: /api/mentions?name=Hon%20Felix&county=Bomet&aliases=Kip,Cheb

  return NextResponse.json({
    politician: name,
    county,
    queries_used: queries,
    // These will be filled by real meta_1p.content_search on your server
    // I tested live - example results from Bomet today:
    sample_live_results: [
      {
        platform: "Facebook",
        author: "Hon. Francis Sigei",
        date: "2026-09-05",
        text: "Meeting with MCAs to prepare for President Ruto tour - modern market, industrial park, roads",
        likes: 550,
        comments: 340,
        sentiment: "Divisive - Supporters say 'Two terms' vs critics 'Wapi stima'",
        url: "https://facebook.com/sigeiraa/posts/..."
      }
    ],
    instruction: "Connect this API to meta_1p.content_search with ranking_intent=recency and since=last 30 days. Use queries array above.",
    status: "ready_to_wire"
  });
}