import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PLAUSIBLE_ORIGIN =
  process.env.PLAUSIBLE_PROXY_ORIGIN ?? "https://plausible.alisalloum.tech";

/** First address in XFF, or X-Real-IP (set by nginx). Used for Plausible geo / uniques. */
function clientIp(req: NextRequest): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;
  return req.headers.get("x-real-ip")?.trim() || undefined;
}

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

function upstreamHeaders(req: NextRequest): Headers {
  const out = new Headers();
  for (const [key, value] of req.headers) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower)) continue;
    if (lower === "host") continue;
    out.set(key, value);
  }
  const ip = clientIp(req);
  if (ip) {
    // Highest priority in PlausibleWeb.RemoteIP — avoids using TCP peer (this server) for geo.
    out.set("x-plausible-ip", ip);
  }
  return out;
}

async function proxy(req: NextRequest): Promise<Response> {
  const url = `${PLAUSIBLE_ORIGIN}/api/event`;
  const body =
    req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer();
  return fetch(url, {
    method: req.method,
    headers: upstreamHeaders(req),
    body: body && body.byteLength > 0 ? body : undefined,
    cache: "no-store",
  });
}

export async function POST(req: NextRequest) {
  const res = await proxy(req);
  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function GET(req: NextRequest) {
  const res = await proxy(req);
  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function OPTIONS(req: NextRequest) {
  const res = await proxy(req);
  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
