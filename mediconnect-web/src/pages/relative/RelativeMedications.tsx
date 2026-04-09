"use client";

import { useEffect, useState } from "react";
import { listenToPatientMedicines } from "../../services/relative/medicineService";
import { getLinkedPatient } from "../../services/relative/dashboardService";

/* ================= TYPES ================= */

type Dose = {
  id: string;
  name: string;
  time: string;
  status: "taken" | "missed" | "pending";
  period: string;
};

/* ================= COMPONENT ================= */

const RelativeMedications = () => {
  const [patient, setPatient] = useState<any>(null);
  const [grouped, setGrouped] = useState<Record<string, Dose[]>>({});
  const [loading, setLoading] = useState(true);

  /* INIT */
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const p = await getLinkedPatient();

    if (!p) {
      setLoading(false);
      return;
    }

    setPatient(p);

    listenToPatientMedicines(p.id, (list: any[]) => {
      const groupedData: Record<string, Dose[]> = {};

      list.forEach((d) => {
        const period = (d.period || "Morning") as string;

        if (!groupedData[period]) groupedData[period] = [];

        groupedData[period].push({
          id: d.id,
          name: d.name || "",
          time: d.time || "",
          status: d.status || "pending",
          period,
        });
      });

      setGrouped(groupedData);
      setLoading(false);
    });
  };

  /* ================= CALCULATIONS ================= */

  const all: Dose[] = Object.values(grouped).flat();

  const total = all.length;
  const taken = all.filter((d) => d.status === "taken").length;

  const percent = total ? Math.round((taken / total) * 100) : 0;

  const nextDose =
    all.find((d) => d.status === "pending")?.time || "All done";

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Medication</h1>
        <p className="text-white/60">
          Monitoring: {patient?.name || "Patient"}
        </p>
      </div>

      {/* PROGRESS */}
      <div className="p-6 rounded-2xl bg-[#14283C]">
        <p className="text-white/60">Adherence Today</p>

        <div className="mt-2 text-white font-semibold">
          {percent}%
        </div>

        <div className="mt-2 w-full bg-white/10 h-2 rounded">
          <div
            className="h-2 bg-teal-400 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-white/50 mt-2">
          {taken} of {total} doses • Next: {nextDose}
        </p>
      </div>

      {/* GROUPED LIST */}
      {Object.keys(grouped).map((period) => (
        <div key={period}>
          <p className="text-xs text-white/50 uppercase mb-2">
            {period}
          </p>

          <div className="space-y-3">
            {grouped[period].map((d) => (
              <Card key={d.id} {...d} />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default RelativeMedications;

/* ================= CARD ================= */

const Card = ({ name, time, status }: Dose) => {
  const color =
    status === "taken"
      ? "text-green-400"
      : status === "missed"
      ? "text-red-400"
      : "text-orange-400";

  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between">

      <div>
        <p className="text-white">{name}</p>
        <p className="text-xs text-white/50">{time || "--"}</p>
      </div>

      <span className={color}>
        {status.toUpperCase()}
      </span>

    </div>
  );
};