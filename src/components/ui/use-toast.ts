
import { useToast as useOriginalToast, toast as originalToast } from "@/hooks/use-toast";

export const useToast = useOriginalToast;
export const toast = originalToast;
