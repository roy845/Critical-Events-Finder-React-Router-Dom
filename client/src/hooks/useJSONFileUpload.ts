import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { toast } from "react-toastify";
import {
  resetCriticalEvents,
  setDaysInput,
  setDaysList,
  setFileProperties,
  setIsGlowing,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { useDarkMode } from "./useDarKMode";
import { useNavigate } from "react-router-dom";
import { FileUploadService } from "../services/fileUploadService";

const useJSONFileUpload = (
  JSONfileInputRef: React.RefObject<HTMLInputElement>
) => {
  const dispatch = useAppDispatch();
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
      const response = await FileUploadService.uploadJSONFile(formData);
      dispatch(setDaysList({ days_list: response.days_list }));
      dispatch(resetCriticalEvents());
      toast.success("Data imported successfully from JSON!");

      dispatch(
        setFileProperties({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        })
      );
      dispatch(setDaysInput(""));
      dispatch(setIsGlowing(true));
      dispatch(setRequestDuration(0));
      toast.success(`Uploaded file: ${file.name}`);
      navigate("/days-list-analysis");
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
