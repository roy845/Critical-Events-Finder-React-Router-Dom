import { useDarkMode } from "../hooks/useDarKMode";
import { FaExclamationTriangle } from "react-icons/fa";

const NoCriticalEvents = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <FaExclamationTriangle
        className="text-6xl mb-4"
        style={{ color: isDarkMode ? "#fbbf24" : "#f59e0b" }}
      />
      <h2 className="text-2xl font-semibold">No Critical Events Found</h2>
      <p className="mt-2 text-center">
        Critical events are not loaded yet. Please try again later.
      </p>
    </div>
  );
};

export default NoCriticalEvents;
