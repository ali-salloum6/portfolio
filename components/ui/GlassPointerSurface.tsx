"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";

function usePointerGlowVars() {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const onChange = () => {
      reduceMotion.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion.current) return;
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      const clamp = (n: number) => Math.max(-1, Math.min(1, n));
      el.style.setProperty("--gp-x", clamp(x).toFixed(4));
      el.style.setProperty("--gp-y", clamp(y).toFixed(4));
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--gp-x", "0");
    el.style.setProperty("--gp-y", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

function mergeRefs<T>(a: React.MutableRefObject<T | null>, b: React.Ref<T> | null) {
  return (node: T | null) => {
    a.current = node;
    if (typeof b === "function") b(node);
    else if (b && "current" in b) (b as React.MutableRefObject<T | null>).current = node;
  };
}

type DivProps = ComponentPropsWithoutRef<"div">;

export const GlassPointerDiv = forwardRef<HTMLDivElement, DivProps>(
  function GlassPointerDiv(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <div
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);

type ArticleProps = ComponentPropsWithoutRef<"article">;

export const GlassPointerArticle = forwardRef<HTMLElement, ArticleProps>(
  function GlassPointerArticle(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <article
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);

type SectionProps = ComponentPropsWithoutRef<"section">;

export const GlassPointerSection = forwardRef<HTMLElement, SectionProps>(
  function GlassPointerSection(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <section
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);

type LiProps = ComponentPropsWithoutRef<"li">;

export const GlassPointerLi = forwardRef<HTMLLIElement, LiProps>(
  function GlassPointerLi(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <li
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);

type FormProps = ComponentPropsWithoutRef<"form">;

export const GlassPointerForm = forwardRef<HTMLFormElement, FormProps>(
  function GlassPointerForm(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <form
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);

type LocalizedLinkProps = ComponentPropsWithoutRef<typeof Link>;

export const GlassPointerLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  function GlassPointerLink(
    { className, onMouseMove: onMouseMoveProp, onMouseLeave: onMouseLeaveProp, ...props },
    forwardedRef,
  ) {
    const { ref, onMouseMove, onMouseLeave } = usePointerGlowVars();

    return (
      <Link
        ref={mergeRefs(ref, forwardedRef)}
        className={cn("glass-pointer-card", className)}
        onMouseMove={(e) => {
          onMouseMoveProp?.(e);
          onMouseMove(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveProp?.(e);
          onMouseLeave();
        }}
        {...props}
      />
    );
  },
);
