import React from "react";
import clsx from "clsx";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ButtonBase as MuiButtonBase } from "@mui/material";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center cursor-pointer font-medium !text-white !rounded-lg transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(255,255,255,0.5)] shadow-md hover:shadow-sm active:scale-95 min-h-12 min-w-24";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-brpink-100 to-brpink-200 hover:from-brpink-200 hover:to-brpink-300 text-white focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)] border border-brpink-400/20",
    secondary:
      "bg-gradient-to-r from-brgray-50 to-white hover:from-brgray-100 hover:to-brgray-50 text-brgray-600 focus:shadow-[0_0_0_2px_rgba(209,213,219,0.5)] border border-brgray-200",
    danger:
      "bg-gradient-to-r from-brpink-500 to-brpink-600 hover:from-brpink-600 hover:to-brpink-500 text-white focus:shadow-[0_0_0_2px_rgba(236,72,153,0.5)] border border-brpink-400/20",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2.5 font-semibold",
    lg: "px-6 py-3 text-lg font-bold",
  };

  return (
    <MuiButtonBase
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) &&
          "!cursor-not-allowed scale-100 hover:scale-100",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner size="sm" /> : children}
    </MuiButtonBase>
  );
}
