import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

/* ================= LISTEN ================= */

export const listenToAppointments = (callback: any) => {
  const q = query(
    collection(db, "appointments"),
    orderBy("date")
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};

/* ================= UPDATE ================= */

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: string
) => {
  await updateDoc(doc(db, "appointments", appointmentId), {
    status,
  });
};