import { db, auth } from "../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/* ================= LISTENER ================= */

export function listenToDoctorProfile(callback: any) {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  const ref = doc(db, "users", user.uid);

  return onSnapshot(ref, (snapshot) => {
    callback(snapshot.data());
  });
}

/* ================= UPDATE ================= */

export async function updateDoctorField(
  field: string,
  value: any
) {
  const user = auth.currentUser;
  if (!user) return;

  if (!value || value.toString().trim() === "") return;

  await updateDoc(doc(db, "users", user.uid), {
    [field]: value.toString().trim(),
    updatedAt: serverTimestamp(),
  });
}