import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/* ================= GET LINKED PATIENT ================= */

export async function getLinkedPatient() {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const data = userDoc.data();

  if (!data?.patientId) return null;

  const patientDoc = await getDoc(doc(db, "users", data.patientId));

  return {
    id: data.patientId,
    name: patientDoc.data()?.name || "Patient",
  };
}

/* ================= DASHBOARD DATA ================= */

export async function getRelativeDashboard(patientId: string) {
  /* MEDICINES */
  const medsSnap = await getDocs(
    query(
      collection(db, "medicines"),
      where("patientId", "==", patientId)
    )
  );

  let taken = 0;
  let total = medsSnap.docs.length;

  medsSnap.docs.forEach((d) => {
    if (d.data().status === "taken") taken++;
  });

  /* NEXT DOSE */
  const nextDose = medsSnap.docs.length
    ? medsSnap.docs[0].data().time || "--"
    : "--";

  /* APPOINTMENTS */
  const apptSnap = await getDocs(
    query(
      collection(db, "appointments"),
      where("patientId", "==", patientId)
    )
  );

  const nextVisit = apptSnap.docs[0]?.data();

  /* 🔥 FIX TIMESTAMP */
  let formattedDate = "--";

  if (nextVisit?.date) {
    try {
      const d = nextVisit.date.toDate(); // ✅ FIX
      formattedDate = `${d.getDate()} ${d.toLocaleString("default", {
        month: "short",
      })}`;
    } catch {
      formattedDate = "--";
    }
  }

  return {
    taken,
    total,
    nextDose,
    nextVisitDate: formattedDate, // ✅ SAFE STRING
    nextVisitDoctor: nextVisit?.doctorName || "",
    reportStatus: "Pending",
  };
}