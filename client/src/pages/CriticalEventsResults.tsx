import CriticalEventsTable from "../components/CriticalEventsTable";
import FormHeader from "../components/FormHeader";
import Graphs from "../components/Graphs";
import GroupedCriticalEvents from "../components/GroupedCriticalEvents";
import GroupedCriticalEventsPagination from "../components/GroupedCriticalEventsPagination";
import MainLayout from "../components/layout/MainLayout";
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
      <MainLayout title="Critical Events Not Found">
        <NoCriticalEvents />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Critical Events Results">
      <div
        className={`max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        style={{
          minWidth: "800px",
        }}
      >
        <FormHeader title="Critical Events Results" />
        {criticalEvents.length === 0 && searchCriticalEvents.trim() !== "" && (
          <Tabs />
        )}
        {criticalEvents.length > 0 && <Tabs />}
        {activeTab === "table" ? (
          <CriticalEventsTable />
        ) : activeTab === "graphs" ? (
          allCriticalEvents.length > 0 && <Graphs />
        ) : (
          allCriticalEvents.length > 0 && (
            <>
              <GroupedCriticalEvents />
              <GroupedCriticalEventsPagination />
            </>
          )
        )}
      </div>
    </MainLayout>
  );
};

export default CriticalEventsResults;
