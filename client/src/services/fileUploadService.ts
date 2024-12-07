import { FileUploadRepository } from "../repository/FileUploadRepository";
import { FileUploadResponse } from "../types/types";

export class FileUploadService {
  /**
   * Public method to upload an Excel file and fetch days list intersections/events.
   * @param formData - The FormData containing the Excel file.
   * @returns A promise resolving to the validated file upload response.
   */
  static async uploadExcelFile(
    formData: FormData
  ): Promise<FileUploadResponse> {
    return FileUploadRepository.uploadExcelFile(formData);
  }

  /**
   * Public method to upload a JSON file and fetch days list intersections/events.
   * @param formData - The FormData containing the JSON file.
   * @returns A promise resolving to the validated file upload response.
   */
  static async uploadJSONFile(formData: FormData): Promise<FileUploadResponse> {
    return FileUploadRepository.uploadJsonFile(formData);
  }
}
