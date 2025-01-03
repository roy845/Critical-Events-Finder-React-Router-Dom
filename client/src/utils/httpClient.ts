import { axiosInstance } from "../services/axios";

/**
 * Utility class for making HTTP requests.
 * Provides static methods for generic HTTP operations.
 */
export class HttpClient {
  /**
   * Sends a generic POST request to the API.
   * @param url - The API endpoint to send the request to.
   * @param payload - The payload to include in the request body.
   * @returns A promise resolving to the response data.
   */
  static async post<TResponse, TPayload = unknown>(
    url: string,
    payload: TPayload
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.post<TResponse>(url, payload);
      return response.data;
    } catch (error) {
      console.error("Error in HttpClient while sending POST request:", error);
      throw error;
    }
  }

  /**
   * Sends a POST request with FormData to the API.
   * Used for uploading files or handling `multipart/form-data` requests.
   * @param url - The API endpoint to send the request to.
   * @param formData - The FormData object to include in the request body.
   * @returns A promise resolving to the response data.
   */
  static async postFormData<TResponse>(
    url: string,
    formData: FormData
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.post<TResponse>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in HttpClient while sending POST FormData request:",
        error
      );
      throw error;
    }
  }

  /**
   * Sends a generic GET request to the API.
   * @param url - The API endpoint to send the request to.
   * @param params - Optional query parameters to include in the request URL.
   * @returns A promise resolving to the response data.
   */
  static async get<TResponse>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.get<TResponse>(url, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error in HttpClient while sending GET request:", error);
      throw error;
    }
  }

  /**
   * Sends a DELETE request to the API.
   * @param url - The API endpoint to send the request to.
   * @param params - Optional query parameters to include in the request URL.
   * @returns A promise resolving to the response data.
   */
  static async delete<TResponse>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.delete<TResponse>(url, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error in HttpClient while sending DELETE request:", error);
      throw error;
    }
  }
}
