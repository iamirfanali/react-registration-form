import { Route, Routes, Navigate } from "react-router-dom";
import RegistrationForm from "../components/form/registrationForm";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/register" />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  );
};
