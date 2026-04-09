import { useEffect, useState } from "react";
import {
  listenToProfile,
  updateField,
  logout,
} from "../../services/patient/profileService";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [editField, setEditField] = useState<{
    field: string;
    title: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = listenToProfile((profile) => {
      setData(profile);
    });
    return () => unsub();
  }, []);

  const openEdit = (title: string, field: string, current: string) => {
    setEditField({ field, title });
    setEditValue(current);
  };

  const handleSave = async () => {
    if (!editField) return;
    await updateField(editField.field, editValue.trim());
    setEditField(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const user = auth.currentUser;
  const name       = (data?.name as string)       || "Patient";
  const age        = (data?.age as string)        || "--";
  const gender     = (data?.gender as string)     || "--";
  const bloodGroup = (data?.bloodGroup as string) || "--";
  const phone      = (data?.phone as string)      || "--";

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      {/* PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-orange-400/20 flex items-center justify-center text-orange-400 font-bold text-lg">
          {name[0]?.toUpperCase() || "P"}
        </div>
        <div>
          <p className="font-semibold">{user?.email}</p>
          <p className="text-sm text-gray-400">
            Patient ID: {user?.uid?.slice(0, 6)}
          </p>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <Section title="PERSONAL INFORMATION">
        <Tile title="Full Name"   value={name}       onClick={() => openEdit("Full Name",   "name",       name)}       />
        <Tile title="Age"         value={age}        onClick={() => openEdit("Age",         "age",        age)}        />
        <Tile title="Gender"      value={gender}     onClick={() => openEdit("Gender",      "gender",     gender)}     />
        <Tile title="Blood Group" value={bloodGroup} onClick={() => openEdit("Blood Group", "bloodGroup", bloodGroup)} />
        <Tile title="Phone"       value={phone}      onClick={() => openEdit("Phone",       "phone",      phone)}      />
      </Section>

      {/* LOGOUT */}
      <div className="mt-10 text-center">
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500/10"
        >
          Logout
        </button>
      </div>

      {/* EDIT MODAL */}
      {editField && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#14283C] rounded-2xl p-6 w-80 shadow-xl border border-white/10">
            <h2 className="text-white font-semibold text-lg mb-4">
              Edit {editField.title}
            </h2>
            <input
              className="w-full bg-white/5 text-white rounded-xl px-4 py-2 border border-white/10 outline-none mb-5"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditField(null)}
                className="text-white/50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#FFB703] text-black font-semibold px-4 py-1.5 rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;

/* ── COMPONENTS ── */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <p className="text-xs text-gray-500 tracking-widest mb-3">{title}</p>
    {children}
  </div>
);

const Tile = ({
  title,
  value,
  onClick,
}: {
  title: string;
  value: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4 mb-3 cursor-pointer hover:bg-white/10"
  >
    <span className="text-gray-400">{title}</span>
    <span className="flex items-center gap-2 text-white">
      {value}
      <span className="text-white/30 text-sm">✏️</span>
    </span>
  </div>
);