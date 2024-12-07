import { FileUploadResponse } from "../types/types";
import { FileUploadResponseSchema } from "../schemas/schemas";
import { FileUploadDAL } from "../dal/fileUploadDAL";

export class FileUploadRepository {
  /**
   * Uploads an Excel file and validates the response.
   * @param formData - The FormData containing the Excel file.
   * @returns A promise resolving to the parsed file upload response.
   * @throws Error if validation or the API call fails.
   */
  static async uploadExcelFile(
    formData: FormData
  ): Promise<FileUploadResponse> {
    const response = await FileUploadDAL.uploadExcelFile(formData);
    return this.validateResponse(response);
  }

  /**
   * Uploads a JSON file and validates the response.
   * @param formData - The FormData containing the JSON file.
   * @returns A promise resolving to the parsed file upload response.
   * @throws Error if validation or the API call fails.
   */
  static async uploadJsonFile(formData: FormData): Promise<FileUploadResponse> {
    const response = await FileUploadDAL.uploadJsonFile(formData);
    return this.validateResponse(response);
  }

  /**
   * Validates the API response.
   * @param response - The raw API response to validate.
   * @throws Error if validation fails.
   */
  private static validateResponse(response: unknown): FileUploadResponse {
    const parsedResponse = FileUploadResponseSchema.safeParse(response);
    if (!parsedResponse.success) {
      console.error(
        "Validation error for response:",
        parsedResponse.error.errors
      );
      throw new Error("Invalid response format from API");
    }
    return parsedResponse.data;
  }
}
