"use client";

import { Routes, Route, Navigate } from "react-router-dom";

/* ================= LANDING ================= */
import LandingPage from "./pages/landing/LandingPage";

/* ================= AUTH ================= */
import RoleSelectionPage from "./pages/auth/RoleSelectionPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import RoleDetailsPage from "./pages/auth/RoleDetailsPage";

/* ================= PATIENT ================= */
import DashboardLayout from "./layout/DashboardLayout";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Appointments from "./pages/patient/Appointments";
import BookAppointment from "./pages/patient/BookAppointment";
import Emergency from "./pages/patient/Emergency";
import Medicines from "./pages/patient/Medicines";
import Reports from "./pages/patient/Reports";
import PatientProfile from "./pages/patient/Profile";

/* ================= DOCTOR ================= */
import DoctorLayout from "./layout/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Patients from "./pages/doctor/Patients";
import Consultation from "./pages/doctor/Consultation";
import Profile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/TodayAppointments";
import ViewReports from "./pages/doctor/ViewReports";
import Emergencies from "./pages/doctor/Emergencies";

/* ================= STAFF ================= */
import StaffLayout from "./layout/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffAppointments from "./pages/staff/StaffAppointments";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffEmergency from "./pages/staff/StaffEmergency";
import StaffReports from "./pages/staff/StaffReports";
/* ================= RELATIVE ================= */
import RelativeLayout from "./layout/RelativeLayout";
import RelativeDashboard from "./pages/relative/RelativeDashboard";
import RelativeMedications from "./pages/relative/RelativeMedications";
import RelativeReports from "./pages/relative/RelativeReports";
import RelativeProfile from "./pages/relative/RelativeProfile";
import RelativeNotifications from "./pages/relative/RelativeNotifications";

function App() {
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
      <Route path="/patient" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>

      {/* ================= DOCTOR ================= */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="consultation" element={<Consultation />} />
        <Route path="profile" element={<Profile />} />
        <Route path="view-reports" element={<ViewReports />} />
        <Route path="emergency" element={<Emergencies />} />
      </Route>

      {/* ================= STAFF ================= */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="appointments" element={<StaffAppointments />} />
        <Route path="emergency" element={<StaffEmergency />} />
        <Route path="profile" element={<StaffProfile />} />

        {/* ✅ ADDED FIX (DO NOT REMOVE ANYTHING ELSE) */}
        <Route path="reports" element={<StaffReports />} />
      </Route>

      {/* ================= RELATIVE ================= */}
      <Route path="/relative" element={<RelativeLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<RelativeDashboard />} />
        <Route path="medications" element={<RelativeMedications />} />
        <Route path="reports" element={<RelativeReports />} />
        <Route path="profile" element={<RelativeProfile />} />
        <Route path="notifications" element={<RelativeNotifications />} />
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

      {/* ================= 404 ================= */}
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