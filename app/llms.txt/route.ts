import { buildLlmsTxt } from "@/lib/build-llms-txt";
import { NextResponse } from "next/server";

/**
 * Plain-text English export of public marketing copy for LLMs and automation.
 * @see https://www.alisalloum.tech/llms.txt
 */
export async function GET() {
  const body = buildLlmsTxt();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
