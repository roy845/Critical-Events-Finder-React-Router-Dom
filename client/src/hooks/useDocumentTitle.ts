import { useEffect } from "react";

const useDocumentTitle = (title: string): null => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default useDocumentTitle;
