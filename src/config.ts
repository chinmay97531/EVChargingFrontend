// Prefer the new VITE_API_BASE_URL if provided, otherwise keep backwards compatibility
export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
export const MODEL_URL = import.meta.env.VITE_MODEL_URL || "http://localhost:5001";