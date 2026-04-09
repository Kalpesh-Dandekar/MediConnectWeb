import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  Timestamp,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

/* ================================
   🔥 GET TODAY MEDICINES (REALTIME)
================================ */
export const listenToTodayMedicines = (callback: any) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("⚠️ User not ready yet");
    return;
  }

  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );

  const q = query(
    collection(db, "medicines"),
    where("patientId", "==", user.uid),
    where("date", ">=", Timestamp.fromDate(start)),
    where("date", "<=", Timestamp.fromDate(end)),
    orderBy("date")
  );

  return onSnapshot(q, callback);
};

/* ================================
   🔥 UPDATE MEDICINE STATUS
================================ */
export const updateMedicineStatus = async (
  medicineId: string,
  status: string
) => {
  try {
    const ref = doc(db, "medicines", medicineId);

    const snap = await getDoc(ref);
    const data = snap.data();

    if (!data) {
      console.error("❌ Medicine not found");
      return;
    }

    let missedCount = data.missedCount || 0;
    let alertSent = data.alertSent || false;

    // 🔁 STATUS LOGIC
    if (status === "taken") {
      missedCount = 0;
      alertSent = false;
    } else if (status === "missed") {
      missedCount += 1;
    }

    await updateDoc(ref, {
      status,
      missedCount,
      alertSent,
    });

    console.log("💊 Updated:", status, "| Missed:", missedCount);

    // 🚨 ALERT LOGIC
    if (missedCount >= 1 && !alertSent) {
      await notifyRelative(data);
      await updateDoc(ref, { alertSent: true });
    }

  } catch (err) {
    console.error("❌ Update Medicine Error:", err);
  }
};

/* ================================
   🔥 ALERT RELATIVE (Firestore only)
================================ */
const notifyRelative = async (medicineData: any) => {
  try {
    const patientId = medicineData.patientId;

    // 🔍 Get patient data
    const userSnap = await getDoc(doc(db, "users", patientId));

    if (!userSnap.exists()) {
      console.error("❌ Patient not found");
      return;
    }

    const relativeId = userSnap.data()?.relativeId;

    if (!relativeId) {
      console.log("⚠️ No relative linked");
      return;
    }

    // 🔥 Save notification
    await addDoc(collection(db, "notifications"), {
      toUserId: relativeId,
      message: `🚨 Patient missed medicine (${medicineData.name})`,
      type: "medicine_alert",
      timestamp: serverTimestamp(),
      patientId,
    });

    console.log("🚨 Alert sent to relative");

  } catch (err) {
    console.error("❌ Notification Error:", err);
  }
};