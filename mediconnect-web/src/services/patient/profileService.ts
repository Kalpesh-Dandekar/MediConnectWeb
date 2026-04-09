import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";

export const listenToProfile = (
  callback: (data: Record<string, unknown>) => void
): (() => void) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return () => {};

  const ref = doc(db, "users", uid);

  return onSnapshot(ref, (snap) => {
    callback(snap.data() || {});
  });
};

export const updateField = async (
  field: string,
  value: string
): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  await updateDoc(doc(db, "users", uid), { [field]: value });
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};