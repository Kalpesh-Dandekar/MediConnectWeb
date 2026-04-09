"use client";

import { useEffect, useState } from "react";
import {
  listenToTodayMedicines,
  updateMedicineStatus
} from "../../services/patient/medicineService";

type DoseStatus = "pending" | "taken" | "missed";

type Dose = {
  id: string;
  name: string;
  time: string;
  status: DoseStatus;
};

const Medicines = () => {
  const [data, setData] = useState<Record<string, Dose[]>>({});
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH REAL DATA */
  useEffect(() => {
    try {
      const unsub = listenToTodayMedicines((snapshot: any) => {
        const grouped: Record<string, Dose[]> = {};

        snapshot?.docs?.forEach((doc: any) => {
          const d = doc.data();

          const period = d.period || "Morning";

          const dose: Dose = {
            id: doc.id,
            name: d.name || "Medicine",
            time: d.time || "--",
            status: d.status || "pending",
          };

          if (!grouped[period]) grouped[period] = [];
          grouped[period].push(dose);
        });

        setData(grouped);
        setLoading(false);
      });

      return () => {
        if (unsub) unsub();
      };

    } catch (err) {
      console.error("❌ Fetch Medicines Error:", err);
      setLoading(false);
    }
  }, []);

  /* 🔥 TOGGLE */
  const toggleDose = async (period: string, id: string) => {
    const updated = { ...data };

    updated[period] = updated[period].map((dose) => {
      if (dose.id === id) {
        let next: DoseStatus = "pending";

        if (dose.status === "pending") next = "taken";
        else if (dose.status === "taken") next = "missed";

        updateMedicineStatus(id, next).catch((err) => {
          console.error("❌ Update Error:", err);
        });

        return { ...dose, status: next };
      }
      return dose;
    });

    setData(updated);
  };

  const all = Object.values(data).flat();
  const total = all.length;
  const taken = all.filter((d) => d.status === "taken").length;

  const adherence = total === 0 ? 0 : taken / total;

  const nextDose =
    all.find((d) => d.status === "pending")?.time || "All completed";

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Medication</h1>
        <p className="text-gray-400 text-sm">
          Daily treatment & compliance overview
        </p>
      </div>

      {/* TODAY */}
      <p className="text-xs text-gray-500 mb-4">TODAY</p>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading medicines...</p>
      ) : Object.keys(data).length === 0 ? (
        <p className="text-gray-400 text-sm">No medicines for today</p>
      ) : (
        Object.entries(data).map(([period, doses]) => (
          <div key={period} className="mb-6">

            <p className="text-xs text-gray-500 mb-2">
              {period.toUpperCase()}
            </p>

            {doses.map((dose) => (
              <div
                key={dose.id}
                onClick={() => toggleDose(period, dose.id)}
                className={`p-4 rounded-xl border cursor-pointer mb-2 flex justify-between
                ${
                  dose.status === "taken"
                    ? "border-green-400/40 bg-green-400/5"
                    : dose.status === "missed"
                    ? "border-red-400/40 bg-red-400/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div>
                  <p>{dose.name}</p>
                  <p className="text-sm text-gray-400">{dose.time}</p>
                </div>

                <StatusChip status={dose.status} />
              </div>
            ))}

          </div>
        ))
      )}

      {/* ADHERENCE */}
      <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">

        <div className="flex justify-between mb-2">
          <p>Adherence Today</p>
          <p className="text-teal-400">{(adherence * 100).toFixed(0)}%</p>
        </div>

        <div className="h-2 bg-white/10 rounded mb-2">
          <div
            className="h-full bg-teal-400"
            style={{ width: `${adherence * 100}%` }}
          />
        </div>

        <p className="text-sm text-gray-400">
          {taken} of {total} doses • Next: {nextDose}
        </p>
      </div>

    </div>
  );
};

export default Medicines;

/* ================= CHIP ================= */

const StatusChip = ({ status }: { status: DoseStatus }) => {
  const map = {
    pending: "text-orange-400 bg-orange-400/10",
    taken: "text-green-400 bg-green-400/10",
    missed: "text-red-400 bg-red-400/10",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
};