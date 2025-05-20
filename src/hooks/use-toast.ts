
import { toast } from "sonner";

interface ToastOptions {
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

export function useToast() {
  return {
    toast,
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
