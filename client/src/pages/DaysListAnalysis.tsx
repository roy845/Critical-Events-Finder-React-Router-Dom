import Accordion from "../components/Accordion";
import FormHeader from "../components/FormHeader";
import GraphsAccordion from "../components/GraphsAccordion";
import GraphsCarousel from "../components/GraphsCarousel";
import ItemsPerPageDaysList from "../components/ItemsPerPageDaysList";
import DaysList from "../components/DaysList";
import DaysListPagination from "../components/DaysListPagination";
import FormButtons from "../components/FormButtons";
import DurationUnitSelect from "../components/DurationUnitSelect";
import ScrollButton from "../components/ScrollButton";
import DaysListNotFound from "../components/DaysListNotFound";
import useDaysListAnalysis from "../hooks/useDaysListAnalysis";
import MainLayout from "../components/layout/MainLayout";

const DaysListAnalysis = () => {
  const {
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
  } = useDaysListAnalysis();

  if (daysList.days_list.length === 0) {
    return (
      <MainLayout title="Days List Not Loaded">
        <DaysListNotFound />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Days List Analysis">
      <div
        className={`max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <FormHeader title="Days List Analysis" />
        {fileProperties && <Accordion file={fileProperties} />}
        {daysList.days_list.length > 0 && (
          <GraphsAccordion title="Intersections / Events Charts">
            <GraphsCarousel
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          </GraphsAccordion>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {daysList.days_list.length > 0 && <ItemsPerPageDaysList />}
          <DaysList daysList={paginatedDaysList} />

          {daysList.days_list.length > 0 && <DaysListPagination />}

          {(daysList.days_list.length > 0 || criticalEvents.length > 0) && (
            <>
              <FormButtons
                fileInputRef={fileInputRef}
                JSONFilInputRef={JSONfileInputRef}
              />
              {requestDuration.toString() !== "0" && (
                <DurationUnitSelect
                  durationUnit={durationUnit}
                  onChange={handleDurationUnitChange}
                  isDarkMode={isDarkMode}
                />
              )}

              {durationUnit !== "none" &&
                requestDuration.toString() !== "0" && (
                  <p className="mt-2">{`Request completed in ${displayedDuration}`}</p>
                )}
            </>
          )}
        </form>
        <ScrollButton />
      </div>
    </MainLayout>
  );
};

export default DaysListAnalysis;
