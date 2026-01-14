import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="w-160 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">{title}</h2>
            <button onClick={onClose}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}