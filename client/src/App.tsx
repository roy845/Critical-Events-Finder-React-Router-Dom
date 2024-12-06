import "./App.css";
import AppRoutes from "./AppRoutes";
// import Header from "./components/Header";
// import MainContent from "./components/MainContent";
// import AppInfoModal from "./components/modal/AppInfoModal";
// import ScrollButton from "./components/ScrollButton";
import { useDarkMode } from "./hooks/useDarKMode";

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <AppRoutes />
      {/* <Header title="Critical Events Finder" />
      <MainContent />
      <ScrollButton />
      <AppInfoModal /> */}
    </div>
  );
}

export default App;
