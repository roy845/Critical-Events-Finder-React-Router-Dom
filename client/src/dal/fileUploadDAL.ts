import {
  FetchAllFilesResponse,
  FileProcessResponse,
  FileUploadResponse,
} from "../types/types";
import { HttpClient } from "../utils/httpClient";

/**
 * Data Access Layer for File Uploads.
 */
export class FileUploadDAL {
  /**
   * Uploads an Excel file to the backend and processes it.
   * @param formData - The FormData containing the Excel file.
   * @returns A promise resolving to the validated file upload response.
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
   * Uploads a JSON file to the backend and processes it.
   * @param formData - The FormData containing the JSON file.
   * @returns A promise resolving to the validated file upload response.
   */
  static async uploadJsonFile(formData: FormData): Promise<FileUploadResponse> {
    return HttpClient.postFormData<FileUploadResponse>(
      "/file-upload/uploadJSON",
      formData
    );
  }

  static async fetchAllFiles(
    page: number = 1,
    limit: number | string = 3,
    search: string = ""
  ): Promise<FetchAllFilesResponse> {
    return HttpClient.get<FetchAllFilesResponse>(
      `/file-upload/listFiles?page=${page}&limit=${limit}&search=${search}`
    );
  }

  static async deleteFile(fileName: string): Promise<FileUploadResponse> {
    return HttpClient.delete<FileUploadResponse>(
      `/file-upload/deleteFile/${fileName.split("/")[1]}`
    );
  }

  static async deleteAllFiles(): Promise<FileUploadResponse> {
    return HttpClient.delete<FileUploadResponse>("/file-upload/deleteAllFiles");
  }

  static async downloadAndProcessFile(
    fileNameWithoutPrefix: string,
    fileExtension: string
  ): Promise<FileProcessResponse> {
    return HttpClient.get(
      `/file-upload/downloadAndProcessFile/${fileNameWithoutPrefix}?file_type=${fileExtension}`
    );
  }
}
