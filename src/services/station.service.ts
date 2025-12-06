import api from "../lib/api";

export interface Station {
  name: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  address: {
    line1: string;
    line2: string;
    town: string;
    state: string;
    postcode: string;
    country: string;
    distance: number;
  };
  typesOfChargers: Array<{
    type: string;
    count: number;
  }>;
  FastChargers: number;
  SlowChargers: number;
}

export interface StationSearchResponse {
  success: boolean;
  message: string;
  data?: {
    stations: Station[];
  };
}

export const stationService = {
  searchByLocation: async (lat: number, long: number) => {
    const response = await api.post("/nearestEVStation", { lat, long });
    return response.data;
  },

  searchByName: async (stationName: string) => {
    const response = await api.post("/getStationDetails", { stationName });
    return response.data;
  },

  searchByPostcode: async (pinCode: string) => {
    const response = await api.post("/getStationDetailsByPostCode", {
      pinCode,
    });
    return response.data;
  },

  searchByCity: async (cityName: string) => {
    const response = await api.post("/getStationDetailsByCity", { cityName });
    return response.data;
  },
};

