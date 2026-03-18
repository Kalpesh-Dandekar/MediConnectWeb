import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import RoleSelectionPage from "./pages/auth/RoleSelectionPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import RoleDetailsPage from "./pages/auth/RoleDetailsPage";

/* ✅ PATIENT PAGES (REAL ONES) */
import PatientDashboard from "./pages/patient/PatientDashboard";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import Emergency from "./pages/patient/Emergency";
import Medicines from "./pages/patient/Medicines";
import Reports from "./pages/patient/Reports";

/* ================= COMPONENT ================= */

function App() {
  return (
    <Routes>

      {/* ================= LANDING ================= */}
      <Route path="/" element={<LandingPage />} />

      {/* ================= AUTH FLOW ================= */}
      <Route path="/auth/role" element={<RoleSelectionPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/details" element={<RoleDetailsPage />} />

      {/* ================= PATIENT ================= */}
      <Route path="/patient/dashboard" element={<PatientDashboard />} />
      <Route path="/patient/appointments" element={<Appointments />} />
      <Route path="/patient/book-appointment" element={<BookAppointment />} />
      <Route path="/patient/emergency" element={<Emergency />} />
      <Route path="/patient/medicines" element={<Medicines />} />
      <Route path="/patient/reports" element={<Reports />} />

      {/* ✅ DEFAULT REDIRECT */}
      <Route path="/dashboard" element={<Navigate to="/patient/dashboard" />} />

      {/* ✅ FALLBACK */}
      <Route
        path="*"
        element={
          <div className="text-white p-10 text-xl">
            404 — Page Not Found
          </div>
        }
      />

    </Routes>
  );
}

export default App;