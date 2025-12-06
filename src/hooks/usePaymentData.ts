import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services/payment.service";

export const usePaymentData = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ["paymentData", startDate, endDate],
    queryFn: () => paymentService.getPaymentData(startDate, endDate),
    staleTime: 60000, // 1 minute
  });
};

