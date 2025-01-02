import MainLayout from "../components/layout/MainLayout";
import { useDarkMode } from "../hooks/useDarKMode";
import Spinner from "../components/Spinner";
import FormHeader from "../components/FormHeader";
import ConfirmResetModal from "../components/modal/ConfirmResetModal";
import NoFiles from "../components/NoFiles";
import FilesTable from "../components/FilesTable";
import { useFileOperations } from "../hooks/useFileOperations";
import DeleteAllFilesButton from "../components/DeleteAllFilesButton";
import Error from "../components/Error";
import { GrPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

const ListAllFiles = () => {
  const {
    files,
    searchKeyword,
    handleConfirm,
    downloadAndProcessFile,
    loading,
    openDeleteFileModal,
    openDeleteAllFilesModal,
    loadingFileProcessing,
    error,
    isModalOpen,
    modalType,
    confirmText,
    setConfirmText,
    closeModal,
    currentPage,
    totalPages,
    setPage,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
  } = useFileOperations();

  const { isDarkMode } = useDarkMode();

  if (error) {
    return (
      <MainLayout title="Error">
        {error && (
          <div className="mb-4">
            <Error error={error} />
          </div>
        )}
      </MainLayout>
    );
  }

  return (
    <MainLayout title="All Files">
      <div
        className={`max-w-6xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <FormHeader title="Files" />

        <div className="flex items-center justify-between gap-4 mb-6">
          <input
            type="text"
            value={searchKeyword}
            placeholder="Search files..."
            className={`flex-grow p-2 rounded border ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {files.length > 0 && (
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className={`px-4 py-2 border rounded-lg cursor-pointer shadow-md focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 border-gray-600 focus:ring-blue-400"
                    : "bg-white text-gray-700 border-gray-300 focus:ring-blue-500"
                }`}
              >
                {[1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(
                  (number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {files.length > 0 && (
            <DeleteAllFilesButton
              onClick={openDeleteAllFilesModal}
              isDarkMode={isDarkMode}
              loading={loading}
            />
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : files.length > 0 ? (
          <>
            <FilesTable
              files={files}
              isDarkMode={isDarkMode}
              loading={loading}
              loadingFileProcessing={loadingFileProcessing}
              openDeleteFileModal={openDeleteFileModal}
              downloadAndProcessFile={downloadAndProcessFile}
            />

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold ${
                    currentPage === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  <GrPrevious />
                </button>

                <p>
                  Page {currentPage} of {totalPages}
                </p>

                <button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={
                    currentPage === totalPages || currentPage > totalPages
                  }
                  className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold ${
                    currentPage === totalPages || currentPage > totalPages
                      ? "bg-gray-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </>
        ) : (
          <NoFiles />
        )}
      </div>

      <ConfirmResetModal
        isOpen={isModalOpen}
        confirmText={confirmText}
        isConfirmEnabled={
          (modalType === "single" && confirmText === `Delete File`) ||
          (modalType === "all" && confirmText === "Delete All")
        }
        confirmReset={modalType === "all" ? "Delete All" : `Delete File`}
        onClose={closeModal}
        onConfirm={handleConfirm}
        onTextChange={setConfirmText}
      />
    </MainLayout>
  );
};

export default ListAllFiles;
