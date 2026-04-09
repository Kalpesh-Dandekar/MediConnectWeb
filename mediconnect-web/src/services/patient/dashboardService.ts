import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

export interface DashboardData {
  userName: string;
  lastVisitDate: string;
  lastVisitDoctor: string;
  nextVisitDate: string;
  nextVisitDept: string;
  takenDoses: number;
  totalDoses: number;
  latestReportName: string;
  latestReportStatus: string;
  linkCode: string;
}

function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export async function generateAndSaveLinkCode(): Promise<string> {
  const uid = auth.currentUser?.uid;
  if (!uid) return "";
  const code = generateCode();
  await setDoc(doc(db, "patients", uid), { linkCode: code }, { merge: true });
  return code;
}

export async function loadDashboard(): Promise<DashboardData> {
  const uid = auth.currentUser?.uid;

  const result: DashboardData = {
    userName: "Patient",
    lastVisitDate: "--",
    lastVisitDoctor: "",
    nextVisitDate: "--",
    nextVisitDept: "",
    takenDoses: 0,
    totalDoses: 0,
    latestReportName: "--",
    latestReportStatus: "--",
    linkCode: "",
  };

  if (!uid) return result;

  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    result.userName = (userDoc.data()?.name as string) || "Patient";

    const patientDoc = await getDoc(doc(db, "patients", uid));
    result.linkCode = (patientDoc.data()?.linkCode as string) || "";

    const lastVisitSnap = await getDocs(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        orderBy("date", "desc"),
        limit(1)
      )
    );
    if (!lastVisitSnap.empty) {
      const d = lastVisitSnap.docs[0].data();
      const dt = (d.date as Timestamp)?.toDate();
      result.lastVisitDate = dt
        ? `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`
        : "--";
      result.lastVisitDoctor = (d.doctorName as string) || "";
    }

    const nextVisitSnap = await getDocs(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        where("date", ">", Timestamp.now()),
        orderBy("date"),
        limit(1)
      )
    );
    if (!nextVisitSnap.empty) {
      const d = nextVisitSnap.docs[0].data();
      const dt = (d.date as Timestamp)?.toDate();
      result.nextVisitDate = dt
        ? `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`
        : "--";
      result.nextVisitDept = (d.department as string) || "";
    }

    const medsSnap = await getDocs(
      query(collection(db, "medicines"), where("patientId", "==", uid))
    );
    result.totalDoses = medsSnap.docs.length;
    result.takenDoses = medsSnap.docs.filter(
      (d) => (d.data().status as string)?.toLowerCase() === "taken"
    ).length;

    const reportsSnap = await getDocs(
      query(
        collection(db, "reports"),
        where("patientId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(1)
      )
    );
    if (!reportsSnap.empty) {
      const d = reportsSnap.docs[0].data();
      result.latestReportName = (d.testName as string) || "--";
      result.latestReportStatus = (d.resultStatus as string) || "--";
    }
  } catch (e) {
    console.error("Dashboard load error:", e);
  }

  return result;
}