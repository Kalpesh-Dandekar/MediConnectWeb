import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/* ================= LISTEN NOTIFICATIONS ================= */

export function listenToNotifications(callback: any) {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "notifications"),
    where("toUserId", "==", user.uid),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(data);
  });
}