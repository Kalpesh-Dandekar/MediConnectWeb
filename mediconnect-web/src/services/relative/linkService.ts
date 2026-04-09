import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export async function connectToPatient(code: string, relativeId: string) {
  const snap = await getDocs(
    query(collection(db, "patients"), where("linkCode", "==", code))
  );

  if (snap.empty) throw new Error("Invalid code");

  const patientId = snap.docs[0].id;

  await setDoc(
    doc(db, "users", patientId),
    { relativeId },
    { merge: true }
  );

  await setDoc(
    doc(db, "users", relativeId),
    { patientId },
    { merge: true }
  );
}