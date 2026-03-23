import { NextResponse } from "next/server";

/** Google Scholar cluster id for "Quantum annealing in machine learning: Qboost on D-Wave quantum annealer" */
const SCHOLAR_CLUSTER_ID = "4727824286413679555";

/**
 * Best-effort live citation count from Google Scholar. Often blocked or HTML changes;
 * the portfolio UI falls back to translated static numbers.
 */
export async function GET() {
  try {
    const url = `https://scholar.google.com/scholar?cluster=${SCHOLAR_CLUSTER_ID}&hl=en&as_sdt=0,5`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      return NextResponse.json({ count: null }, { status: 503 });
    }
    const html = await res.text();
    const m = html.match(/Cited by (\d+)/i);
    if (m) {
      return NextResponse.json({ count: parseInt(m[1], 10) });
    }
  } catch {
    // ignore
  }
  return NextResponse.json({ count: null }, { status: 503 });
}
