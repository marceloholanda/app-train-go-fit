
// src/hooks/use-toast.ts
import { toast } from "sonner";

interface ToastOptions {
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

interface Toast {
  success: (title: string, options?: ToastOptions) => void;
  error: (title: string, options?: ToastOptions) => void;
  warning: (title: string, options?: ToastOptions) => void;
  info: (title: string, options?: ToastOptions) => void;
}

export function useToast(): Toast {
  return {
    success: (title: string, options?: ToastOptions) => {
      toast.success(title, options);
    },
    error: (title: string, options?: ToastOptions) => {
      toast.error(title, options);
    },
    warning: (title: string, options?: ToastOptions) => {
      toast.warning(title, options);
    },
    info: (title: string, options?: ToastOptions) => {
      toast.info(title, options);
    },
  };
}

export { toast };
