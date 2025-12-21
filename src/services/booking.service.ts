import api from "./api";

export interface Booking {
  id: number;
  userId: number;
  chargingStationId: number;
  startTime: string;
  endTime: string;
  slotNumber: number;
  typeOfCharging: string;
  status: string;
  chargingStation?: ChargingStation;
}

export interface ChargingStation {
  id: number;
  name: string;
  capacity: number;
  solarCapacity: number;
  avaliableSlots: number;
  status: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: Booking[];
}

export interface CreateBookingData {
  lat: number;
  long: number;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data?: Booking;
}

export const bookingService = {
  getBookings: async (): Promise<BookingResponse> => {
    const response = await api.post("/getChargingSessions");
    return response.data;
  },

  createBooking: async (
    data: CreateBookingData
  ): Promise<CreateBookingResponse> => {
    const response = await api.post("/booking", data);
    return response.data;
  },

  cancelBooking: async (bookingId: number) => {
    const response = await api.post("/cancelBooking", { bookingId });
    return response.data;
  },

  completeBooking: async (bookingId: number) => {
    const response = await api.post("/completeBooking", { bookingId });
    return response.data;
  },
};

