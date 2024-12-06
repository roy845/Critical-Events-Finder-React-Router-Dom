import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { resetForm } from "../features/criticalEvents/criticalEventsSlice";
import { useNavigate } from "react-router-dom";

export const useFormButtons = (
  fileInputRef: React.RefObject<HTMLInputElement>,
  JSONFilInputRef: React.RefObject<HTMLInputElement>,
  closeModal: () => void
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isGlowing } = useAppSelector(
    (state: RootState) => state.criticalEvents
  );

  const handleReset = (): void => {
    dispatch(resetForm());

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (JSONFilInputRef.current) {
      JSONFilInputRef.current.value = "";
    }

    toast.info("Form has been reset.");
  };

  const confirmReset = (): void => {
    handleReset();
    closeModal();
    navigate("/");
  };

  return { loading, isGlowing, confirmReset };
};
