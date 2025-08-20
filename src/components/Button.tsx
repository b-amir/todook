import React from "react";
import clsx from "clsx";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
    "flex items-center justify-center cursor-pointer font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-95";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brpink-300 to-brpink-200 hover:from-brpink-200 hover:to-brpink-300 text-white focus:ring-brpink-300 border border-brpink-400/20",
    secondary:
      "bg-gradient-to-r from-brgray-50 to-white hover:from-brgray-100 hover:to-brgray-50 text-brgray-600 focus:ring-brgray-300 border border-brgray-200",
    danger:
      "bg-gradient-to-r from-brpink-500 to-brpink-600 hover:from-brpink-600 hover:to-brpink-500 text-white focus:ring-brpink-500 border border-brpink-400/20",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2.5 font-semibold",
    lg: "px-6 py-3 text-lg font-bold",
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) &&
          "opacity-50 cursor-not-allowed scale-100 hover:scale-100",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner size="sm" /> : children}
    </button>
  );
}
