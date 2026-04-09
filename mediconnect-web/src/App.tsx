"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

/* ================= ERROR FALLBACK ================= */
const LoadingFallback = () => (
  <div className="text-white p-10 text-xl text-center">
    🚀 Loading MediConnect...
  </div>
);

/* ================= LANDING ================= */
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));

/* ================= AUTH ================= */
const RoleSelectionPage = lazy(() => import("./pages/auth/RoleSelectionPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RoleDetailsPage = lazy(() => import("./pages/auth/RoleDetailsPage"));

/* ================= PATIENT ================= */
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));
const PatientDashboard = lazy(() => import("./pages/patient/PatientDashboard"));
const Appointments = lazy(() => import("./pages/patient/Appointments"));
const BookAppointment = lazy(() => import("./pages/patient/BookAppointment"));
const Emergency = lazy(() => import("./pages/patient/Emergency"));
const Medicines = lazy(() => import("./pages/patient/Medicines"));
const Reports = lazy(() => import("./pages/patient/Reports"));
const PatientProfile = lazy(() => import("./pages/patient/Profile"));

/* ================= DOCTOR ================= */
const DoctorLayout = lazy(() => import("./layout/DoctorLayout"));
const DoctorDashboard = lazy(() => import("./pages/doctor/DoctorDashboard"));
const Patients = lazy(() => import("./pages/doctor/Patients"));
const Consultation = lazy(() => import("./pages/doctor/Consultation"));
const Profile = lazy(() => import("./pages/doctor/DoctorProfile"));
const DoctorAppointments = lazy(() => import("./pages/doctor/TodayAppointments"));
const ViewReports = lazy(() => import("./pages/doctor/ViewReports"));
const Emergencies = lazy(() => import("./pages/doctor/Emergencies"));

/* ================= STAFF ================= */
const StaffLayout = lazy(() => import("./layout/StaffLayout"));
const StaffDashboard = lazy(() => import("./pages/staff/StaffDashboard"));
const StaffAppointments = lazy(() => import("./pages/staff/StaffAppointments"));
const StaffProfile = lazy(() => import("./pages/staff/StaffProfile"));
const StaffEmergency = lazy(() => import("./pages/staff/StaffEmergency"));
const StaffReports = lazy(() => import("./pages/staff/StaffReports"));

/* ================= RELATIVE ================= */
const RelativeLayout = lazy(() => import("./layout/RelativeLayout"));
const RelativeDashboard = lazy(() => import("./pages/relative/RelativeDashboard"));
const RelativeMedications = lazy(() => import("./pages/relative/RelativeMedications"));
const RelativeReports = lazy(() => import("./pages/relative/RelativeReports"));
const RelativeProfile = lazy(() => import("./pages/relative/RelativeProfile"));
const RelativeNotifications = lazy(() => import("./pages/relative/RelativeNotifications"));

function App() {
  const role = (localStorage.getItem("role") || "patient").toLowerCase();

  return (
    <Suspense fallback={<LoadingFallback />}>
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
            <div className="text-white p-10 text-xl text-center">
              ❌ 404 — Page Not Found
            </div>
          }
        />

      </Routes>
    </Suspense>
  );
}

export default App;