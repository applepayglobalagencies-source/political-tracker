import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: politicians } = await supabase.from("politicians").select("*").eq("verified", true);

  for (const p of politicians || []) {
    const queries = [
      `${p.name} ${p.county}`,
     ...(p.aliases? p.aliases.split(",").map((a:string)=>`${a.trim()} ${p.county}`) : []),
      `${p.name} ${p.county} praised`,
      `${p.name} ${p.county} criticized`
    ];

    // HERE you call meta_1p.content_search
    // I tested live: searching "Felix Kipyegon Bomet" returns real FB posts
    // For each result, insert:
    // await supabase.from("mentions").insert({
    // politician_id: p.id,
    // politician_name: p.name,
    // platform: result.platform, // Facebook
    // author_name: result.author,
    // text: result.summary,
    // likes: result.likes,
    // comments: result.comments,
    // sentiment: analyzeSentiment(result.summary),
    // url: result.url,
    // posted_at: result.created_at
    // });
  }

  return new Response(JSON.stringify({ ok: true, processed: politicians?.length }), { headers: { "Content-Type": "application/json" } });
});

function analyzeSentiment(text: string){
  const t = text.toLowerCase();
  if(t.includes("two terms") || t.includes("kazi safi") || t.includes("praised") || t.includes("good work")) return "Positive";
  if(t.includes("wapi") || t.includes("no water") || t.includes("wantam") || t.includes("criticized") || t.includes("fake")) return "Negative";
  if(t.includes("vs") || t.includes("debate") || t.includes("mixed")) return "Divisive";
  return "Neutral";
}