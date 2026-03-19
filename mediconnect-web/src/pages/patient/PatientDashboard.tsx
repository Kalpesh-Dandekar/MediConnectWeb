import DashboardLayout from "../../layout/DashboardLayout";

/* ================= MOCK DATA ================= */

const userName = "Alex Johnson";

const lastVisitDate = "12/3/2026";
const lastVisitDoctor = "Dr. Sharma";

const nextVisitDate = "25/3/2026";
const nextVisitDept = "Cardiology";

const takenDoses = 2;
const totalDoses = 5;

const reportStatus = "3 Reports";

/* ================= COMPONENT ================= */

const PatientDashboard = () => {
  const greeting = getGreeting();

  return (
    <DashboardLayout>

      <div className="w-full max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
              {greeting}, {userName} 👋
            </h1>
            <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm">
              Here’s your health overview for today
            </p>
          </div>

          {/* PROFILE */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400 font-bold text-sm sm:text-lg flex-shrink-0">
            {userName[0]}
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">

          <Card
            title="Last Visit"
            value={lastVisitDate}
            subtitle={lastVisitDoctor}
            icon="🏥"
          />

          <Card
            title="Medication"
            value={`${takenDoses} / ${totalDoses}`}
            subtitle="Doses today"
            icon="💊"
          />

          <Card
            title="Next Visit"
            value={nextVisitDate}
            subtitle={nextVisitDept}
            icon="📅"
          />

          <Card
            title="Reports"
            value={reportStatus}
            subtitle="Lab status"
            icon="📄"
          />

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* MEDICATION */}
            <Section title="Medication Progress">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">

                <p className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                  {takenDoses} of {totalDoses} doses completed today
                </p>

                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-yellow-300"
                    style={{ width: `${(takenDoses / totalDoses) * 100}%` }}
                  />
                </div>

              </div>
            </Section>

            {/* RECENT ACTIVITY */}
            <Section title="Recent Activity">
              <div className="space-y-2 sm:space-y-3">
                <Activity text="Took morning medication" />
                <Activity text="Booked appointment with Dr. Sharma" />
                <Activity text="Uploaded blood report" />
              </div>
            </Section>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 sm:space-y-8">

            <div className="bg-gradient-to-br from-orange-400/10 to-transparent border border-orange-400/20 rounded-2xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-400">Next Appointment</p>

              <h3 className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">
                {nextVisitDate}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {nextVisitDept}
              </p>
            </div>

            <Section title="Latest Lab Report">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                <p className="text-base sm:text-lg font-medium">{reportStatus}</p>
              </div>
            </Section>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default PatientDashboard;

/* ================= HELPERS ================= */

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/* ================= CARD ================= */

type CardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
};

const Card = ({ title, value, subtitle, icon }: CardProps) => {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-6 
    backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-orange-400/10 to-transparent" />

      <div className="relative z-10">
        
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-4">
          {icon}
        </div>

        <h3 className="text-base sm:text-xl font-semibold leading-tight">
          {value}
        </h3>

        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          {title}
        </p>

        <p className="text-xs text-gray-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
};

/* ================= SECTION ================= */

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <div>
      <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mb-3 sm:mb-4">
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
};

/* ================= ACTIVITY ================= */

type ActivityProps = {
  text: string;
};

const Activity = ({ text }: ActivityProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition">
      {text}
    </div>
  );
};