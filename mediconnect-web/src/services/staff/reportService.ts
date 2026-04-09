import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

/* ================= LISTEN ================= */

export const listenToReports = (callback: any) => {
  const q = query(
    collection(db, "reports"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
};

/* ================= UPLOAD ================= */

export const uploadReport = async ({
  patientId,
  testName,
  labName,
  resultSummary,
}: {
  patientId: string;
  testName: string;
  labName: string;
  resultSummary: string;
}) => {
  await addDoc(collection(db, "reports"), {
    patientId,
    testName,
    givenOn: new Date().toISOString(),
    uploadedOn: new Date().toISOString(),
    labName,
    doctorName: "Lab Staff",
    resultStatus: "Normal",
    resultSummary,
    status: "completed",
    createdAt: serverTimestamp(),
  });
};