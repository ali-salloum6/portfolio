"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final value as displayed (e.g. "50+", "25", "99%"). The numeric part is
   * parsed; any non-digit prefix/suffix is preserved verbatim. */
  value: string;
  /** Animation duration in ms. Defaults to 1400. */
  duration?: number;
  className?: string;
};

/**
 * Animates the numeric portion of a label from 0 to its final value the
 * first time it enters the viewport. Non-numeric segments (e.g. "+", "%",
 * "M.Sc.") render as-is so translations stay intact.
 *
 * - SSR renders the final value to avoid layout shift and keep SEO text.
 * - Only runs once; aborts cleanly on unmount.
 * - No-ops under `prefers-reduced-motion: reduce`.
 */
export function CountUp({ value, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);
    if (!match) return;
    const prefix = match[1] ?? "";
    const numericRaw = match[2] ?? "";
    const suffix = match[3] ?? "";

    // Honour the original formatting (e.g. "1,200") by remembering the
    // separator style and applying it when re-rendering intermediate values.
    const usesComma = numericRaw.includes(",");
    const decimalMatch = numericRaw.match(/\.(\d+)$/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;
    const target = parseFloat(numericRaw.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let started = false;
    let startTs = 0;

    const format = (n: number) => {
      const rounded = decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
      if (!usesComma) return `${prefix}${rounded}${suffix}`;
      const [intPart, decPart] = rounded.split(".");
      const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${prefix}${decPart ? `${withCommas}.${decPart}` : withCommas}${suffix}`;
    };

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      // easeOutExpo — lands softly on the final value.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(format(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(format(0));
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
