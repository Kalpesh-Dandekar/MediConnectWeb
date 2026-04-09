import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

/* ✅ EXPORT AUTH (THIS FIXES YOUR ERROR) */
export { auth };

// 🔹 Register User
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: string
) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = credential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      createdAt: serverTimestamp(),
      profile: {},
      profileCompleted: false,
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// 🔹 Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// 🔥 Google Sign In (FIXED + MATCHES FLUTTER)
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // 🔥 Check if user exists
    const ref = doc(db, "users", user.uid);
    const snapshot = await getDoc(ref);

    // 🔥 Create if not exists (same as Flutter)
    if (!snapshot.exists()) {
      await setDoc(ref, {
        name: user.displayName || "User",
        email: user.email,
        role: null,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error: any) {
    throw new Error("Google sign-in failed");
  }
};

// 🔹 Save Role Details
export const saveRoleDetails = async (
  uid: string,
  profileData: any
) => {
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        profile: profileData,
        profileCompleted: true,
      },
      { merge: true }
    );
  } catch {
    throw new Error("Failed to save profile details");
  }
};

// 🔹 Get User Data
export const getUserData = async (uid: string) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
  } catch {
    throw new Error("Failed to fetch user data");
  }
};

// 🔹 Get Role
export const getUserRole = async (uid: string) => {
  const data = await getUserData(uid);
  return data?.role || null;
};

// 🔹 Check Profile Completed
export const isProfileCompleted = async (uid: string) => {
  const data = await getUserData(uid);
  return data?.profileCompleted || false;
};

// 🔹 Logout
export const logoutUser = async () => {
  await signOut(auth);
};