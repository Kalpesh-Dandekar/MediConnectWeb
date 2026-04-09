import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

/* ================= DATE ================= */

const getStartOfDay = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const getEndOfDay = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );
};

/* ================= MAIN ================= */

export async function getStaffDashboardData() {
  try {
    const q1 = query(
      collection(db, "appointments"),
      where("date", ">=", Timestamp.fromDate(getStartOfDay())),
      where("date", "<=", Timestamp.fromDate(getEndOfDay()))
    );

    const appointmentsSnap = await getDocs(q1);

    const reportsSnap = await getDocs(collection(db, "reports"));

    let pendingReports = 0;
    let completedReports = 0;

    reportsSnap.forEach((doc) => {
      const data = doc.data();
      const status = (data.status || "pending").toString();

      if (status === "completed") completedReports++;
      else pendingReports++;
    });

    const q2 = query(
      collection(db, "emergencies"),
      where("status", "==", "pending")
    );

    const emergencySnap = await getDocs(q2);

    return {
      appointments: appointmentsSnap.size,
      pendingReports,
      completedReports,
      emergencies: emergencySnap.size,
    };
  } catch (e) {
    console.error("Dashboard Error:", e);

    return {
      appointments: 0,
      pendingReports: 0,
      completedReports: 0,
      emergencies: 0,
    };
  }
}