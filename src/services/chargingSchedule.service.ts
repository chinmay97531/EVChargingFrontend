import api from "./api";

export interface ChargingScheduleRequest {
  current_soc: number;
  required_soc: number;
  hours_remaining?: number;
  plug_out_time?: string;
  preference?: string;
  solar_kw?: number;
  price?: number;
  station_battery_kwh?: number;
  time_slot?: number;
}

export interface ChargingScheduleResponse {
  status: string;
  result?: any;
  message?: string;
  error?: string;
}

export const chargingScheduleService = {
  predict: async (
    data: ChargingScheduleRequest
  ): Promise<ChargingScheduleResponse> => {
    const response = await api.post("/charging-schedule/predict", data);
    return response.data;
  },
};

