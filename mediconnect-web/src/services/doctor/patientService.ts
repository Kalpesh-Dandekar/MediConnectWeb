import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";

/* ================= LISTENER ================= */

export function listenToPatients(callback: any) {
  const user = auth.currentUser;

  if (!user) throw new Error("Doctor not logged in");

  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", user.uid),
    orderBy("date", "desc")
  );

  return onSnapshot(q, async (snapshot) => {
    const docs = snapshot.docs;

    const latestPatients: Record<string, any> = {};

    for (const docSnap of docs) {
      const data = docSnap.data();
      const patientId = data.patientId;

      if (!patientId) continue;

      if (latestPatients[patientId]) continue;

      const userDoc = await getDoc(doc(db, "users", patientId));
      const userData = userDoc.data();

      if (!userData) continue;

      latestPatients[patientId] = {
        id: patientId,
        name: userData.name || "Unknown",
        age: userData.age || "",
        lastVisit: formatDate(data.date),
        diagnosis: data.department || "General Checkup",

        status:
          data.status === "Completed"
            ? "Follow-up"
            : "Active",

        visitedToday: data.status === "In Consultation",

        appointmentId: docSnap.id,
      };
    }

    callback(Object.values(latestPatients));
  });
}

/* ================= HELPERS ================= */

function formatDate(timestamp: any) {
  if (!timestamp?.toDate) return "--";

  const dt = timestamp.toDate();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}