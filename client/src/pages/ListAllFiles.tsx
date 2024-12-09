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

const ListAllFiles = () => {
  const {
    files,
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
  } = useFileOperations();

  const { isDarkMode } = useDarkMode();

  if (loading) {
    return (
      <MainLayout title="Loading">
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Error">
        <Error error={error} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="All Files">
      {files.length > 0 ? (
        <div
          className={`max-w-6xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <FormHeader title="Files" />

          <DeleteAllFilesButton
            onClick={openDeleteAllFilesModal}
            isDarkMode={isDarkMode}
            loading={loading}
          />

          <FilesTable
            files={files}
            isDarkMode={isDarkMode}
            loading={loading}
            loadingFileProcessing={loadingFileProcessing}
            openDeleteFileModal={openDeleteFileModal}
            downloadAndProcessFile={downloadAndProcessFile}
          />
        </div>
      ) : (
        <NoFiles />
      )}

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
