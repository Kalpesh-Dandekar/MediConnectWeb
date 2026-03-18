import DashboardLayout from "../../layout/DashboardLayout";
import { useState } from "react";

/* ================= MOCK DATA ================= */

type DoseStatus = "pending" | "taken" | "missed";

type Dose = {
  id: string;
  name: string;
  time: string;
  status: DoseStatus;
};

const initialData: Record<string, Dose[]> = {
  Morning: [
    { id: "1", name: "Paracetamol", time: "09:00 AM", status: "pending" },
    { id: "2", name: "Vitamin D", time: "10:00 AM", status: "taken" },
  ],
  Afternoon: [
    { id: "3", name: "Antibiotic", time: "02:00 PM", status: "pending" },
  ],
  Night: [
    { id: "4", name: "Painkiller", time: "09:00 PM", status: "missed" },
  ],
};

/* ================= COMPONENT ================= */

const Medicines = () => {
  const [data, setData] = useState(initialData);

  /* ===== TOGGLE STATUS ===== */
  const toggleDose = (period: string, id: string) => {
    const updated = { ...data };

    updated[period] = updated[period].map((dose) => {
      if (dose.id === id) {
        let next: DoseStatus = "pending";
        if (dose.status === "pending") next = "taken";
        else if (dose.status === "taken") next = "missed";

        return { ...dose, status: next };
      }
      return dose;
    });

    setData(updated);
  };

  /* ===== CALCULATIONS ===== */
  const allDoses = Object.values(data).flat();

  const total = allDoses.length;
  const taken = allDoses.filter((d) => d.status === "taken").length;

  const adherence = total === 0 ? 0 : taken / total;

  const nextDose =
    allDoses.find((d) => d.status === "pending")?.time || "All completed";

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Medication</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Daily treatment & compliance overview
        </p>
      </div>

      {/* ===== TODAY ===== */}
      <p className="text-xs tracking-widest text-gray-500 mb-4">TODAY</p>

      <div className="space-y-6 mb-10">
        {Object.entries(data).map(([period, doses]) => (
          <div key={period}>

            <p className="text-xs text-gray-500 mb-3">
              {period.toUpperCase()}
            </p>

            <div className="space-y-3">
              {doses.map((dose) => (
                <div
                  key={dose.id}
                  onClick={() => toggleDose(period, dose.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition flex items-center justify-between
                  ${
                    dose.status === "taken"
                      ? "border-green-400/40 bg-green-400/5"
                      : dose.status === "missed"
                      ? "border-red-400/40 bg-red-400/5"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-medium">{dose.name}</p>
                    <p className="text-sm text-gray-400">{dose.time}</p>
                  </div>

                  {/* STATUS */}
                  <StatusChip status={dose.status} />
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* ===== ADHERENCE CARD ===== */}
      <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">

        <div className="flex justify-between mb-3">
          <p className="font-semibold">Adherence Today</p>
          <p className="text-teal-400 font-semibold">
            {(adherence * 100).toFixed(0)}%
          </p>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-teal-400"
            style={{ width: `${adherence * 100}%` }}
          />
        </div>

        <p className="text-sm text-gray-400">
          {taken} of {total} doses completed • Next: {nextDose}
        </p>

        <p className="text-xs text-orange-400 mt-2">
          🔥 3 day medication streak
        </p>
      </div>

      {/* ===== ACTIVE TREATMENT ===== */}
      <p className="text-xs tracking-widest text-gray-500 mb-4">
        ACTIVE TREATMENT
      </p>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

        <p className="font-semibold mb-2">Antibiotic Course</p>

        <p className="text-sm text-gray-400 mb-3">
          10 Day Course • 4 Days Completed
        </p>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-teal-400 w-[40%]" />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Escalation Alert</p>

          <input type="checkbox" className="accent-teal-400" defaultChecked />
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Medicines;

/* ================= STATUS CHIP ================= */

const StatusChip = ({ status }: { status: DoseStatus }) => {
  const config = {
    pending: {
      text: "Pending",
      color: "text-orange-400 bg-orange-400/10",
    },
    taken: {
      text: "Taken",
      color: "text-green-400 bg-green-400/10",
    },
    missed: {
      text: "Missed",
      color: "text-red-400 bg-red-400/10",
    },
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${config[status].color}`}
    >
      {config[status].text}
    </span>
  );
};