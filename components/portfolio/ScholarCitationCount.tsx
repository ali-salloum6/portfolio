"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Shown until / if the live API fails */
  fallbackCount: string;
  /** e.g. "citations on Google Scholar" */
  restLabel: string;
};

export function ScholarCitationCount({ fallbackCount, restLabel }: Props) {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/scholar-citations")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { count?: number | null }) => {
        if (cancelled || typeof d.count !== "number") return;
        setCount(String(d.count));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <p className="text-sm leading-relaxed text-on-surface-variant">
      <span className="text-3xl font-bold tabular-nums text-primary">{count ?? fallbackCount}</span>
      <span className="ms-1.5">{restLabel}</span>
    </p>
  );
}
