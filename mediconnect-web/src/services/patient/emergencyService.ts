import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/* ================================
   🔥 CREATE EMERGENCY + ALERTS
================================ */
export const createEmergency = async (type: string) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in");
    }

    // 🔹 Get patient details
    const userSnap = await getDoc(doc(db, "users", user.uid));

    if (!userSnap.exists()) {
      throw new Error("User not found in Firestore");
    }

    const data = userSnap.data();

    const patientName = data?.name || "Patient";
    const relativeId = data?.relativeId;
    const doctorId = data?.doctorId;

    // 🔥 Dynamic message
    let message = "";

    if (type === "ambulance") {
      message = `🚨 URGENT: ${patientName} requested an ambulance!`;
    } else if (type === "doctor") {
      message = `👨‍⚕️ ${patientName} requested a doctor consultation`;
    } else if (type === "caregiver") {
      message = `👨‍👩‍👧 ${patientName} needs caregiver assistance`;
    } else {
      message = `🚨 Emergency triggered by ${patientName}`;
    }

    // 🔥 Create emergency
    const emergencyRef = await addDoc(collection(db, "emergencies"), {
      patientId: user.uid,
      patientName,
      type,
      status: "active",
      assignedTo: "",
      message,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Emergency created:", emergencyRef.id);

    // 🔥 SEND TO RELATIVE
    if (relativeId) {
      await addDoc(collection(db, "notifications"), {
        toUserId: relativeId,
        type: "emergency",
        message,
        timestamp: serverTimestamp(),
        patientId: user.uid,
        emergencyId: emergencyRef.id,
      });

      console.log("🚨 Alert sent to relative");
    }

    // 🔥 SEND TO DOCTOR
    if (doctorId) {
      await addDoc(collection(db, "notifications"), {
        toUserId: doctorId,
        type: "emergency",
        message,
        timestamp: serverTimestamp(),
        patientId: user.uid,
        emergencyId: emergencyRef.id,
      });

      console.log("🚨 Alert sent to doctor");
    }

  } catch (err) {
    console.error("❌ Emergency Error:", err);
    throw err;
  }
};

/* ================================
   🔥 ACTIVE EMERGENCIES (Doctor)
================================ */
export const listenToActiveEmergencies = (callback: any) => {
  const q = query(
    collection(db, "emergencies"),
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, callback);
};

/* ================================
   🔥 ACCEPT EMERGENCY
================================ */
export const acceptEmergency = async (id: string) => {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "emergencies", id), {
    status: "accepted",
    assignedTo: user.uid,
    updatedAt: serverTimestamp(),
  });
};

/* ================================
   🔥 COMPLETE EMERGENCY
================================ */
export const completeEmergency = async (id: string) => {
  await updateDoc(doc(db, "emergencies", id), {
    status: "completed",
    updatedAt: serverTimestamp(),
  });
};

/* ================================
   🔥 MY EMERGENCIES (Doctor)
================================ */
export const listenToMyEmergencies = (callback: any) => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "emergencies"),
    where("assignedTo", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, callback);
};