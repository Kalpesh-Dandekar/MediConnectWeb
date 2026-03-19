"use client";

import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import RoleSelectionPage from "./pages/auth/RoleSelectionPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import RoleDetailsPage from "./pages/auth/RoleDetailsPage";

/* ================= PATIENT ================= */
import PatientDashboard from "./pages/patient/PatientDashboard";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import Emergency from "./pages/patient/Emergency";
import Medicines from "./pages/patient/Medicines";
import Reports from "./pages/patient/Reports";

/* ================= DOCTOR ================= */
import DoctorLayout from "./layout/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Patients from "./pages/doctor/Patients";
import Consultation from "./pages/doctor/Consultation";
import Profile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/TodayAppointments";

/* ================= STAFF ================= */
import StaffLayout from "./layout/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffAppointments from "./pages/staff/StaffAppointments";
import StaffReports from "./pages/staff/StaffReports";
import StaffPatients from "./pages/staff/StaffPatients";
import StaffProfile from "./pages/staff/StaffProfile";

/* ================= RELATIVE ================= */
import RelativeLayout from "./layout/RelativeLayout";
import RelativeDashboard from "./pages/relative/RelativeDashboard";
import RelativeMedications from "./pages/relative/RelativeMedications";
import RelativeReports from "./pages/relative/RelativeReports";
import RelativeProfile from "./pages/relative/RelativeProfile";

function App() {
  /* ✅ FIX: normalize role */
  const role = (localStorage.getItem("role") || "patient").toLowerCase();

  return (
    <Routes>

      {/* ================= LANDING ================= */}
      <Route path="/" element={<LandingPage />} />

      {/* ================= AUTH ================= */}
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

      {/* ================= DOCTOR ================= */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="consultation" element={<Consultation />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ================= STAFF ================= */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="appointments" element={<StaffAppointments />} />
        <Route path="reports" element={<StaffReports />} />
        <Route path="patients" element={<StaffPatients />} />
        <Route path="profile" element={<StaffProfile />} />
      </Route>

      {/* ================= RELATIVE ================= */}
      <Route path="/relative" element={<RelativeLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<RelativeDashboard />} />
        <Route path="medications" element={<RelativeMedications />} />
        <Route path="reports" element={<RelativeReports />} />
        <Route path="profile" element={<RelativeProfile />} />
      </Route>

      {/* ================= ROLE BASED REDIRECT ================= */}
      <Route
        path="/dashboard"
        element={
          role === "doctor" ? (
            <Navigate to="/doctor/dashboard" />
          ) : role === "staff" ? (
            <Navigate to="/staff/dashboard" />
          ) : role === "relative" ? (
            <Navigate to="/relative/dashboard" />
          ) : (
            <Navigate to="/patient/dashboard" />
          )
        }
      />

      {/* ================= FALLBACK ================= */}
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