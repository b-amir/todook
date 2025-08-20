import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: "default" | "minimal";
}

export function Input({
  error,
  variant = "default",
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        variant === "minimal"
          ? [
              "w-full text-brgray-500 placeholder-brgray-100",
              "bg-transparent border-none outline-none",
              "focus:outline-none focus:shadow-none focus:border-none",
            ]
          : [
              "w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:shadow-md",
              "bg-white text-brgray-500 placeholder-brgray-100",
              error
                ? "border-brpink-300 focus:shadow-md focus:border-brpink-500"
                : "border-brgray-100 focus:shadow-md focus:border-brgray-100",
            ],
        className
      )}
      {...props}
    />
  );
}
