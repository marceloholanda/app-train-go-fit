
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
};

// This hook function wraps the toast to provide our custom API
export const useToast = () => {
  const toast = ({ title, description, duration }: ToastProps) => {
    // Map our API to sonner's API
    return sonnerToast(title || "", {
      description,
      duration,
    });
  };

  return { toast };
};

// Re-export sonner toast with the same API for direct usage
export { sonnerToast as toast };
