"use client";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listenToAppointments } from "../../services/patient/appointmentService";

/* ================= COMPONENT ================= */

const Appointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 REALTIME FIRESTORE
  useEffect(() => {
    const unsubscribe = listenToAppointments((snapshot: any) => {

      const data = snapshot.docs.map((doc: any) => {
        const d = doc.data();
        const dateObj = d.date?.toDate?.();

        return {
          id: doc.id,
          doctor: d.doctorName,
          department: d.department,
          date: dateObj
            ? `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
            : "",
          time: d.timeSlot,
          status: normalizeStatus(d.status),
        };
      });

      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  return (
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

      {/* ALL APPOINTMENTS */}
      <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
        ALL APPOINTMENTS
      </p>

      {/* LIST */}
      <div className="space-y-3 sm:space-y-5">

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-400 text-sm">No appointments yet</p>
        ) : (
          appointments.map((appt) => (
            <AppointmentCard key={appt.id} {...appt} />
          ))
        )}

      </div>

    </div>
  );
};

export default Appointments;

/* ================= HELPERS ================= */

const normalizeStatus = (status: string) => {
  if (!status) return "pending";

  const s = status.toLowerCase();

  if (s === "waiting") return "pending";
  if (s === "confirmed") return "confirmed";
  if (s === "completed") return "completed";
  if (s === "cancelled") return "cancelled";

  return "pending";
};

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

      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold text-sm sm:text-base truncate">
          {doctor}
        </h3>
        <StatusChip status={status} />
      </div>

      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        {department} Specialist
      </p>

      <div className="flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm">
        <span className="text-teal-400">📅</span>
        <span>{date} • {time}</span>
      </div>

    </div>
  );
};

/* ================= STATUS CHIP ================= */

const StatusChip = ({ status }: { status: string }) => {
  let color = "text-gray-400";

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
    case "cancelled":
      color = "text-red-400";
      break;
  }

  return (
    <div className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 ${color}`}>
      {status}
    </div>
  );
};