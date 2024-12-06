import CriticalEventsTable from "../components/CriticalEventsTable";
import FormHeader from "../components/FormHeader";
import Graphs from "../components/Graphs";
import Header from "../components/Header";
import NoCriticalEvents from "../components/NoCriticalEvents";
import Tabs from "../components/Tabs";
import useCriticalEventsResults from "../hooks/useCriticalEventsResults";

const CriticalEventsResults = () => {
  const {
    activeTab,
    allCriticalEvents,
    criticalEvents,
    isDarkMode,
    searchCriticalEvents,
  } = useCriticalEventsResults();

  if (allCriticalEvents.length === 0) {
    return (
      <>
        <Header title="Critical Events Finder" />
        <NoCriticalEvents />
      </>
    );
  }

  return (
    <>
      <Header title="Critical Events Finder" />
      <div
        className={`max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <FormHeader title="Critical Events Results" />
        {criticalEvents.length === 0 && searchCriticalEvents.trim() !== "" && (
          <Tabs />
        )}
        {criticalEvents.length > 0 && <Tabs />}
        {activeTab === "table" ? (
          <CriticalEventsTable />
        ) : (
          allCriticalEvents.length > 0 && <Graphs />
        )}
      </div>
    </>
  );
};

export default CriticalEventsResults;
