import axios from "axios";
import { MODEL_URL } from "../config";

export interface ChargingScheduleRequest {
  hour: number;
  demand: number;
  solar: number;
}

export interface ChargingScheduleResponse {
  action: number;
  status?: string;
}

export const chargingScheduleService = {
  predict: async (
    data: ChargingScheduleRequest
  ): Promise<{ data: ChargingScheduleResponse }> => {
    // The model server exposes `/predict` (Python Flask app).
    const response = await axios.post(`${MODEL_URL}/predict`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  },
};

