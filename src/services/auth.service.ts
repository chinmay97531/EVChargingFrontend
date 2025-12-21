import api from "./api";

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const authService = {
  signUp: async (data: SignUpData) => {
    const response = await api.post("/signup", data);
    return response.data;
  },

  signIn: async (data: SignInData) => {
    const response = await api.post("/signin", data);
    // Backend returns { success: true, message: "...", data: { token } }
    // Extract token from nested structure
    return {
      token: response.data.data?.token || response.data.token,
    };
  },
};

