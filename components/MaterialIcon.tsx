import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type Props = {
  name: string;
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
};

export function MaterialIcon({ name, className, filled, style }: Props) {
  const variationStyle: CSSProperties | undefined = filled
    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    : undefined;

  return (
    <span
      className={cn("inline-flex items-center justify-center text-2xl", className)}
      aria-hidden
    >
      <span
        className="material-symbols-outlined leading-none"
        style={{
          fontSize: "1em",
          lineHeight: 1,
          ...variationStyle,
          ...style,
        }}
      >
        {name}
      </span>
    </span>
  );
}
