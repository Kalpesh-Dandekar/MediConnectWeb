import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

/* ================================
   🔥 BOOK APPOINTMENT
================================ */
export const bookAppointment = async ({
  doctorName,
  department,
  date,
  timeSlot,
}: {
  doctorName: string;
  department: string;
  date: Date;
  timeSlot: string;
}) => {

  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const patientId = user.uid;

  // ✅ BETTER: direct doc fetch (faster than query)
  const userSnap = await getDoc(doc(db, "users", patientId));
  const patientName = userSnap.data()?.name || "Patient";

  // 🔥 Find doctor
  const doctorQuery = await getDocs(
    query(
      collection(db, "users"),
      where("name", "==", doctorName),
      where("role", "==", "Doctor")
    )
  );

  if (doctorQuery.empty) throw new Error("Doctor not found");

  const doctorDoc = doctorQuery.docs[0];
  const doctorId = doctorDoc.id;

  // 🔥 Prevent double booking
  const existing = await getDocs(
    query(
      collection(db, "appointments"),
      where("doctorId", "==", doctorId),
      where("date", "==", Timestamp.fromDate(date)),
      where("timeSlot", "==", timeSlot)
    )
  );

  if (!existing.empty) {
    throw new Error("Selected time slot already booked");
  }

  const token = Date.now() % 1000;

  // 🔥 Create appointment
  await addDoc(collection(db, "appointments"), {
    patientId,
    patientName,
    doctorId,
    doctorName,
    department,
    reason: department,
    timeSlot,
    date: Timestamp.fromDate(date),
    status: "Waiting",
    token,
    createdAt: serverTimestamp(),
  });
};

/* ================================
   🔥 REALTIME APPOINTMENTS
================================ */
export const listenToAppointments = (callback: any) => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "appointments"),
    where("patientId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, callback);
};

/* ================================
   🔥 CANCEL APPOINTMENT
================================ */
export const cancelAppointment = async (id: string) => {
  await updateDoc(doc(db, "appointments", id), {
    status: "Cancelled",
  });
};