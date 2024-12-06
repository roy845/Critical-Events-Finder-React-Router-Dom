import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useDarkMode } from "../hooks/useDarKMode";

const NotFound = (): JSX.Element => {
  useDocumentTitle("Not Found");
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <FaExclamationTriangle
        className={`${
          isDarkMode ? "text-red-400" : "text-red-600"
        } text-6xl mb-4`}
      />
      <h1
        className={`text-4xl font-bold ${
          isDarkMode ? "text-red-400" : "text-red-600"
        } mb-4`}
      >
        404 - Page Not Found
      </h1>
      <p
        className={`text-lg ${
          isDarkMode ? "text-gray-400" : "text-gray-700"
        } mb-4`}
      >
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className={`px-4 py-2 rounded hover:bg-opacity-80 flex items-center gap-2 ${
          isDarkMode
            ? "bg-blue-700 text-gray-200 hover:bg-blue-800"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        <span>Go Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
