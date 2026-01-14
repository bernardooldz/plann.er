import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast } from "./toast";

interface ToastData {
  id: string;
  title?: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface AddToastParams {
  type: ToastData["type"];
  title?: string;
  message: string;
}

interface ToastContextType {
  addToast: (params: AddToastParams) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = ({ type, title, message }: AddToastParams) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.type}
          onClose={() => removeToast(toast.id)}
          index={index}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}