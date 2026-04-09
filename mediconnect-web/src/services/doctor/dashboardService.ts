import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

/* ================= DASHBOARD DATA ================= */

export async function getDoctorDashboardData() {
  const user = auth.currentUser;
  if (!user) throw new Error("Doctor not logged in");

  const doctorId = user.uid;

  /* APPOINTMENTS */
  const appointmentsSnap = await getDocs(
    query(collection(db, "appointments"), where("doctorId", "==", doctorId))
  );

  const total = appointmentsSnap.docs.length;

  const waiting = appointmentsSnap.docs.filter((d) => {
    const status = (d.data().status || "").toLowerCase().trim();
    return status === "waiting";
  }).length;

  /* CONSULTATIONS */
  const consultationsSnap = await getDocs(
    query(collection(db, "consultations"), where("assignedTo", "==", doctorId))
  );

  const done = consultationsSnap.docs.length;

  /* EMERGENCY */
  const emergencySnap = await getDocs(
    query(collection(db, "emergencies"), where("status", "==", "active"))
  );

  const emergency = emergencySnap.docs.length;

  return { total, waiting, done, emergency };
}

/* ================= NEXT PATIENTS ================= */

export function listenToNextPatients(callback: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("Doctor not logged in");

  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", user.uid),
    orderBy("date"),
    limit(5)
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
}