"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

const BUTTON_EVENT = "Button Click";
const LINK_EVENT = "Link Click";

const MAX_LABEL_LEN = 120;
const MAX_HREF_LEN = 200;

function trimLabel(s: string): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= MAX_LABEL_LEN) return t;
  return `${t.slice(0, MAX_LABEL_LEN - 1)}…`;
}

function labelFromExplicitOrText(el: Element, fallback: string): string {
  const explicit = el.getAttribute("data-plausible-name")?.trim();
  if (explicit) return explicit;
  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return trimLabel(aria);
  const text = el.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (text) return trimLabel(text);
  return fallback;
}

function labelForButton(el: HTMLButtonElement): string {
  return labelFromExplicitOrText(el, "unnamed");
}

function labelForAnchor(el: HTMLAnchorElement): string {
  const hrefAttr = el.getAttribute("href")?.trim() ?? "";
  return labelFromExplicitOrText(el, hrefAttr ? trimLabel(hrefAttr) : "unnamed");
}

function shouldTrackAnchor(a: HTMLAnchorElement): boolean {
  const hrefAttr = a.getAttribute("href");
  if (hrefAttr === null) return false;
  const t = hrefAttr.trim();
  if (t === "" || t === "#") return false;
  if (t.toLowerCase().startsWith("javascript:")) return false;
  return true;
}

function hrefProp(a: HTMLAnchorElement): string {
  try {
    const u = new URL(a.href);
    const path = u.pathname + u.search + u.hash;
    if (u.origin === window.location.origin) {
      const s = path || "/";
      return s.length <= MAX_HREF_LEN ? s : `${s.slice(0, MAX_HREF_LEN - 1)}…`;
    }
    const abs = u.href;
    return abs.length <= MAX_HREF_LEN ? abs : `${abs.slice(0, MAX_HREF_LEN - 1)}…`;
  } catch {
    const raw = a.getAttribute("href")?.trim() ?? "";
    return raw.length <= MAX_HREF_LEN ? raw : `${raw.slice(0, MAX_HREF_LEN - 1)}…`;
  }
}

export function PlausibleButtonTracker() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) return;

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const raw = e.target;
      if (raw == null) return;
      const target =
        raw instanceof Element ? raw : raw instanceof Node ? raw.parentElement : null;
      if (!target) return;

      const btn = target.closest("button");
      if (btn && !btn.disabled) {
        window.plausible?.(BUTTON_EVENT, {
          props: {
            name: labelForButton(btn),
            button_type: btn.type || "button",
          },
        });
        return;
      }

      const a = target.closest("a");
      if (!a || !(a instanceof HTMLAnchorElement) || !shouldTrackAnchor(a)) return;

      window.plausible?.(LINK_EVENT, {
        props: {
          name: labelForAnchor(a),
          href: hrefProp(a),
        },
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
