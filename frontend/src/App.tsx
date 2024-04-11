import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MessagePage from "./pages/MessagePage.tsx";
import MobileHeader from "./components/layout/MobileHeader.tsx";
import MobileSidebar from "./components/Home/MobileSidebar.tsx";
import ActivationPage from "./pages/AuthPage/ActivationPage";
import LoginPage from "./pages/AuthPage/LoginPage.tsx";
import Register from "./pages/AuthPage/Register.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import {
  clearError,
  clearMessage,
  loadUser,
} from "./features/users/userSlice.ts";
import store, { RootState } from "./app/store.ts";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Route/ProtectedRoute.tsx";
import Sidebar from "./components/Home/Sidebar.tsx";

function App() {
  const error = useSelector((state: RootState) => state.user.error);
  // const user = useSelector((state:RootState)=>state.user.error)
  const message = useSelector((state: RootState) => state.user.message);

  const dispatch = useDispatch();

  if (error) {
    toast.error(error);
    dispatch(clearError());
  }
  if (message) {
    toast.success(message);
    dispatch(clearMessage());
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="flex w-full">
      <Router>
        {/* sidebar */}
        <div className=" hidden sm:block md:w-[8%] lg:w-[18%]">
          <Sidebar />
        </div>
        <div className="fixed top-0 block sm:hidden w-full z-50">
          <MobileHeader />
        </div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Mobile Sidebar */}

        <div className="fixed bottom-0 block sm:hidden w-full">
          <MobileSidebar />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </div>
  );
}

export default App;
