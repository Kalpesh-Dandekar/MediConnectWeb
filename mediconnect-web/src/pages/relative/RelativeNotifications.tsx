"use client";

import { useEffect, useState } from "react";
import { listenToNotifications } from "../../services/relative/notificationService";

/* ================= TYPES ================= */

type Notification = {
  id: string;
  message: string;
  timestamp?: any;
};

/* ================= COMPONENT ================= */

const RelativeNotifications = () => {
  const [list, setList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToNotifications((data: Notification[]) => {
      setList(data);
      setLoading(false);
    });

    return () => unsub && unsub();
  }, []);

  if (loading) {
    return <p className="text-white p-10">Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">Alerts</h1>

      {/* EMPTY */}
      {list.length === 0 && (
        <p className="text-white/50 text-center mt-10">
          No alerts yet
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">

        {list.map((n) => (
          <Card key={n.id} {...n} />
        ))}

      </div>

    </div>
  );
};

export default RelativeNotifications;

/* ================= CARD ================= */

const Card = ({ message, timestamp }: Notification) => {

  const timeText = formatTime(timestamp);

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-red-400/30 flex gap-3">

      {/* ICON */}
      <div className="p-2 bg-red-400/10 rounded-lg">
        <span className="text-red-400">⚠️</span>
      </div>

      {/* TEXT */}
      <div className="flex-1">

        <p className="text-white font-medium">
          {message}
        </p>

        <p className="text-xs text-white/50 mt-1">
          {timeText}
        </p>

      </div>

    </div>
  );
};

/* ================= TIME FORMAT ================= */

function formatTime(timestamp: any) {
  if (!timestamp) return "";

  try {
    const d = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : timestamp.toDate();

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} • ${d.getHours()}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } catch {
    return "";
  }
}