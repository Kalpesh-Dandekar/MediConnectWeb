import { db } from "../firebase";
import {
  collection,
  addDoc,
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

  return onSnapshot(
    q,
    (snap) => {
      console.log("🔥 SNAPSHOT CALLED:", snap.size);

      const data = snap.docs.map((d) => {
        const docData: any = d.data();

        return {
          id: d.id,
          patientId: docData.patientId || "",
          testName: docData.testName || "",
          givenOn: docData.givenOn || "",
          status: docData.status || "pending",
        };
      });

      callback(data);
    },
    (error) => {
      console.error("🔥 Firestore listener error:", error);
      callback([]); // prevents UI freeze
    }
  );
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

    // ✅ keep this (works immediately, no delay issue)
    createdAt: new Date(),
  });
};