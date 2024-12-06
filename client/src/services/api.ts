import {
  CriticalEventsResponseSchema,
  DaysListSchema,
  FileUploadResponseSchema,
} from "../schemas/schemas";
import {
  CriticalEventsResponse,
  DayEvent,
  FileUploadResponse,
} from "../types/types";
import { axiosInstance } from "./axios";

/**
 * Sends the days list to the backend and fetches critical events.
 * @param daysList - The list of day events to validate and send.
 * @returns A promise resolving to the validated critical events response.
 */

export const getCriticalEvents = async (
  daysList: DayEvent[][]
): Promise<CriticalEventsResponse> => {
  const parsedDaysList = DaysListSchema.safeParse(daysList);

  if (!parsedDaysList.success) {
    console.error(
      "Validation error for daysList:",
      parsedDaysList.error.errors
    );
    throw new Error("Invalid data format for daysList");
  }

  try {
    const response = await axiosInstance.post<CriticalEventsResponse>(
      "/critical-events/",
      { days_list: parsedDaysList.data }
    );

    const parsedResponse = CriticalEventsResponseSchema.safeParse(
      response.data
    );

    if (!parsedResponse.success) {
      console.error(
        "Validation error for response:",
        parsedResponse.error.errors
      );
      throw new Error("Invalid response format from API");
    }

    return parsedResponse.data;
  } catch (error) {
    console.error("Error fetching critical events:", error);
    throw error;
  }
};

/**
 * Uploads a file to the backend and processes critical events.
 * @param file - The file to upload.
 * @returns A promise resolving to the validated critical events response.
 */
export const excelFileUpload = async (
  file: File
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post<FileUploadResponse>(
      "/file-upload/uploadExcel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const parsedResponse = FileUploadResponseSchema.safeParse(response.data);

    if (!parsedResponse.success) {
      console.error(
        "Validation error for response:",
        parsedResponse.error.errors
      );
      throw new Error("Invalid response format from API");
    }

    return parsedResponse.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Uploads a JSON file to the backend and processes critical events.
 * @param file - The JSON file to upload.
 * @returns A promise resolving to the validated critical events response.
 */
export const uploadJSONFile = async (
  file: File
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post<FileUploadResponse>(
      "/file-upload/uploadJSON",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const parsedResponse = FileUploadResponseSchema.safeParse(response.data);

    if (!parsedResponse.success) {
      console.error(
        "Validation error for response:",
        parsedResponse.error.errors
      );
      throw new Error("Invalid response format from API");
    }

    return parsedResponse.data;
  } catch (error) {
    console.error("Error uploading JSON file:", error);
    throw error;
  }
};
