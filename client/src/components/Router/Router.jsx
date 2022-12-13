// importing necessary packages for routing
import { Routes, Route, useLocation } from "react-router-dom";

// importing all pages which need routing
import LandingPage from "../../pages/LandingPage/LandingPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import UserPage from "../../pages/UserPage/UserPage";
import PersonalForm from "../../pages/BackgroundForm/PersonalForm/PersonalForm";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";

const Router = () => {
  let location = useLocation();

  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* placeholder paths and pages */}
        <Route exact="true" path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<UserPage />} />
        <Route path="/personal-background" element={<PersonalForm />} />
      </Routes>
    </>
  );
};

export default Router;
