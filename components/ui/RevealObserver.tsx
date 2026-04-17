"use client";

import { useEffect } from "react";

/**
 * Globally observes every element carrying `data-reveal` and adds the
 * `is-in` class when it enters the viewport, which triggers the CSS
 * transition defined in globals.css.
 *
 * - Uses a single IntersectionObserver shared across all reveal targets.
 * - A MutationObserver picks up elements added after route transitions
 *   (next-intl client navigation), so nothing gets stuck invisible.
 * - Respects `prefers-reduced-motion`: everything is revealed on mount,
 *   no observer is wired up.
 * - Does nothing server-side; safe in an async layout.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const attach = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => {
          // If the element is already on screen at mount (e.g. above the
          // fold during hydration), reveal it immediately without a stagger
          // that would otherwise look like a delayed pop-in.
          const rect = el.getBoundingClientRect();
          const above = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
          if (above) {
            requestAnimationFrame(() => el.classList.add("is-in"));
            return;
          }
          io.observe(el);
        });
    };

    attach(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.matches?.("[data-reveal]")) {
            io.observe(el);
          }
          attach(el);
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
