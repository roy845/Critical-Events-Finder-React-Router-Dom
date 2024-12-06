import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Utils } from "../utils/utils";
import {
  generateRandomDaysList,
  resetCriticalEvents,
  setFilePropertiesNull,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { useNavigate } from "react-router-dom";

const useRandomEventButton = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [buttonColor, setButtonColor] = useState(Utils.getRandomColor());

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const generateRandomDaysListWithEvents = () => {
    dispatch(resetCriticalEvents());
    dispatch(setFilePropertiesNull());
    dispatch(generateRandomDaysList());
    dispatch(setRequestDuration(0));
  };

  const handleClick = () => {
    generateRandomDaysListWithEvents();
    setButtonColor(Utils.getRandomColor());
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      navigate("/days-list-analysis");
    }, 1000);
  };
  return { isSpinning, buttonColor, setButtonColor, handleClick };
};

export default useRandomEventButton;
