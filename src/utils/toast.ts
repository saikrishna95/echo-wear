
import { toast } from "@/hooks/use-toast";

export const showToast = (title: string, description: string) => {
  toast({
    title,
    description,
  });
};
