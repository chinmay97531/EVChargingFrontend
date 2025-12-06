import api from "../lib/api";

export interface BatteryStatus {
  carId: number;
  carName: string;
  carModel: string;
  soc: number;
  soh: number;
  timestamp: string;
  date: string;
}

export interface BatteryStatusResponse {
  success: boolean;
  message: string;
  data?: BatteryStatus;
}

export const batteryService = {
  getBatteryStatus: async (carId?: number): Promise<BatteryStatusResponse> => {
    const params = carId ? { carId: carId.toString() } : {};
    const response = await api.get("/battery/status", { params });
    return response.data;
  },
};

