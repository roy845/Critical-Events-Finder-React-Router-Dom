import { FileUploadResponse } from "../types/types";
import { HttpClient } from "../utils/httpClient";

/**
 * Data Access Layer for File Uploads.
 */
export class FileUploadDAL {
  /**
   * Uploads an Excel file to the backend and processes critical events.
   * @param formData - The FormData containing the Excel file.
   * @returns A promise resolving to the validated critical events response.
   */
  static async uploadExcelFile(
    formData: FormData
  ): Promise<FileUploadResponse> {
    return HttpClient.postFormData<FileUploadResponse>(
      "/file-upload/uploadExcel",
      formData
    );
  }

  /**
   * Uploads a JSON file to the backend and processes critical events.
   * @param formData - The FormData containing the JSON file.
   * @returns A promise resolving to the validated critical events response.
   */
  static async uploadJsonFile(formData: FormData): Promise<FileUploadResponse> {
    return HttpClient.postFormData<FileUploadResponse>(
      "/file-upload/uploadJSON",
      formData
    );
  }
}
