import DoctorLayout from "../../layout/DoctorLayout";

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

  return (
    <DoctorLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">
          {greeting}, Dr. {doctorName} 👋
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          {getTodayDate()}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-10">
        <p className="text-xs tracking-widest text-gray-500 mb-4">
          QUICK ACTIONS
        </p>

        <div className="space-y-4">

          <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-teal-400 text-black font-semibold hover:scale-[1.01] transition">
            <div className="flex items-center gap-3">
              <span className="text-xl">▶️</span>
              Start Next Consultation
            </div>
            <span>→</span>
          </button>

          <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <span className="text-xl">📄</span>
              Review Patient Reports
            </div>
            <span className="text-gray-400">→</span>
          </button>

        </div>
      </div>

      {/* NEXT PATIENTS */}
      <div>
        <p className="text-xs tracking-widest text-gray-500 mb-4">
          NEXT PATIENTS
        </p>

        <div className="space-y-4">
          {patients.map((p, i) => (
            <PatientCard key={i} {...p} />
          ))}
        </div>
      </div>

    </DoctorLayout>
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
  const now = new Date();
  return now.toDateString();
}

/* ================= METRIC CARD ================= */

const MetricCard = ({
  value,
  label,
  icon,
  alert,
}: any) => {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        alert
          ? "border-red-400/30 bg-red-400/5"
          : "border-white/10 bg-white/5"
      } hover:scale-[1.02] transition`}
    >
      <div className="text-2xl mb-3">{icon}</div>

      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
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
  const color =
    status === "Waiting"
      ? "text-orange-400"
      : "text-blue-400";

  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">

      {/* TOKEN */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 ${color}`}>
        {token}
      </div>

      {/* INFO */}
      <div className="flex-1">
        <p className="font-semibold">
          {name} ({age})
        </p>
        <p className="text-sm text-gray-400">{reason}</p>
        <p className={`text-xs mt-1 ${color}`}>
          {time} • {status}
        </p>
      </div>

    </div>
  );
};