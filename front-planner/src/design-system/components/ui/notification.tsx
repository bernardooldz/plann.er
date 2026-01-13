import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const notificationVariants = tv({
  base: "text-sm p-3 rounded-md flex items-center gap-2",
  variants: {
    variant: {
      success: "text-lime-400 bg-lime-400/10 border border-lime-400/20",
      error: "text-red-400 bg-red-400/10 border border-red-400/20",
      info: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
      warning: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
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

interface NotificationProps extends VariantProps<typeof notificationVariants> {
  children: ReactNode;
}

export function Notification({
  children,
  variant = "info",
}: NotificationProps) {
  const Icon = icons[variant];

  return (
    <div className={notificationVariants({ variant })}>
      <Icon className="size-4 flex-shrink-0" />
      <span className="flex-1">{children}</span>
    </div>
  );
}
