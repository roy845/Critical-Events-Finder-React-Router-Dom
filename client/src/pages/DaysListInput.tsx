import DaysInput from "../components/DaysInput";
import FileUpload from "../components/FileUpload";
import FormHeader from "../components/FormHeader";
import JSONFileUpload from "../components/JSONFileUpload";
import RandomEventButton from "../components/RandomEventButton";
import AppInfoModal from "../components/modal/AppInfoModal";
import useDaysListInput from "../hooks/useDaysListInput";
import MainLayout from "../components/layout/MainLayout";
import { Link } from "react-router-dom";

const DaysListInput = () => {
  const { JSONfileInputRef, fileInputRef, isDarkMode } = useDaysListInput();
  return (
    <MainLayout title="Days List Input">
      <AppInfoModal />
      <div
        className={`max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <FormHeader title="Days List Input" />

        <DaysInput />
        <br />
        <div
          className={`text-center mb-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          OR
        </div>
        <FileUpload fileInputRef={fileInputRef} />
        <br />
        <div
          className={`text-center mb-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          OR
        </div>
        <JSONFileUpload fileInputRef={JSONfileInputRef} />
        <br />
        <div
          className={`text-center mb-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          OR
        </div>
        <label
          className={`block font-medium mb-2 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Generate Random Events
        </label>
        <div className={"text-center mb-2"}>
          <RandomEventButton />
        </div>

        <div
          className={`text-center mb-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          OR
        </div>
        <div className="text-center mt-6">
          <Link
            to="/all-files"
            className={`inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition ${
              isDarkMode ? "hover:bg-blue-700" : ""
            }`}
          >
            View All Files
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default DaysListInput;
