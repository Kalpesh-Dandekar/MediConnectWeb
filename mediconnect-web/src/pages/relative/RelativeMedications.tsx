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
    <div className="w-full max-w-screen-xl mx-auto space-y-6 sm:space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Today's Medications
        </h1>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          Monitoring: Rahul Sharma
        </p>
      </div>

      {/* PROGRESS */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#14283C] to-[#1a3654] border border-white/5 shadow-lg">

        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-white/70">
            Today's Completion
          </p>
          <span className="text-purple-400 font-semibold text-xs sm:text-sm">
            {percent}%
          </span>
        </div>

        <div className="mt-3 sm:mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-[10px] sm:text-xs text-white/50 mt-2 sm:mt-3">
          {takenCount} of {medications.length} doses taken
        </p>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">

        {/* LEFT */}
        <div className="xl:col-span-8 space-y-4 sm:space-y-8">

          {/* COMPLETED */}
          <div>
            <SectionTitle title="Completed / Missed" />

            <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              {completed.map((m, i) => (
                <MedicationCard key={i} {...m} />
              ))}
            </div>
          </div>

          {/* UPCOMING */}
          <div>
            <SectionTitle title="Upcoming" />

            <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              {upcoming.map((m, i) => (
                <MedicationCard key={i} {...m} />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="xl:col-span-4">

          <div className="p-4 sm:p-6 rounded-2xl bg-[#14283C] border border-white/5">
            <p className="text-[10px] sm:text-xs tracking-widest text-white/50 mb-3 sm:mb-5">
              MEDICATION INFO
            </p>

            <div className="space-y-3 sm:space-y-5 text-xs sm:text-sm">

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

/* SECTION TITLE */

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-[10px] sm:text-xs tracking-widest text-white/50 uppercase">
    {title}
  </p>
);

/* MEDICATION CARD */

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

  if (status === "Taken") {
    color = "text-green-400 bg-green-500/10";
  } else if (status === "Missed") {
    color = "text-red-400 bg-red-500/10";
  } else {
    color = "text-orange-400 bg-orange-500/10";
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#14283C] border border-white/5 hover:scale-[1.01] hover:shadow-lg transition">

      <div className="flex items-center gap-3 sm:gap-4">

        <div className="p-2 sm:p-3 bg-white/5 rounded-lg">
          <Pill size={14} className="text-purple-400" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base truncate">
            {name}
          </p>
          <p className="text-[10px] sm:text-xs text-white/50 mt-1">
            {time}
          </p>
        </div>

        <span className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full font-medium ${color}`}>
          {status}
        </span>

      </div>

    </div>
  );
};

/* INFO ROW */

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
      <span className="text-white/60 text-xs sm:text-sm">{label}</span>
      <span className={`font-medium text-xs sm:text-sm ${color}`}>
        {value}
      </span>
    </div>
  );
};