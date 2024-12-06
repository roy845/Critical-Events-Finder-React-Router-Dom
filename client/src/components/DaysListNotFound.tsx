import { FaExclamationCircle } from "react-icons/fa";
import { useDarkMode } from "../hooks/useDarKMode";

const DaysListNotFound = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <FaExclamationCircle
        className="text-6xl mb-4"
        style={{ color: isDarkMode ? "#f87171" : "#dc2626" }}
      />
      <h2 className="text-2xl font-semibold">Days List Not Loaded</h2>
      <p className="mt-2 text-center">
        Days List is not loaded yet. Please upload a file or check your input to
        proceed.
      </p>
    </div>
  );
};

export default DaysListNotFound;
