import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchCriticalEvents,
  selectPaginatedDaysList,
  setIsGlowing,
  setRequestDuration,
} from "../features/criticalEvents/criticalEventsSlice";
import { useDarkMode } from "./useDarKMode";
import { DayEvent, DurationUnit } from "../types/types";
import { useNavigate } from "react-router-dom";

const useDaysListAnalysis = () => {
  const { isDarkMode } = useDarkMode();
  const { fileProperties, daysList, criticalEvents, requestDuration } =
    useAppSelector((state) => state.criticalEvents);

  const paginatedDaysList = useAppSelector(selectPaginatedDaysList);

  const dispatch = useAppDispatch();

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const [durationUnit, setDurationUnit] = useState<DurationUnit>("ms");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const startTime: number = performance.now();

    const payload: {
      days_list: DayEvent[][];
    } = { days_list: daysList.days_list.map((day) => day.events) };
    await dispatch(fetchCriticalEvents(payload.days_list));
    dispatch(setIsGlowing(false));
    navigate("/critical-events-results");

    const endTime: number = performance.now();

    dispatch(setRequestDuration(+(endTime - startTime).toFixed(2)));
  };

  const fileInputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const JSONfileInputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handleDurationUnitChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDurationUnit(e.target.value as DurationUnit);
  };

  const displayedDuration: string =
    durationUnit === "s"
      ? `${(Number(requestDuration) / 1000).toFixed(2)} seconds`
      : `${requestDuration} ms`;
  return {
    daysList,
    isDarkMode,
    fileProperties,
    activeSlide,
    setActiveSlide,
    handleSubmit,
    paginatedDaysList,
    criticalEvents,
    fileInputRef,
    JSONfileInputRef,
    requestDuration,
    handleDurationUnitChange,
    durationUnit,
    displayedDuration,
  };
};

export default useDaysListAnalysis;
