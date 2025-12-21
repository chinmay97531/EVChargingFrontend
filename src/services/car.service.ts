import api from "./api";

export interface Car {
  id: number;
  userId: number;
  name: string;
  model: string;
  number: string;
  currentBatteryHealth: number;
  capacityOfBattery: number;
  currentBatteryStatus: number;
  typeOfPort: string;
  fastSupporting: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarResponse {
  success: boolean;
  message: string;
  data?: Car[];
}

export interface DeleteCarResponse {
  success: boolean;
  message: string;
  data?: { message: string };
}

export const carService = {
  getCarDetails: async (): Promise<CarResponse> => {
    const response = await api.post("/getCarDetails");
    return response.data;
  },

  deleteCar: async (carId: number): Promise<DeleteCarResponse> => {
    const response = await api.delete(`/cars/${carId}`);
    return response.data;
  },
};

