import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/* ================= GET PROFILE ================= */

export async function getRelativeProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, "users", user.uid));

  let name = "User";
  let phone = "--";
  let relationship = "--";
  let patientName = "Not Connected";

  if (userDoc.exists()) {
    const data = userDoc.data();

    name = data?.name || "User";
    phone = data?.phone || "--";
    relationship = data?.relationship || "--";

    /* ✅ FIX: GET PATIENT FROM USERS */
    const patientId = data?.patientId;

    if (patientId) {
      const patientDoc = await getDoc(doc(db, "users", patientId));

      if (patientDoc.exists()) {
        patientName = patientDoc.data()?.name || "Patient";
      }
    }
  }

  return {
    name,
    phone,
    relationship,
    patientName,
    email: user.email || "",
  };
}

/* ================= UPDATE ================= */

export async function updateRelativeProfile(data: {
  name: string;
  phone: string;
  relationship: string;
}) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    name: data.name,
    phone: data.phone,
    relationship: data.relationship,
  });
}