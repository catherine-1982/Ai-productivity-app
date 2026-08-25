import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--accent)] text-white shadow-lg shadow-teal-900/10 hover:bg-[var(--accent-strong)]",
  secondary: "border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--background)]",
  ghost: "hover:bg-[var(--background)] text-muted",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`focus-ring inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`} {...props} />;
}
