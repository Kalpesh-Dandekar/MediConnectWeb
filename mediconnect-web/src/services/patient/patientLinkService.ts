import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

/* ================= GENERATE CODE ================= */

const generateCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
};

/* ================= CREATE / UPDATE ================= */

export const generateAndSaveCode = async (
  patientId: string
): Promise<string> => {
  try {
    const code = generateCode();

    await setDoc(
      doc(db, "patients", patientId),
      { linkCode: code },
      { merge: true }
    );

    return code;

  } catch (e: any) {
    throw new Error("Failed to generate code: " + e.message);
  }
};

/* ================= GET ================= */

export const getLinkCode = async (
  patientId: string
): Promise<string | null> => {
  try {
    const snap = await getDoc(doc(db, "patients", patientId));

    if (!snap.exists()) return null;

    return snap.data()?.linkCode || null;

  } catch (e: any) {
    throw new Error("Failed to fetch code: " + e.message);
  }
};