"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveConsultation } from "../../services/doctor/consultationService";

/* ================= TYPES ================= */

type Prescription = {
  medicine: string;
  duration: string;
  timings: string[];
};

/* ================= COMPONENT ================= */

const Consultation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const patientId = state?.patientId || "";
  const patientName = state?.patientName || "Patient";
  const appointmentId = state?.appointmentId || "";

  const [diagnosis, setDiagnosis] = useState("");
  const [summary, setSummary] = useState("");
  const [advice, setAdvice] = useState("");

  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState("");

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [tests, setTests] = useState<string[]>([]);
  const [followUp, setFollowUp] = useState("");

  const [loading, setLoading] = useState(false);

  const timingOptions = ["Morning", "Afternoon", "Night"];
  const [selectedTimings, setSelectedTimings] = useState<string[]>([]);

  /* ================= ADD MED ================= */

  const addPrescription = () => {
    if (!medicine || !duration) return;

    setPrescriptions([
      ...prescriptions,
      {
        medicine,
        duration,
        timings:
          selectedTimings.length > 0
            ? selectedTimings
            : ["Morning"], // fallback
      },
    ]);

    setMedicine("");
    setDuration("");
    setSelectedTimings([]);
  };

  /* ================= TOGGLE TIMING ================= */

  const toggleTiming = (t: string) => {
    setSelectedTimings((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : [...prev, t]
    );
  };

  /* ================= TOGGLE TEST ================= */

  const toggleTest = (test: string) => {
    setTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  };

  /* ================= SAVE ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await saveConsultation({
        patientId,
        patientName,
        diagnosis,
        summary,
        prescriptions,
        tests,
        advice,
        appointmentId,
        followUpDate: followUp,
      });

      alert("Consultation Saved ✅");
      navigate(-1);
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  };

  /* ================= UI ================= */

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        {patientName}
      </h1>

      {/* DIAGNOSIS */}
      <Section title="Diagnosis">
        <Input value={diagnosis} onChange={setDiagnosis} placeholder="Enter diagnosis" />
      </Section>

      {/* SUMMARY */}
      <Section title="Consultation Summary">
        <Input value={summary} onChange={setSummary} placeholder="Short summary" />
      </Section>

      {/* MEDICINES */}
      <Section title="Medicines">

        <Input value={medicine} onChange={setMedicine} placeholder="Medicine Name" />
        <Input value={duration} onChange={setDuration} placeholder="Duration (days)" />

        {/* TIMINGS */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {timingOptions.map((t) => (
            <button
              key={t}
              onClick={() => toggleTiming(t)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTimings.includes(t)
                  ? "bg-teal-400/20 text-teal-300"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={addPrescription}
          className="mt-4 px-4 py-2 bg-teal-400 text-black rounded-lg font-semibold"
        >
          Add Medicine
        </button>

        {/* LIST */}
        <div className="mt-4 space-y-2">
          {prescriptions.map((p, i) => (
            <div key={i} className="bg-white/5 p-3 rounded-lg">
              <p className="font-semibold">{p.medicine}</p>
              <p className="text-sm text-gray-400">
                {p.duration} days • {p.timings.join(", ")}
              </p>
            </div>
          ))}
        </div>

      </Section>

      {/* TESTS */}
      <Section title="Recommended Tests">
        <div className="flex flex-wrap gap-2">
          {["Blood Test", "X-Ray", "MRI", "CT Scan"].map((t) => (
            <button
              key={t}
              onClick={() => toggleTest(t)}
              className={`px-3 py-1 rounded-full text-sm ${
                tests.includes(t)
                  ? "bg-teal-400/20 text-teal-300"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* ADVICE */}
      <Section title="Advice">
        <Input value={advice} onChange={setAdvice} placeholder="Enter advice" />
      </Section>

      {/* FOLLOW UP */}
      <Section title="Follow-up Date">
        <input
          type="date"
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
        />
      </Section>

      {/* SAVE */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full py-4 bg-teal-400 text-black rounded-xl font-bold hover:scale-[1.02]"
      >
        {loading ? "Saving..." : "Complete Consultation"}
      </button>

    </div>
  );
};

export default Consultation;

/* ================= COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <div className="mb-6">
    <p className="text-xs text-gray-500 mb-2 uppercase">{title}</p>
    {children}
  </div>
);

const Input = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-3 mt-2 rounded-xl bg-white/5 border border-white/10 outline-none"
  />
);