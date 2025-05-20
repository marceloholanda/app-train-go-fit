
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

// This hook function wraps the toast to provide our custom API
export const useToast = () => {
  const toast = ({ title, description, variant, duration }: ToastProps) => {
    // Map our API to sonner's API
    return sonnerToast(title || "", {
      description,
      // Sonner doesn't have variants like shadcn, but we can use className instead
      className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
      duration,
    });
  };

  return { toast };
};

// Re-export sonner toast with the same API for direct usage
export { sonnerToast as toast };
