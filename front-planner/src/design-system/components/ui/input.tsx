import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors",
  variants: {
    size: {
      default: "px-4 h-14",
      form: "p-2.5",
    },
    state: {
      default: "border-zinc-800 focus-within:border-lime-400",
      error: "border-red-400 focus-within:border-red-400",
      success: "border-lime-400",
    },
  },
  defaultVariants: {
    size: "default",
    state: "default",
  },
});

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {
  icon?: ReactNode;
  containerClassName?: string;
  error?: string;
}

export function Input({ icon, size, state, containerClassName, className, error, ...props }: InputProps) {
  const inputState = error ? "error" : state;
  
  return (
    <div className="space-y-1">
      <div className={inputVariants({ size, state: inputState, className: containerClassName })}>
        {icon && <div className="text-zinc-400">{icon}</div>}
        <input
          {...props}
          className={`bg-transparent text-md placeholder-zinc-400 outline-none flex-1 ${className || ""}`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs px-1">{error}</p>
      )}
    </div>
  );
}