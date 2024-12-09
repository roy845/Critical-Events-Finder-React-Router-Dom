import { toast } from "react-toastify";
import { useState } from "react";
import { useDarkMode } from "./useDarKMode";
import { useNavigate } from "react-router-dom";
import { FileUploadService } from "../services/fileUploadService";
import { FileUploadResponse } from "../types/types";

export const useFileUpload = (
  fileInputRef: React.RefObject<HTMLInputElement>
) => {
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const spinnerColor: string = isDarkMode ? "#ffffff" : "blue";

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) {
      toast.error("No file is selected.");
      return;
    }

    const validExtensions: string[] = ["xlsx", "xls"];
    const fileExtension: string | undefined = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      toast.error("Please upload a valid Excel file.");
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response: FileUploadResponse =
        await FileUploadService.uploadExcelFile(formData);

      toast.success(response.message);

      navigate("/all-files");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileUpload(file);
  };

  return { onFileChange, loading, isDarkMode, spinnerColor };
};
