import { createContext, useContext, useState, useEffect } from "react";
import { auth, app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
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
    const batch = writeBatch(db);
    const photoURL = cred.user.photoURL ? cred.user.photoURL : null;
    const userDoc = {
      displayName: cred.user.displayName,
      email: cred.user.email,
      photoURL,
      createdAt: new Date(),
    };
    const inboxList = {
      id: "inbox",
      title: "Inbox",
      notes: "",
      icon: "inbox",
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
      default: true,
    };
    const todayList = {
      id: "today",
      title: "Today",
      notes: "",
      icon: "today",
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
      default: true,
      category: "today",
    };
    const upcomingList = {
      id: "upcoming",
      title: "Upcoming",
      notes: "",
      icon: "upcoming",
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
      default: true,
      category: "upcoming",
    };
    const importantList = {
      id: "important",
      title: "Important",
      notes: "",
      icon: "important",
      sort: "createdAt",
      createdAt: new Date(),
      modifiedAt: new Date(),
      default: true,
      category: "important",
    };
    const taskId = uuidv4();
    const welcomeTask = {
      id: taskId,
      title: "Welcome to your task list!",
      completed: false,
      description: "",
      dueDate: null,
      listId: "inbox",
      createdAt: new Date(),
      modifiedAt: new Date(),
      categories: ["today", "upcoming", "important"],
    };
    batch.set(doc(db, "Users", cred.user.uid), userDoc);
    batch.set(doc(db, "Users", cred.user.uid, "Lists", "inbox"), inboxList);
    batch.set(doc(db, "Users", cred.user.uid, "Lists", "today"), todayList);
    batch.set(
      doc(db, "Users", cred.user.uid, "Lists", "upcoming"),
      upcomingList
    );
    batch.set(
      doc(db, "Users", cred.user.uid, "Lists", "important"),
      importantList
    );
    batch.set(doc(db, `Users/${cred.user.uid}/Tasks`, taskId), welcomeTask);
    await batch.commit();
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
