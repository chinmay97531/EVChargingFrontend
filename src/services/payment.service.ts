import api from "./api";

export interface PaymentRecord {
  id: number;
  bookingId: number;
  amount: number;
  originalAmount: number;
  savings: number;
  paymentMode: string;
  status: string;
  createdAt: string;
}

export interface PaymentData {
  totalPaid: number;
  totalSavings: number;
  totalPayments: number;
  paymentRecords: PaymentRecord[];
}

export interface PaymentDataResponse {
  success: boolean;
  message: string;
  data?: PaymentData;
}

export const paymentService = {
  getPaymentData: async (
    startDate?: string,
    endDate?: string
  ): Promise<PaymentDataResponse> => {
    const params: Record<string, string> = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get("/payment/data", { params });
    return response.data;
  },
};

