import { db, auth } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

/* ================= LISTEN ================= */

export function listenToStaffProfile(callback: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const ref = doc(db, "users", user.uid);

  return onSnapshot(ref, (snap) => {
    callback(snap.data());
  });
}

/* ================= UPDATE NESTED ================= */

export async function updateStaffField(
  field: string,
  value: any
) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    [`profile.${field}`]: value,
  });
}

/* ================= UPDATE TOP LEVEL ================= */

export async function updateStaffTopField(
  field: string,
  value: any
) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    [field]: value,
  });
}