import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { Sidebar } from "./components/sidebar/Sidebar";
import Analytics from "./pages/analytics/Analytics";

function App() {
  const HomeLayout = () => {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  };

  const DashboardLayout = () => {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            position: "fixed",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: 5, marginLeft: "13rem" }}>
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard/",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/analytics",
          element: <Analytics />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
