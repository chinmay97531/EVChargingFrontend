import api from "../lib/api";

export interface ChargingScheduleRequest {
  hour: number;
  demand: number;
  solar: number;
}

export interface ChargingScheduleResponse {
  success: boolean;
  message: string;
  data?: {
    action: number;
    status: string;
  };
}

export const chargingScheduleService = {
  predict: async (
    data: ChargingScheduleRequest
  ): Promise<ChargingScheduleResponse> => {
    const response = await api.post("/charging-schedule/predict", data);
    return response.data;
  },
};

