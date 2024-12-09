import React from "react";
import { useDarkMode } from "../hooks/useDarKMode";

type ErrorProps = {
  error: string;
};

const Error = ({ error }: ErrorProps) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex items-center justify-center">
      <p
        className={`text-center ${
          isDarkMode ? "text-red-400" : "text-red-500"
        } mb-4`}
      >
        {error}
      </p>
    </div>
  );
};

export default Error;
