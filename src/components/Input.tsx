import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        "bg-white text-brgray-500 placeholder-brgray-100",
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-brgray-100 focus:ring-brpink-300 focus:border-brpink-300",
        className
      )}
      {...props}
    />
  );
}
