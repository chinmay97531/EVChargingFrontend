import api from "../lib/api";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data?: User;
}

export const userService = {
  getUserDetails: async (): Promise<UserDetailsResponse> => {
    const response = await api.post("/getUserDetails");
    return response.data;
  },
};

