import {
  FetchAllFilesResponse,
  FileProcessResponse,
  FileUploadResponse,
} from "../types/types";
import {
  FetchAllFilesResponseSchema,
  FileProcessResponseSchema,
  FileUploadResponseSchema,
} from "../schemas/schemas";
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
    return this.validateFileUploadResponse(response);
  }

  /**
   * Uploads a JSON file and validates the response.
   * @param formData - The FormData containing the JSON file.
   * @returns A promise resolving to the parsed file upload response.
   * @throws Error if validation or the API call fails.
   */
  static async uploadJsonFile(formData: FormData): Promise<FileUploadResponse> {
    const response = await FileUploadDAL.uploadJsonFile(formData);
    return this.validateFileUploadResponse(response);
  }

  static async fetchAllFiles(
    page: number = 1,
    limit: number | string = 3,
    search: string = ""
  ): Promise<FetchAllFilesResponse> {
    const response = await FileUploadDAL.fetchAllFiles(page, limit, search);
    return this.validateFetchAllFilesResponse(response);
  }

  static async deleteFile(fileName: string): Promise<FileUploadResponse> {
    const response = await FileUploadDAL.deleteFile(fileName);
    return this.validateFileUploadResponse(response);
  }

  static async deleteAllFiles(): Promise<FileUploadResponse> {
    const response = await FileUploadDAL.deleteAllFiles();
    return this.validateFileUploadResponse(response);
  }

  static async downloadAndProcessFile(
    fileNameWithoutPrefix: string,
    fileExtension: string
  ): Promise<FileProcessResponse> {
    const response = await FileUploadDAL.downloadAndProcessFile(
      fileNameWithoutPrefix,
      fileExtension
    );
    return this.validateFileProcessResponse(response);
  }

  /**
   * Validates the API response.
   * @param response - The raw API response to validate.
   * @throws Error if validation fails.
   */
  private static validateFileUploadResponse(
    response: unknown
  ): FileUploadResponse {
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

  private static validateFetchAllFilesResponse(
    response: unknown
  ): FetchAllFilesResponse {
    const parsedResponse = FetchAllFilesResponseSchema.safeParse(response);

    if (!parsedResponse.success) {
      console.error(
        "Validation error for response:",
        parsedResponse.error.errors
      );
      throw new Error("Invalid response format from API");
    }
    return parsedResponse.data;
  }

  private static validateFileProcessResponse(
    response: unknown
  ): FileProcessResponse {
    const parsedResponse = FileProcessResponseSchema.safeParse(response);

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
