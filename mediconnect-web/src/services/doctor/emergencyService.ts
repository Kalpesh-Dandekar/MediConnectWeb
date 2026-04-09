import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

/* ================= ACTIVE EMERGENCIES ================= */

export function listenToActiveEmergencies(callback: any) {
  const q = query(
    collection(db, "emergencies"),
    where("status", "in", ["active", "accepted"]),
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

/* ================= UNASSIGNED ================= */

export function listenToUnassignedEmergencies(callback: any) {
  const q = query(
    collection(db, "emergencies"),
    where("status", "==", "active"),
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

/* ================= MY EMERGENCIES ================= */

export function listenToMyEmergencies(callback: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("Doctor not logged in");

  const q = query(
    collection(db, "emergencies"),
    where("assignedTo", "==", user.uid),
    where("status", "==", "accepted"),
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

/* ================= ACTIONS ================= */

export async function acceptEmergency(emergencyId: string) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "emergencies", emergencyId), {
    status: "accepted",
    assignedTo: user.uid,
    updatedAt: serverTimestamp(),
  });
}

export async function completeEmergency(emergencyId: string) {
  await updateDoc(doc(db, "emergencies", emergencyId), {
    status: "completed",
    updatedAt: serverTimestamp(),
  });
}

export async function releaseEmergency(emergencyId: string) {
  await updateDoc(doc(db, "emergencies", emergencyId), {
    status: "active",
    assignedTo: "",
    updatedAt: serverTimestamp(),
  });
}