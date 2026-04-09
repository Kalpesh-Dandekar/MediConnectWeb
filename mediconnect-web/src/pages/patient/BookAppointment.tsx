"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookAppointment } from "../../services/patient/appointmentService";

/* ================= DATA ================= */

const departments = [
  "Cardiology",
  "Dermatology",
  "Gastroenterology",
  "Orthopedics",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM",
];

/* ================= COMPONENT ================= */

const BookAppointment = () => {
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const isValid =
    selectedDepartment &&
    doctor &&
    selectedDate &&
    selectedSlot;

  const handleSubmit = async () => {
    try {
      if (!isValid) return;

      setLoading(true);

      await bookAppointment({
        doctorName: doctor,
        department: selectedDepartment!,
        date: selectedDate!,
        timeSlot: selectedSlot!,
      });

      alert("Appointment Confirmed ✅");
      navigate("/patient/appointments");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Book Appointment
        </h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
          Schedule your consultation easily
        </p>
      </div>

      <div className="space-y-6 sm:space-y-10">

        {/* DEPARTMENT */}
        <Section title="Department">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {departments.map((dept) => {
              const selected = selectedDepartment === dept;

              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 sm:px-5 py-2 rounded-xl border transition text-xs sm:text-sm
                  ${
                    selected
                      ? "border-teal-400 text-teal-400 bg-white/5"
                      : "border-white/10 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </Section>

        {/* DOCTOR */}
        <Section title="Doctor">
          <input
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder="Enter doctor's name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-[#14283C] border border-white/10 text-white outline-none focus:border-teal-400 text-sm"
          />
        </Section>

        {/* DATE */}
        <Section title="Date">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
            {next7Days.map((date, i) => {
              const selected =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`min-w-[60px] sm:min-w-[70px] py-2 sm:py-3 rounded-xl border transition flex flex-col items-center text-xs sm:text-sm
                  ${
                    selected
                      ? "border-teal-400 text-teal-400"
                      : "border-white/10 text-gray-400"
                  }`}
                >
                  <span className="font-semibold">{date.getDate()}</span>
                  <span className="text-[10px] sm:text-xs">
                    {month(date.getMonth())}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* TIME */}
        <Section title="Time Slot">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {timeSlots.map((slot) => {
              const selected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 sm:px-4 py-2 rounded-lg border transition text-xs sm:text-sm
                  ${
                    selected
                      ? "border-teal-400 text-teal-400"
                      : "border-white/10 text-gray-400"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </Section>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition
          ${
            isValid
              ? "bg-teal-400 text-black hover:scale-[1.01]"
              : "bg-teal-400/30 text-black/50 cursor-not-allowed"
          }`}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>

      </div>

    </div>
  );
};

export default BookAppointment;

/* ================= SECTION ================= */

const Section = ({ title, children }: any) => (
  <div>
    <p className="text-xs tracking-widest text-gray-500 mb-3">
      {title.toUpperCase()}
    </p>
    {children}
  </div>
);

function month(m: number) {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m];
}