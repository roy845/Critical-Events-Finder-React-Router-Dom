import { useAppSelector } from "../app/hooks";
import { selectPaginatedCriticalEvents } from "../features/criticalEvents/criticalEventsSlice";
import { useDarkMode } from "./useDarKMode";

const useCriticalEventsResults = () => {
  const { isDarkMode } = useDarkMode();
  const { searchCriticalEvents } = useAppSelector(
    (state) => state.criticalEvents
  );

  const criticalEvents = useAppSelector(selectPaginatedCriticalEvents);

  const { criticalEvents: allCriticalEvents } = useAppSelector(
    (state) => state.criticalEvents
  );

  const { activeTab } = useAppSelector((state) => state.tabs);

  return {
    activeTab,
    isDarkMode,
    searchCriticalEvents,
    criticalEvents,
    allCriticalEvents,
  };
};

export default useCriticalEventsResults;
