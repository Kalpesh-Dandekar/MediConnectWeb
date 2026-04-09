import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  limit,
} from "firebase/firestore";

/* ================================
   🔥 STREAM ALL REPORTS (FIXED)
================================ */
export const listenToPatientReports = (callback: any) => {
  let unsubscribeFirestore: any;

  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (!user) return;

    const q = query(
      collection(db, "reports"),
      where("patientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    unsubscribeFirestore = onSnapshot(q, callback);
  });

  return () => {
    if (unsubscribeFirestore) unsubscribeFirestore();
    unsubscribeAuth();
  };
};

/* ================================
   🔥 GET LATEST REPORT
================================ */
export const getLatestReport = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    collection(db, "reports"),
    where("patientId", "==", user.uid),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

/* ================================
   🔥 SUMMARY
================================ */
export const getReportSummary = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    collection(db, "reports"),
    where("patientId", "==", user.uid)
  );

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((d) => d.data());

  return {
    total: docs.length,
    pending: docs.filter((d) => d.status === "pending").length,
    available: docs.filter((d) => d.status === "available").length,
  };
};