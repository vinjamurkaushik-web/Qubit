import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
};

/** The single CTA style used site-wide (gold fill, ink border + offset shadow). */
export function Button({ variant = "primary", className = "", ...rest }: Props) {
  return (
    <a
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      {...rest}
    />
  );
}
