import { useAppDispatch } from "../app/hooks";
import {
  resetCriticalEvents,
  setDaysInput,
  setDaysList,
  setFileProperties,
  setIsGlowing,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDarkMode } from "./useDarKMode";
import { useNavigate } from "react-router-dom";
import { FileUploadService } from "../services/fileUploadService";

export const useFileUpload = (
  fileInputRef: React.RefObject<HTMLInputElement>
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
      const importedDaysList = await FileUploadService.uploadExcelFile(
        formData
      );

      dispatch(setDaysList({ days_list: importedDaysList.days_list }));
      dispatch(resetCriticalEvents());
      toast.success("Data imported successfully from Excel!");
      setLoading(false);

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
