
import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export function useToast() {
  return {
    toast: sonnerToast,
    success: (title: string, options?: ToastOptions) => {
      sonnerToast.success(title, options);
    },
    error: (title: string, options?: ToastOptions) => {
      sonnerToast.error(title, options);
    },
    warning: (title: string, options?: ToastOptions) => {
      sonnerToast.warning(title, options);
    },
    info: (title: string, options?: ToastOptions) => {
      sonnerToast.info(title, options);
    },
  };
}

export const toast = sonnerToast;
