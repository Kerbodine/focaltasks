import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../auth/AuthContext";
import Loader from "../components/Loader";
import Inbox from "./Inbox";

const getUserInfo = async (db, id) => {
  const userRef = doc(db, "Users", id);
  const userSnap = await getDoc(userRef);
  return userSnap;
};

const getListInfo = async (db, id) => {
  const listSnap = getDocs(collection(db, `Users/${id}/Lists`));
  return listSnap;
};

const getInboxInfo = async (db, id) => {
  const listSnap = getDocs(collection(db, `Users/${id}/Inbox`));
  return listSnap;
};

export default function MainView() {
  const [loading, setLoading] = useState(true);

  const { setUserData, currentUser, setUserLists, setUserInbox } = useAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const getData = async () => {
      const userData = await getUserInfo(db, currentUser.uid);
      setUserData(userData.data());
      setLoading(false);
    };
    const getInbox = async () => {
      const inboxData = await getInboxInfo(db, currentUser.uid);
      let list = [];
      inboxData.forEach((doc) => {
        list.push(doc.data());
      });
      console.log(list);
      setUserInbox([...list]);
      setLoading(false);
    };
    const getLists = async () => {
      const listData = await getListInfo(db, currentUser.uid);
      let list = [];
      listData.forEach((doc) => {
        list.push(doc.data());
      });
      console.log(list);
      setUserLists([...list]);
      setLoading(false);
    };
    getData();
    getInbox();
    getLists();
  }, []);

  return (
    <div className="h-screen w-screen">
      {loading ? (
        <div className="grid h-full w-full place-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <hr className="absolute top-[55px] h-[1px] w-screen border-gray-200" />
          <div className="mx-auto flex h-full w-full max-w-screen-xl">
            {/* Navbar section */}
            <Navbar />
            {/* Main task area */}
            <div className="ml-[56px] h-full flex-auto sm:ml-0">
              <Routes>
                <Route exact path="/" element={<Inbox />} />
                <Route exact path="/today" element={<p>Today</p>} />
                <Route exact path="/upcoming" element={<p>Upcoming</p>} />
                <Route exact path="/important" element={<p>Important</p>} />
              </Routes>
            </div>
            {/* Sidebar section */}
            <Sidebar />
          </div>
        </>
      )}
    </div>
  );
}
