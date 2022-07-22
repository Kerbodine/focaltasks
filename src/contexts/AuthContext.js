import { createContext, useContext, useState, useEffect } from "react";
import { auth, app } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, writeBatch, updateDoc } from "firebase/firestore";
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
  const db = getFirestore(app);

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const createSignupDoc = async (cred) => {
    const batch = writeBatch(db);
    const photoURL = cred.user.photoURL ? cred.user.photoURL : null;
    const userDoc = {
      displayName: cred.user.displayName,
      email: cred.user.email,
      photoURL,
      createdAt: new Date(),
    };
    const taskId = uuidv4();
    const inboxList = {
      id: "inbox",
      title: "Inbox",
      notes: "",
      icon: "inbox",
      createdAt: new Date(),
      modifiedAt: new Date(),
      default: true,
      author: cred.user.uid,
      users: [`${cred.user.uid}`],
      tasks: {
        [`${taskId}`]: {
          id: taskId,
          title: "Welcome to your task list!",
          completed: false,
          description: "",
          dueDate: null,
          listId: "inbox",
          createdAt: new Date(),
          modifiedAt: new Date(),
        },
      },
    };
    batch.set(doc(db, "Users", cred.user.uid), userDoc);
    batch.set(doc(db, "Users", cred.user.uid, "Lists", "inbox"), inboxList);
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

  const changeUserName = async (firstName, lastName) => {
    const newDisplayName = `${firstName} ${lastName}`;
    await updateDoc(doc(db, "Users", auth.currentUser.uid), {
      displayName: newDisplayName,
    });
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

  const value = {
    userData,
    setUserData,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    changeUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
