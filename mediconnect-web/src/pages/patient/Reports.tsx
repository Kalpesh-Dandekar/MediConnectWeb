import DashboardLayout from "../../layout/DashboardLayout";

/* ================= MOCK DATA ================= */

const reports = [
  {
    id: 1,
    testName: "Blood Test",
    status: "pending",
    givenOn: "12 Mar 2026",
    expectedOn: "15 Mar 2026",
    labName: "City Lab",
  },
  {
    id: 2,
    testName: "X-Ray Chest",
    status: "available",
    uploadedOn: "10 Mar 2026",
    doctor: "Dr. Sharma",
    resultStatus: "Normal",
  },
  {
    id: 3,
    testName: "MRI Scan",
    status: "available",
    uploadedOn: "8 Mar 2026",
    doctor: "Dr. Mehta",
    resultStatus: "Critical",
  },
];

/* ================= COMPONENT ================= */

const Reports = () => {
  const pending = reports.filter((r) => r.status === "pending");
  const available = reports.filter((r) => r.status === "available");

  return (
    <DashboardLayout>

      <div className="w-full max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold">Reports</h1>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
            Clinical records & lab results overview
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">

          <SummaryCard label="Total" value={reports.length} />
          <SummaryCard label="Pending" value={pending.length} />
          <SummaryCard label="Available" value={available.length} />

        </div>

        {/* PENDING */}
        <Section title="PENDING REPORTS">
          {pending.length === 0 ? (
            <EmptyState text="No pending reports" />
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {pending.map((r) => (
                <PendingCard key={r.id} {...r} />
              ))}
            </div>
          )}
        </Section>

        {/* AVAILABLE */}
        <Section title="AVAILABLE REPORTS">
          {available.length === 0 ? (
            <EmptyState text="No reports available" />
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {available.map((r) => (
                <AvailableCard key={r.id} {...r} />
              ))}
            </div>
          )}
        </Section>

      </div>

    </DashboardLayout>
  );
};

export default Reports;

/* ================= SUMMARY ================= */

const SummaryCard = ({ label, value }: any) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-5 text-center">
      <p className="text-lg sm:text-xl font-semibold">{value}</p>
      <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
};

/* ================= SECTION ================= */

const Section = ({ title, children }: any) => {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
        {title}
      </p>
      {children}
    </div>
  );
};

/* ================= EMPTY ================= */

const EmptyState = ({ text }: { text: string }) => {
  return (
    <div className="text-gray-500 text-xs sm:text-sm">{text}</div>
  );
};

/* ================= PENDING CARD ================= */

const PendingCard = ({
  testName,
  givenOn,
  expectedOn,
  labName,
}: any) => {
  return (
    <div className="p-3 sm:p-5 rounded-xl bg-white/5 border border-white/10">

      <div className="flex justify-between mb-2 sm:mb-3 gap-2">
        <p className="font-semibold text-sm sm:text-base truncate">
          {testName}
        </p>
        <span className="text-[10px] sm:text-xs text-orange-400 bg-orange-400/10 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
          Processing
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-400">Given: {givenOn}</p>
      <p className="text-xs sm:text-sm text-gray-400">Expected: {expectedOn}</p>
      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Lab: {labName}</p>

    </div>
  );
};

/* ================= AVAILABLE CARD ================= */

const AvailableCard = ({
  testName,
  uploadedOn,
  doctor,
  resultStatus,
}: any) => {
  const isNormal = resultStatus === "Normal";

  return (
    <div className="p-3 sm:p-5 rounded-xl bg-white/5 border border-white/10">

      <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2">
        <p className="font-semibold text-sm sm:text-base truncate">
          {testName}
        </p>

        <div
          className={`w-2 h-2 rounded-full ${
            isNormal ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </div>

      <p className="text-xs sm:text-sm text-gray-400">Uploaded: {uploadedOn}</p>
      <p className="text-xs sm:text-sm text-gray-400">Doctor: {doctor}</p>

      <p
        className={`text-xs sm:text-sm font-semibold mt-1 ${
          isNormal ? "text-green-400" : "text-red-400"
        }`}
      >
        Result: {resultStatus}
      </p>

      <button className="mt-3 sm:mt-4 w-full py-2 rounded-lg bg-[#1C3A52] text-teal-400 font-medium text-xs sm:text-sm hover:bg-[#24485f] transition">
        View Summary
      </button>

    </div>
  );
};