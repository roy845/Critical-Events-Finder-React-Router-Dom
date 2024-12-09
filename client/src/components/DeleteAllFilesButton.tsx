import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteAllFilesButtonProps {
  onClick: () => void;
  isDarkMode: boolean;
  loading: boolean;
}

const DeleteAllFilesButton: React.FC<DeleteAllFilesButtonProps> = ({
  onClick,
  isDarkMode,
  loading,
}) => {
  return (
    <div className="flex justify-start mb-6">
      <button
        onClick={onClick}
        disabled={loading}
        className={`flex items-center ${
          isDarkMode ? "bg-red-700 text-white" : "bg-red-600 text-white"
        } font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        <FaTrash className="mr-2" />
        Delete All Files
      </button>
    </div>
  );
};

export default DeleteAllFilesButton;
