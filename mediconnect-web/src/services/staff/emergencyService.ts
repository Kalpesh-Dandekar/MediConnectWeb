import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/* ================= LISTEN ================= */

export const listenToEmergencies = (callback: any) => {
  const q = query(
    collection(db, "emergencies"),
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

/* ================= UPDATE ================= */

export const updateEmergencyStatus = async (
  emergencyId: string,
  status: string
) => {
  await updateDoc(doc(db, "emergencies", emergencyId), {
    status,
    updatedAt: serverTimestamp(),
  });
};