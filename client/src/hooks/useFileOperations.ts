import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FileUploadService } from "../services/fileUploadService";
import { FileType } from "../types/types";
import {
  resetCriticalEvents,
  setDaysInput,
  setDaysList,
  setIsGlowing,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";

export const useFileOperations = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFileProcessing, setLoadingFileProcessing] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"single" | "all" | null>(null);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteFile = async () => {
    if (!fileToDelete) return;
    try {
      setLoading(true);
      setError(null);
      await FileUploadService.deleteFile(fileToDelete);
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.file_name !== fileToDelete)
      );
      toast.success(`File ${fileToDelete} deleted successfully`);
      closeModal();
    } catch (error: any) {
      setError(`Failed to delete file ${fileToDelete}.`);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      await FileUploadService.deleteAllFiles();
      setFiles([]);
      toast.success("All files deleted successfully");
      closeModal();
    } catch (error: any) {
      setError("Failed to delete all files.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setFileToDelete(null);
    setConfirmText("");
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await FileUploadService.fetchAllFiles();
        setFiles(response.files);
      } catch (error: any) {
        setError("Failed to load files.");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleConfirm = async () => {
    if (modalType === "single") {
      await deleteFile();
    } else if (modalType === "all") {
      await deleteAllFiles();
    }
  };

  const downloadAndProcessFile = async (fileName: string) => {
    try {
      setLoadingFileProcessing(fileName);
      const fileExtension: string = fileName.split(".").pop() || "json";
      const fileNameWithoutPrefix: string = fileName.split("/")[1];

      const { days_list, message } =
        await FileUploadService.downloadAndProcessFile(
          fileNameWithoutPrefix,
          fileExtension
        );
      dispatch(setDaysList({ days_list: days_list }));
      dispatch(resetCriticalEvents());
      toast.success(message);
      setLoadingFileProcessing(fileName);
      dispatch(setDaysInput(""));
      dispatch(setIsGlowing(true));
      dispatch(setRequestDuration(0));
      navigate("/days-list-analysis");
    } catch (error: any) {
      console.log(error);
      toast.error(`Failed to process file ${fileName}.`);
    } finally {
      setLoadingFileProcessing(null);
    }
  };

  const openDeleteAllFilesModal = () => {
    setModalType("all");
    setIsModalOpen(true);
  };

  const openDeleteFileModal = (fileName: string) => {
    setFileToDelete(fileName);
    setModalType("single");
    setIsModalOpen(true);
  };

  return {
    files,
    handleConfirm,
    downloadAndProcessFile,
    openDeleteFileModal,
    openDeleteAllFilesModal,
    loading,
    loadingFileProcessing,
    error,
    isModalOpen,
    modalType,
    confirmText,
    setConfirmText,
    closeModal,
  };
};