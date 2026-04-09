import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/* ================= REPORT STREAM ================= */

export function listenToPatientReports(
  patientId: string,
  callback: any
) {
  const q = query(
    collection(db, "reports"),
    where("patientId", "==", patientId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
}