import { useState, useEffect, useCallback } from "react";
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
import debounce from "lodash.debounce";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(3);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchFiles, setSearchFiles] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      setSearchFiles(keyword);
    }, 500),
    []
  );

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

  const fetchFiles = async (
    page: number = 1,
    limit: number | string = 3,
    search: string = ""
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await FileUploadService.fetchAllFiles(
        page,
        limit,
        search
      );
      setFiles(response.files);
      setTotalPages(response.total_pages);
    } catch (error) {
      setError("Failed to load files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPage, itemsPerPage, searchFiles);
  }, [currentPage, itemsPerPage, searchFiles]);

  useEffect(() => {
    debouncedSearch(searchKeyword);
  }, [searchKeyword, debouncedSearch]);

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
    searchKeyword,
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
    currentPage,
    totalPages,
    itemsPerPage,
    setPage: (page: number) =>
      page > 0 && page <= totalPages && setCurrentPage(page),
    setItemsPerPage: (limit: number | string) => {
      setItemsPerPage(limit);
      setCurrentPage(1);
    },
    setSearchTerm: (term: string) => {
      setSearchKeyword(term);
      setCurrentPage(1);
    },
  };
};
