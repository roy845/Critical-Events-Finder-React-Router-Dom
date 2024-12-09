import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDarkMode } from "./useDarKMode";
import { useNavigate } from "react-router-dom";
import { FileUploadService } from "../services/fileUploadService";
import { FileUploadResponse } from "../types/types";

const useJSONFileUpload = (
  JSONfileInputRef: React.RefObject<HTMLInputElement>
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

    const validExtensions: string[] = ["json"];
    const fileExtension: string | undefined = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      toast.error("Please upload a valid JSON file.");
      return;
    }

    if (JSONfileInputRef.current) {
      JSONfileInputRef.current.value = "";
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response: FileUploadResponse =
        await FileUploadService.uploadJSONFile(formData);

      toast.success(response.message);
      navigate("/all-files");
    } catch (error) {
      console.error("Error uploading JSON file:", error);
      toast.error("Failed to upload JSON file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileUpload(file);
  };

  return { onFileChange, loading, isDarkMode, spinnerColor };
};

export default useJSONFileUpload;
