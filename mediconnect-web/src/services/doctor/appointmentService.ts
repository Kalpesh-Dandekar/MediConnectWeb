import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/* ================= LISTENER ================= */

export function listenToTodayAppointments(callback: any) {
  const user = auth.currentUser;

  if (!user) throw new Error("Doctor not logged in");

  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, callback);
}

/* ================= UPDATE ================= */

async function updateStatus(
  appointmentId: string,
  status: string
) {
  await updateDoc(doc(db, "appointments", appointmentId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

/* ================= ACTIONS ================= */

export async function startConsultation(id: string) {
  return updateStatus(id, "In Consultation");
}

export async function completeConsultation(id: string) {
  return updateStatus(id, "Completed");
}