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
    if (!user) {
      callback({ docs: [] }); // prevent UI crash
      return;
    }

    const q = query(
      collection(db, "reports"),
      where("patientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        // ✅ normalize data before sending
        const normalizedDocs = snapshot.docs.map((doc) => {
          const data = doc.data();

          let status = data.status;
          if (status === "completed") status = "available";

          return {
            id: doc.id,
            ...data,
            status,
          };
        });

        callback({ docs: normalizedDocs });
      },
      (error) => {
        console.error("🔥 Firestore error:", error);
        callback({ docs: [] });
      }
    );
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

  const data = snapshot.docs[0].data();

  // ✅ normalize status
  let status = data.status;
  if (status === "completed") status = "available";

  return {
    ...data,
    status,
  };
};

/* ================================
   🔥 SUMMARY (FIXED)
================================ */
export const getReportSummary = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(
    collection(db, "reports"),
    where("patientId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const docs = snapshot.docs.map((d) => {
    const data = d.data();

    let status = data.status;
    if (status === "completed") status = "available";

    return {
      ...data,
      status,
    };
  });

  return {
    total: docs.length,
    pending: docs.filter((d) => d.status === "pending").length,
    available: docs.filter((d) => d.status === "available").length,
  };
};