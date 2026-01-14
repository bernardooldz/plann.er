import { X } from "lucide-react";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const tagVariants = tv({
  base: "py-1.5 px-2.5 rounded-md flex items-center gap-2",
  variants: {
    variant: {
      default: "bg-zinc-800",
      existing: "bg-zinc-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TagProps extends VariantProps<typeof tagVariants> {
  children: ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
}

export function Tag({ children, onRemove, disabled, variant }: TagProps) {
  return (
    <div className={tagVariants({ variant })}>
      <span className="text-zinc-300">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className={disabled ? "opacity-50 cursor-not-allowed" : ""}
        >
          <X className="size-4 text-zinc-400" />
        </button>
      )}
    </div>
  );
}