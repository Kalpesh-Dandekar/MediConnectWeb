"use client";

import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA ================= */

const doctorName = "Smith";

const metrics = [
  { value: "12", label: "Today's Appointments", icon: "📅" },
  { value: "5", label: "Waiting Patients", icon: "⏳" },
  { value: "7", label: "Consultations Done", icon: "✅" },
  { value: "1", label: "Emergency Flags", icon: "⚠️", alert: true },
];

const patients = [
  {
    token: "12",
    name: "Rahul Sharma",
    age: "34",
    reason: "Gastric Pain",
    time: "10:30 AM",
    status: "Waiting",
  },
  {
    token: "13",
    name: "Priya Mehta",
    age: "29",
    reason: "Follow-up Visit",
    time: "10:45 AM",
    status: "Scheduled",
  },
];

/* ================= COMPONENT ================= */

const DoctorDashboard = () => {
  const greeting = getGreeting();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {greeting}, Dr. {doctorName} 👋
        </h1>

        <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
          {getTodayDate()}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-8 sm:mb-10">
        <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
          QUICK ACTIONS
        </p>

        <div className="space-y-3 sm:space-y-4">

          {/* START CONSULTATION */}
          <button
            onClick={() =>
              navigate("/doctor/consultation", {
                state: {
                  patientName: patients[0]?.name,
                  patientId: patients[0]?.token,
                },
              })
            }
            className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-teal-400 text-black font-semibold text-sm sm:text-base hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl">▶️</span>
              Start Next Consultation
            </div>
            <span>→</span>
          </button>

          {/* VIEW REPORTS */}
          <button
            onClick={() =>
              navigate("/doctor/view-reports", {
                state: {
                  patientName: patients[0]?.name,
                  patientId: patients[0]?.token,
                },
              })
            }
            className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-sm sm:text-base hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl">📄</span>
              Review Patient Reports
            </div>
            <span className="text-gray-400">→</span>
          </button>

        </div>
      </div>

      {/* NEXT PATIENTS */}
      <div>
        <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
          NEXT PATIENTS
        </p>

        <div className="space-y-3 sm:space-y-4">
          {patients.map((p, i) => (
            <PatientCard key={i} {...p} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;

/* ================= HELPERS ================= */

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getTodayDate() {
  return new Date().toDateString();
}

/* ================= METRIC CARD ================= */

const MetricCard = ({ value, label, icon, alert }: any) => {
  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl border ${
        alert
          ? "border-red-400/30 bg-red-400/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-xl sm:text-2xl mb-2 sm:mb-3">{icon}</div>
      <p className="text-lg sm:text-2xl font-semibold">{value}</p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
};

/* ================= PATIENT CARD ================= */

const PatientCard = ({
  token,
  name,
  age,
  reason,
  time,
  status,
}: any) => {
  const navigate = useNavigate();

  const color =
    status === "Waiting"
      ? "text-orange-400"
      : "text-blue-400";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-white/5 border border-white/10">

      {/* LEFT (CONSULTATION CLICK) */}
      <div
        onClick={() =>
          navigate("/doctor/consultation", {
            state: {
              patientName: name,
              patientId: token,
            },
          })
        }
        className="flex items-center gap-3 sm:gap-4 cursor-pointer flex-1"
      >
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 text-xs sm:text-sm ${color}`}>
          {token}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-sm sm:text-base truncate">
            {name} ({age})
          </p>
          <p className="text-xs sm:text-sm text-gray-400 truncate">{reason}</p>
          <p className={`text-[10px] sm:text-xs mt-1 ${color}`}>
            {time} • {status}
          </p>
        </div>
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={() =>
          navigate("/doctor/view-reports", {
            state: {
              patientName: name,
              patientId: token,
            },
          })
        }
        className="px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-teal-400 text-black font-semibold"
      >
        View Reports
      </button>

    </div>
  );
};