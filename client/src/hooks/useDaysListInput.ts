import { useRef } from "react";
import { useDarkMode } from "./useDarKMode";

const useDaysListInput = () => {
  const { isDarkMode } = useDarkMode();
  const fileInputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const JSONfileInputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  return {
    isDarkMode,
    fileInputRef,
    JSONfileInputRef,
  };
};

export default useDaysListInput;
