import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserPlus } from "react-feather";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Corrected combinedId calculation to use currentUser.uid consistently
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // Corrected getDoc usage
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // Corrected setDoc usage
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Corrected updateDoc usage with serverTimestamp() invocation
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(), // serverTimestamp is a function
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(), // serverTimestamp is a function
        });
      }
    } catch (err) {
      setErr(true);
      console.error("Error in handleSelect:", err);
    }

    setUser(null);
    setUsername("");
  };
  return (
    <div className="border-b pt-2 pb-1 border-gray-300">
      <div className="searchForm">
        <input
          className="bg-transparent border-none text-white outline-none"
          type="text"
          placeholder="Search for a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {err && <span>User not found.</span>}
        {user && (
          <div className="userChat hover:bg-indigo-700" onClick={handleSelect}>
            <img src={user.photoURL} alt="profile" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
            <UserPlus className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
