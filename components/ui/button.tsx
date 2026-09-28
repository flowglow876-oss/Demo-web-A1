import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "magnetic";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-tight";

    const sizeStyles = {
      sm: "h-9 px-4 text-xs rounded-full gap-1.5",
      md: "h-11 px-6 text-sm rounded-full gap-2",
      lg: "h-13 px-8 text-base rounded-full gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#111111] text-[#F7F6F2] hover:bg-black hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.25),0_0_20px_rgba(182,156,255,0.3)] active:scale-[0.98]",
      secondary:
        "bg-white/80 backdrop-blur-md text-[#111111] border border-black/10 hover:border-black/20 hover:bg-white active:scale-[0.98] shadow-sm",
      outline:
        "border border-black/15 text-[#111111] hover:border-black/40 hover:bg-black/[0.03] active:scale-[0.98]",
      ghost:
        "text-[#111111] hover:bg-black/[0.04] active:scale-[0.98]",
      magnetic:
        "relative overflow-hidden bg-[#111111] text-white rounded-full shadow-[0_10px_30px_-10px_rgba(124,92,255,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(124,92,255,0.5)] active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
