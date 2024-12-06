import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDaysInput,
  addDays,
  resetCriticalEvents,
  setFilePropertiesNull,
  setIsGlowing,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { toast } from "react-toastify";

export const useDaysInput = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const daysInput = useAppSelector((state) => state.criticalEvents.daysInput);

  const handleInputChange = (value: string) => {
    dispatch(setDaysInput(value));
  };

  const handleAddDays = () => {
    if (isNaN(+daysInput) || +daysInput <= 0) {
      toast.error("Please enter a valid positive number of days.");
      return;
    }
    dispatch(addDays());
    dispatch(resetCriticalEvents());
    dispatch(setFilePropertiesNull());
    dispatch(setIsGlowing(true));
    dispatch(setRequestDuration(0));
    navigate("/days-list-analysis");
  };

  return {
    daysInput,
    handleInputChange,
    handleAddDays,
  };
};
