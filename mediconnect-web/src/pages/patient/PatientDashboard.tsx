"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit
} from "firebase/firestore";
import {
  Hospital,
  Pill,
  CalendarCheck,
  FileText,
  Link,
} from "lucide-react";

/* 🔥 NEW IMPORT */
import {
  generateAndSaveCode,
  getLinkCode
} from "../../services/patient/patientLinkService";

/* ================= TYPES ================= */

type DashboardData = {
  userName: string;
  lastVisitDate: string;
  lastVisitDoctor: string;
  nextVisitDate: string;
  nextVisitDept: string;
  takenDoses: number;
  totalDoses: number;
  latestReportName: string;
  latestReportStatus: string;
  linkCode?: string;
};

/* ================= COMPONENT ================= */

const PatientDashboard = () => {
  const navigate = useNavigate();
  const greeting = getGreeting();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    let userData: any = null;
    let appts: any[] = [];
    let meds: any[] = [];
    let report: any = null;

    const format = (d: any) => {
      if (!d?.toDate) return "--";
      const date = d.toDate();
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const updateDashboard = () => {
      const completed = appts.find((a) => a.status === "completed");
      const upcoming = appts.find(
        (a) => a.status === "pending" || a.status === "confirmed"
      );

      const totalDoses = meds.length;
      const takenDoses = meds.filter((m) => m.status === "taken").length;

      setData((prev) => ({
        userName: userData?.name || "Patient",

        lastVisitDate: completed ? format(completed.date) : "--",
        lastVisitDoctor: completed?.doctorName || "",

        nextVisitDate: upcoming ? format(upcoming.date) : "--",
        nextVisitDept: upcoming?.department || "",

        takenDoses,
        totalDoses,

        latestReportName: report?.testName || "--",
        latestReportStatus: report ? "Available" : "--",

        /* 🔥 PRESERVE EXISTING LINK CODE */
        linkCode: prev?.linkCode || "",
      }));

      setLoading(false);
    };

    /* 🔥 USER */
    const unsubUser = onSnapshot(
      query(collection(db, "users"), where("__name__", "==", uid)),
      (snap) => {
        userData = snap.docs[0]?.data();
        updateDashboard();
      }
    );

    /* 🔥 APPOINTMENTS */
    const unsubAppt = onSnapshot(
      query(
        collection(db, "appointments"),
        where("patientId", "==", uid),
        orderBy("date", "desc")
      ),
      (snap) => {
        appts = snap.docs.map((d) => d.data());
        updateDashboard();
      }
    );

    /* 🔥 MEDICINES */
    const unsubMed = onSnapshot(
      query(collection(db, "medicines"), where("patientId", "==", uid)),
      (snap) => {
        meds = snap.docs.map((d) => d.data());
        updateDashboard();
      }
    );

    /* 🔥 REPORTS */
    const unsubReport = onSnapshot(
      query(
        collection(db, "reports"),
        where("patientId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(1)
      ),
      (snap) => {
        report = snap.docs[0]?.data();
        updateDashboard();
      }
    );

    /* 🔥 LOAD EXISTING LINK CODE */
    const loadCode = async () => {
      const code = await getLinkCode(uid);
      if (code) {
        setData((prev) =>
          prev ? { ...prev, linkCode: code } : prev
        );
      }
    };

    loadCode();

    return () => {
      unsubUser();
      unsubAppt();
      unsubMed();
      unsubReport();
    };
  }, []);

  /* ================= GENERATE CODE ================= */

  const handleGenerateCode = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    setGeneratingCode(true);

    try {
      const code = await generateAndSaveCode(uid);

      setData((prev) =>
        prev ? { ...prev, linkCode: code } : prev
      );

    } catch (err: any) {
      alert(err.message);
    }

    setGeneratingCode(false);
  };

  /* ================= SAFE DATA ================= */

  const userName        = data?.userName        || "Patient";
  const lastVisitDate   = data?.lastVisitDate   || "--";
  const lastVisitDoctor = data?.lastVisitDoctor || "";
  const nextVisitDate   = data?.nextVisitDate   || "--";
  const nextVisitDept   = data?.nextVisitDept   || "";
  const takenDoses      = data?.takenDoses      ?? 0;
  const totalDoses      = data?.totalDoses      ?? 0;
  const reportName      = data?.latestReportName   || "--";
  const reportStatus    = data?.latestReportStatus || "--";
  const linkCode        = data?.linkCode        || "";

  return (
    <div className="w-full max-w-screen-xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {greeting}, {loading ? "..." : userName} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-xs sm:text-sm">
            Patient Dashboard
          </p>
        </div>

        <div
          onClick={() => navigate("/patient/profile")}
          className="w-10 h-10 rounded-full bg-[#FFB703]/20 flex items-center justify-center text-[#FFB703] font-bold text-lg cursor-pointer"
        >
          {userName[0]?.toUpperCase() || "P"}
        </div>
      </div>

      {/* CONNECT RELATIVE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Link size={18} className="text-[#FFB703]" />
          <span className="text-white font-semibold">Connect a Relative</span>
        </div>

        <p className="text-white/60 text-sm mb-3">
          {linkCode ? "Share this code:" : "Generate a secure code"}
        </p>

        {linkCode && (
          <div className="bg-black/30 rounded-xl px-4 py-3 mb-4 inline-block">
            <span className="text-[#FFB703] text-xl font-bold tracking-[0.3em]">
              {linkCode}
            </span>
          </div>
        )}

        <button
          onClick={handleGenerateCode}
          disabled={generatingCode}
          className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#FF9F1C] to-[#FFB703]"
        >
          {generatingCode ? "Generating..." : "Generate Code"}
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-8">

        <SummaryCard icon={<Hospital size={16} className="text-teal-400" />} title="Last Visit" value={lastVisitDate} subtitle={lastVisitDoctor} />
        <SummaryCard icon={<Pill size={16} className="text-teal-400" />} title="Medication" value={`${takenDoses} / ${totalDoses}`} subtitle={`${takenDoses} taken`} />
        <SummaryCard icon={<CalendarCheck size={16} className="text-teal-400" />} title="Next Visit" value={nextVisitDate} subtitle={nextVisitDept} />
        <SummaryCard icon={<FileText size={16} className="text-teal-400" />} title="Reports" value={reportStatus} subtitle={reportName} />

      </div>

      {/* MEDICATION PROGRESS */}
      <Section title="Medication Progress">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white mb-4">
            {takenDoses} of {totalDoses} doses completed today
          </p>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-yellow-300"
              style={{
                width:
                  totalDoses > 0
                    ? `${(takenDoses / totalDoses) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      </Section>

    </div>
  );
};

export default PatientDashboard;

/* ================= HELPERS ================= */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

/* ================= COMPONENTS ================= */

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
};

const SummaryCard = ({ icon, title, value, subtitle }: SummaryCardProps) => (
  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 flex flex-col gap-2">
    <div className="w-8 h-8 rounded-xl bg-teal-400/15 flex items-center justify-center">
      {icon}
    </div>

    <div className="mt-auto">
      <p className="text-white font-bold text-lg truncate">{value}</p>
      <p className="text-white/70 text-xs">{title}</p>
      <p className="text-white/50 text-[11px]">{subtitle}</p>
    </div>
  </div>
);

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-6">
    <p className="text-[10px] tracking-widest text-gray-500 mb-3">
      {title.toUpperCase()}
    </p>
    {children}
  </div>
);