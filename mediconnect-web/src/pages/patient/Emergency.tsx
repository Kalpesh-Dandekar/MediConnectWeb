import DashboardLayout from "../../layout/DashboardLayout";

/* ================= COMPONENT ================= */

const Emergency = () => {
  const handleAction = (msg: string) => {
    alert(msg);
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-red-400">
          Emergency Assistance
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Immediate help & urgent medical support
        </p>
      </div>

      {/* CRITICAL EMERGENCY */}
      <div className="mb-8 p-7 rounded-2xl bg-gradient-to-br from-red-900/60 to-red-700/30 border border-red-500/30">

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-xl font-semibold">Critical Emergency</h2>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          For severe symptoms, accidents, chest pain or breathing difficulty,
          contact emergency services immediately.
        </p>

        <button
          onClick={() => handleAction("Ambulance request sent")}
          className="w-full py-4 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
        >
          CALL AMBULANCE (108)
        </button>
      </div>

      {/* GRID (IMPORTANT FOR STRUCTURE) */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-8">

          {/* CONNECT DOCTOR */}
          <div className="p-6 rounded-2xl bg-[#14283C] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl text-teal-400">👨‍⚕️</span>
              <h3 className="font-semibold">
                Connect to Available Doctor
              </h3>
            </div>

            <p className="text-xs text-gray-400 mb-5">
              Doctors Online: 3 • Avg wait time: 2 mins
            </p>

            <button
              onClick={() => handleAction("Doctor request sent")}
              className="w-full py-3 rounded-lg bg-teal-400 text-black font-semibold hover:scale-[1.01] transition"
            >
              CONNECT NOW
            </button>
          </div>

          {/* ALERT CAREGIVER */}
          <button
            onClick={() => handleAction("Caregiver alerted")}
            className="w-full py-4 rounded-xl bg-[#14283C] border border-white/10 text-teal-400 font-semibold hover:bg-white/5 transition"
          >
            Alert Caregiver
          </button>

        </div>

        {/* RIGHT */}
        <div>

          <p className="text-xs tracking-widest text-gray-500 mb-4">
            EMERGENCY CONTACTS
          </p>

          <div className="space-y-4">

            <ContactTile
              title="City Care Hospital"
              subtitle="2.3 km away"
              icon="🏥"
            />

            <ContactTile
              title="Primary Doctor"
              subtitle="Dr. Michael Smith"
              icon="👨‍⚕️"
            />

            <ContactTile
              title="Emergency Contact"
              subtitle="John Doe (Relative)"
              icon="👪"
            />

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Emergency;

/* ================= CONTACT TILE ================= */

const ContactTile = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) => {
  return (
    <div className="p-5 rounded-xl bg-[#14283C] border border-white/10 flex items-center gap-4 hover:bg-[#16314A] transition">

      <div className="text-xl text-red-400">{icon}</div>

      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      <button className="text-teal-400 hover:scale-110 transition">
        📞
      </button>

    </div>
  );
};