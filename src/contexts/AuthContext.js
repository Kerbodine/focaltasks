import { createContext, useContext, useState, useEffect } from "react";
import { auth, app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAdditionalUserInfo,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  const createSignupDoc = async (cred) => {
    const photoURL = cred.user.photoURL ? cred.user.photoURL : null;
    const userDoc = {
      displayName: cred.user.displayName,
      email: cred.user.email,
      photoURL,
      createdAt: new Date(),
    };
    await setDoc(doc(db, "Users", cred.user.uid), userDoc);
    await setDoc(doc(db, `Users/${cred.user.uid}/Lists`, "inbox"), {
      id: "inbox",
      title: "Inbox",
      notes: "",
      icon: "inbox",
      tasks: [
        {
          id: uuidv4(),
          title: "Welcome to your task list!",
          completed: false,
          description: "",
          remindDate: null,
          dueDate: null,
          important: false,
          createdAt: new Date(),
          modifiedAt: new Date(),
        },
      ],
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      let cred = await createUserWithEmailAndPassword(auth, email, password);
      cred.user.displayName = `${firstName} ${lastName}`;
      await createSignupDoc(cred);
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
      const { isNewUser } = getAdditionalUserInfo(cred);
      if (isNewUser) {
        await createSignupDoc(cred);
      }
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

  // User data states
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
