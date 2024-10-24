// import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import "./styles/toast.css";
import { Logger } from "./utils/logger.util";
import { useEffect } from "react";
import DashBoardLayout from "./pages/dashboard";
import ComposeTask from "./pages/dashboard/Compose";
import { removeLocalStorage } from "./utils/storage";

function App() {
  const logger = new Logger("App");
  window.onbeforeunload = function () {
    removeLocalStorage("access_token");
  };
  useEffect(() => {
    logger.info("App initialized");
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<></>}></Route>
          </Route>
          <Route
            path="/task"
            element={
                <DashBoardLayout />
            }
          >
            <Route path="" />

            <Route
              path="create-task"
              element={
                  <ComposeTask />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
