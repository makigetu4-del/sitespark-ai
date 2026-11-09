import { NextResponse } from "next/server";
import { generateFallbackSite } from "@/lib/site-generator";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const prompt = String(body.prompt || "").trim();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json(generateFallbackSite(prompt));
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "Return valid JSON only with fields: name, headline, description, cta, color, prompt. Name should be a business or brand name. Keep content polished and concise.",
          },
          {
            role: "user",
            content: `Build a landing page concept for: ${prompt}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    return NextResponse.json({
      ...generateFallbackSite(prompt),
      ...parsed,
      prompt,
      color: parsed.color || "#d5f365",
    });
  } catch {
    return NextResponse.json(generateFallbackSite(prompt));
  }
}
