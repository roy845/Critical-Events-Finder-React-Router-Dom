import React from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { FileType } from "../types/types";
import { Utils } from "../utils/utils";

interface FilesTableProps {
  files: FileType[];
  isDarkMode: boolean;
  loading: boolean;
  loadingFileProcessing: string | null;
  openDeleteFileModal: (fileName: string) => void;
  downloadAndProcessFile: (fileName: string) => void;
}

const FilesTable = ({
  files,
  isDarkMode,
  loading,
  loadingFileProcessing,
  openDeleteFileModal,
  downloadAndProcessFile,
}: FilesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full border-collapse ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } rounded-lg shadow-md`}
      >
        <thead>
          <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
            <th className="p-4 text-left font-medium">#</th>
            <th className="p-4 text-left font-medium">File Name</th>
            <th className="p-4 text-left font-medium">Size</th>
            <th className="p-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file: FileType, index: number) => (
            <tr
              key={file.file_name}
              className={`border-b ${
                isDarkMode
                  ? "border-gray-700 hover:bg-gray-600"
                  : "border-gray-200 hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4 truncate cursor-pointer">
                {file.file_name.split("/")[1]}
              </td>
              <td className="p-4 truncate cursor-pointer">
                {Utils.formatFileSize(file.size)}
              </td>
              <td className="flex space-x-2">
                <button
                  onClick={() => openDeleteFileModal(file.file_name)}
                  disabled={loading}
                  className={`flex items-center justify-center ${
                    isDarkMode ? "bg-red-700" : "bg-red-600"
                  } text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>

                <button
                  onClick={() => downloadAndProcessFile(file.file_name)}
                  className={`w-48 py-2 font-semibold rounded-md transition relative ${
                    loadingFileProcessing === file.file_name
                      ? "bg-gray-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {loadingFileProcessing === file.file_name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TailSpin
                        height={20}
                        width={20}
                        color="white"
                        ariaLabel="loading"
                      />
                    </div>
                  )}
                  <span
                    className={
                      loadingFileProcessing === file.file_name
                        ? "opacity-0 flex justify-center gap-4"
                        : "flex justify-center gap-4"
                    }
                  >
                    Process
                    <FaDownload />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;
