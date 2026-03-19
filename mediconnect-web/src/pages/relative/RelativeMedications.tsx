"use client";

import { Pill } from "lucide-react";

type Medication = {
  name: string;
  time: string;
  status: "Taken" | "Missed" | "Upcoming";
};

const RelativeMedications = () => {
  const medications: Medication[] = [
    {
      name: "Pantoprazole 40mg",
      time: "08:00 AM",
      status: "Taken",
    },
    {
      name: "Vitamin D3",
      time: "02:00 PM",
      status: "Missed",
    },
    {
      name: "Calcium Tablet",
      time: "08:00 PM",
      status: "Upcoming",
    },
  ];

  const completed = medications.filter((m) => m.status !== "Upcoming");
  const upcoming = medications.filter((m) => m.status === "Upcoming");

  const takenCount = medications.filter((m) => m.status === "Taken").length;
  const percent = Math.round((takenCount / medications.length) * 100);

  return (
    <div className="w-full space-y-10">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-bold">Today's Medications</h1>
        <p className="text-sm text-white/60 mt-1">
          Monitoring: Rahul Sharma
        </p>
      </div>

      {/* ===== PROGRESS ===== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 shadow-lg">

        <div className="flex justify-between items-center">
          <p className="text-sm text-white/70">Today's Completion</p>
          <span className="text-purple-400 font-semibold text-sm">
            {percent}%
          </span>
        </div>

        <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-white/50 mt-3">
          {takenCount} of {medications.length} doses taken
        </p>

      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="col-span-12 xl:col-span-8 space-y-8">

          {/* COMPLETED / MISSED */}
          <div>
            <SectionTitle title="Completed / Missed" />

            <div className="space-y-4 mt-4">
              {completed.map((m, i) => (
                <MedicationCard key={i} {...m} />
              ))}
            </div>
          </div>

          {/* UPCOMING */}
          <div>
            <SectionTitle title="Upcoming" />

            <div className="space-y-4 mt-4">
              {upcoming.map((m, i) => (
                <MedicationCard key={i} {...m} />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-12 xl:col-span-4">

          <div className="p-6 rounded-2xl bg-[#14283C] border border-white/5">
            <p className="text-xs tracking-widest text-white/50 mb-5">
              MEDICATION INFO
            </p>

            <div className="space-y-5 text-sm">

              <InfoRow label="Total Doses" value="3" />
              <InfoRow label="Taken" value="2" highlight="green" />
              <InfoRow label="Missed" value="1" highlight="red" />

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RelativeMedications;

/* ===== SECTION TITLE ===== */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* ===== MEDICATION CARD ===== */

const MedicationCard = ({
  name,
  time,
  status,
}: {
  name: string;
  time: string;
  status: string;
}) => {
  let color = "";
  let dot = "";

  if (status === "Taken") {
    color = "text-green-400 bg-green-500/10";
    dot = "bg-green-400";
  } else if (status === "Missed") {
    color = "text-red-400 bg-red-500/10";
    dot = "bg-red-400";
  } else {
    color = "text-orange-400 bg-orange-500/10";
    dot = "bg-orange-400";
  }

  return (
    <div className="p-5 rounded-2xl bg-[#14283C] border border-white/5 hover:scale-[1.01] hover:shadow-lg transition-all duration-300">

      <div className="flex items-center gap-4">

        {/* ICON */}
        <div className="p-3 bg-white/5 rounded-lg">
          <Pill size={16} className="text-purple-400" />
        </div>

        {/* INFO */}
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          <p className="text-xs text-white/50 mt-1">{time}</p>
        </div>

        {/* STATUS */}
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${color}`}>
          {status}
        </span>

      </div>

    </div>
  );
};

/* ===== INFO ROW ===== */

const InfoRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "green" | "red";
}) => {
  const color =
    highlight === "green"
      ? "text-green-400"
      : highlight === "red"
      ? "text-red-400"
      : "";

  return (
    <div className="flex justify-between items-center">
      <span className="text-white/60">{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );
};