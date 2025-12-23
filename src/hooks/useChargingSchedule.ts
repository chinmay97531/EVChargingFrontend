import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// 🔥 DIRECTLY POINT TO FLASK MODEL BACKEND
const BACKEND_URL = "http://localhost:3000/";

export const useChargingSchedule = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      // 1. Retrieve the token from Local Storage
      // Replace 'access_token' with the actual key you saved it under
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}api/v1/charging-schedule/predict`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            // 2. Attach the Authorization header if the token exists
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      return response.data; // { status, result }
    },
  });
};