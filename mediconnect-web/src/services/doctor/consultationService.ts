import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

/* ================= SAVE CONSULTATION ================= */

export function saveConsultation(params: {
  patientId: string;
  patientName: string;
  diagnosis: string;
  summary: string;
  prescriptions: any[];
  tests: string[];
  advice: string;
  appointmentId: string;
  followUpDate?: string;
}) {
  return internalSaveConsultation(params);
}

/* ================= INTERNAL ================= */

async function internalSaveConsultation({
  patientId,
  patientName,
  diagnosis,
  summary,
  prescriptions,
  tests,
  advice,
  appointmentId,
  followUpDate,
}: any) {
  const user = auth.currentUser;

  if (!user) throw new Error("Doctor not logged in");

  const doctorId = user.uid;
  const doctorName = user.displayName || "Doctor";

  /* 🔥 SAVE CONSULTATION */
  await addDoc(collection(db, "consultations"), {
    patientId,
    patientName,
    assignedTo: doctorId,
    doctorName,
    diagnosis,
    summary,
    prescriptions,
    tests,
    advice,
    followUpDate: followUpDate
      ? Timestamp.fromDate(new Date(followUpDate))
      : null,
    createdAt: serverTimestamp(),
  });

  /* 🔥 UPDATE APPOINTMENT */
  if (appointmentId) {
    await updateDoc(doc(db, "appointments", appointmentId), {
      status: "Completed",
      updatedAt: serverTimestamp(),
    });
  }

  /* 🔥 GENERATE MEDICINES (FIXED LIKE FLUTTER) */
  if (prescriptions.length > 0) {
    const now = new Date();

    for (const med of prescriptions) {
      const duration = parseInt(med.duration || "1");

      // 🔥 IMPORTANT: timings from Flutter
      const timings = med.timings?.length
        ? med.timings
        : ["Morning"];

      for (let day = 0; day < duration; day++) {
        const date = new Date();
        date.setDate(now.getDate() + day);

        for (const timing of timings) {
          await addDoc(collection(db, "medicines"), {
            patientId,

            // 🔥 MATCH FLUTTER FIELD NAMES
            name: med.medicine,
            period: timing,
            time: "",

            status: "pending",
            missedCount: 0,
            alertSent: false,

            // 🔥 CRITICAL
            date: Timestamp.fromDate(date),

            createdAt: serverTimestamp(),
          });
        }
      }
    }
  }
}