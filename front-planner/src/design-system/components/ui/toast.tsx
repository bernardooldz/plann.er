import { X, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toastVariants = tv({
  base: "p-4 rounded-lg shadow-shape flex items-center gap-3 min-w-80 max-w-96 animate-in slide-in-from-right-full duration-300 text-white",
  variants: {
    variant: {
      success: "bg-lime-500/80",
      error: "bg-red-500/60",
      info: "border-blue-400/20 bg-blue-300/20 text-blue-400",
      warning: "border-yellow-400/20 bg-yellow-300/20 text-yellow-400",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
  index: number;
}

export function Toast({
  message,
  onClose,
  variant = "info",
  autoClose = true,
  duration = 4500,
  index,
}: ToastProps) {
  const Icon = icons[variant];

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div
      className={toastVariants({ variant })}
      style={{
        position: "fixed",
        bottom: `${16 + index * 80}px`,
        right: "16px",
        zIndex: 50,
      }}
    >
      <Icon className="size-5 flex-shrink-0" />
      <span className="flex-1 text-sm font-medium text-zinc-200">
        {message}
      </span>
      <button
        onClick={onClose}
        className="text-zinc-200 hover:text-zinc-100 transition-colors"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
