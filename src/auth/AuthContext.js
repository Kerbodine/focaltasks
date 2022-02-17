import { createContext, useContext, useState, useEffect } from "react";
import { auth, app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  const signup = async (email, password, firstName, lastName) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const userDoc = { displayName: `${firstName} ${lastName}`, email };
      await setDoc(doc(db, "Users", cred.user.uid), userDoc);
    } catch (err) {
      console.log(err);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Sign up / sign in with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, provider);
      const userDoc = {
        displayName: cred.user.displayName,
        email: cred.user.email,
      };
      await setDoc(doc(db, "Users", cred.user.uid), userDoc);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [userData, setUserData] = useState("");

  const value = {
    userData,
    setUserData,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
