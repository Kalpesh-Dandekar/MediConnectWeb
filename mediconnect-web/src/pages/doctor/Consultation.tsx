"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";

type Prescription = {
  medicine: string;
  dosage: string;
  duration: string;
};

const Consultation = () => {
  const { state } = useLocation();
  const patientName = state?.patientName || "Patient";

  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");

  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [tests, setTests] = useState<string[]>([]);
  const [followUp, setFollowUp] = useState("");

  const allTests = ["Blood Test", "X-Ray", "MRI", "CT Scan"];

  const addPrescription = () => {
    if (!medicine) return;

    setPrescriptions([
      ...prescriptions,
      { medicine, dosage, duration },
    ]);

    setMedicine("");
    setDosage("");
    setDuration("");
  };

  const toggleTest = (test: string) => {
    setTests((prev) =>
      prev.includes(test)
        ? prev.filter((t) => t !== test)
        : [...prev, test]
    );
  };

  const handleSubmit = () => {
    console.log({
      diagnosis,
      prescriptions,
      tests,
      advice,
      followUp,
    });

    alert("Consultation Saved (Dummy)");
  };

  return (
    <div className="min-h-screen bg-[#0C1B2A] text-white p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        {patientName}
      </h1>

      {/* DIAGNOSIS */}
      <Section title="Diagnosis">
        <Input
          value={diagnosis}
          onChange={setDiagnosis}
          placeholder="Enter diagnosis"
        />
      </Section>

      {/* PRESCRIPTION */}
      <Section title="Prescription">

        <Input value={medicine} onChange={setMedicine} placeholder="Medicine Name" />
        <Input value={dosage} onChange={setDosage} placeholder="Dosage (1-0-1)" />
        <Input value={duration} onChange={setDuration} placeholder="Duration (5 days)" />

        <button
          onClick={addPrescription}
          className="mt-3 px-4 py-2 bg-teal-400 text-black rounded-lg font-semibold"
        >
          Add Medicine
        </button>

        {/* LIST */}
        <div className="mt-4 space-y-2">
          {prescriptions.map((p, i) => (
            <div
              key={i}
              className="bg-white/5 p-3 rounded-lg"
            >
              <p className="font-semibold">{p.medicine}</p>
              <p className="text-sm text-gray-400">
                Dosage: {p.dosage}
              </p>
              <p className="text-sm text-gray-400">
                Duration: {p.duration}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTS */}
      <Section title="Recommended Tests">
        <div className="flex flex-wrap gap-2">
          {allTests.map((t) => (
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
        <Input
          value={advice}
          onChange={setAdvice}
          placeholder="Enter advice"
        />
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
        className="mt-8 w-full py-4 bg-teal-400 text-black rounded-xl font-bold text-lg hover:scale-[1.02] transition"
      >
        Complete Consultation
      </button>
    </div>
  );
};

export default Consultation;

/* ================= COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <div className="mb-6">
    <p className="text-xs text-gray-500 mb-2 tracking-wider uppercase">
      {title}
    </p>
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