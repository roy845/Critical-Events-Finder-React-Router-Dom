import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DaysListInput from "./pages/DaysListInput";
import DaysListAnalysis from "./pages/DaysListAnalysis";
import CriticalEventsResults from "./pages/CriticalEventsResults";
import NotFound from "./pages/NotFound";

const AppRoutes = (): JSX.Element => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <DaysListInput />,
    },
    {
      path: "/days-list-analysis",
      element: <DaysListAnalysis />,
    },
    {
      path: "/critical-events-results",
      element: <CriticalEventsResults />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
