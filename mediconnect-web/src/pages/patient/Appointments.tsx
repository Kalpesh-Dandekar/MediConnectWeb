import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA ================= */

const appointments = [
  {
    doctor: "Dr. Sharma",
    department: "Cardiology",
    date: "12/3/2026",
    time: "10:30 AM",
    status: "confirmed",
  },
  {
    doctor: "Dr. Mehta",
    department: "Dermatology",
    date: "18/3/2026",
    time: "2:00 PM",
    status: "pending",
  },
];

/* ================= COMPONENT ================= */

const Appointments = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>

      <div className="w-full max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold">Appointments</h1>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
            Consultation history & scheduling
          </p>
        </div>

        {/* BOOK APPOINTMENT */}
        <div
          onClick={() => navigate("/patient/book-appointment")}
          className="cursor-pointer mb-8 sm:mb-10 p-4 sm:p-6 rounded-2xl border border-teal-400/30 
          bg-gradient-to-br from-[#1C3A52] to-[#14283C] hover:scale-[1.01] transition"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-teal-400 text-xl sm:text-2xl">＋</div>

            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base">
                Book New Appointment
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Schedule consultation with doctors
              </p>
            </div>

            <span className="text-gray-500 text-sm sm:text-base">→</span>
          </div>
        </div>

        {/* UPCOMING */}
        <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
          UPCOMING
        </p>

        {/* LIST */}
        <div className="space-y-3 sm:space-y-5">

          {appointments.length === 0 ? (
            <p className="text-gray-400 text-sm">No appointments yet</p>
          ) : (
            appointments.map((appt, index) => (
              <AppointmentCard key={index} {...appt} />
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Appointments;

/* ================= CARD ================= */

type AppointmentProps = {
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: string;
};

const AppointmentCard = ({
  doctor,
  department,
  date,
  time,
  status,
}: AppointmentProps) => {
  return (
    <div className="bg-[#13273B] border border-teal-400/20 rounded-2xl p-4 sm:p-6 
    hover:bg-[#16314A] transition">

      {/* TOP */}
      <div className="flex justify-between items-center gap-2">

        <h3 className="font-semibold text-sm sm:text-base truncate">
          {doctor}
        </h3>

        <StatusChip status={status} />

      </div>

      {/* DEPARTMENT */}
      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        {department} Specialist
      </p>

      {/* DATE */}
      <div className="flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm">
        <span className="text-teal-400">📅</span>
        <span>{date} • {time}</span>
      </div>

    </div>
  );
};

/* ================= STATUS CHIP ================= */

const StatusChip = ({ status }: { status: string }) => {
  let color = "text-red-400";

  switch (status.toLowerCase()) {
    case "confirmed":
      color = "text-green-400";
      break;
    case "completed":
      color = "text-blue-400";
      break;
    case "pending":
      color = "text-orange-400";
      break;
  }

  return (
    <div className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 ${color}`}>
      {status}
    </div>
  );
};