export function unwrap(response: any) {
  // Handles Axios responses and direct payloads
  // Priority: response.data.data (ApiResponse inside Axios) -> response.data (Axios) -> response
  try {
    return response?.data?.data ?? response?.data ?? response;
  } catch (e) {
    return undefined;
  }
}
