import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const UserControl = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext); // Use dispatch from ChatContext

  const handleLogout = async () => {
    try {
      await signOut(auth); // Attempt to sign out
      dispatch({ type: "RESET_CHAT" }); // Reset chat state upon successful logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between h-12 px-4 bg-indigo-700">
      <div className="flex gap-2">
        <img
          className="h-6 w-6 rounded-full"
          src={currentUser.photoURL}
          alt="profile"
        />
        <span className="text-lg text-white">{currentUser.displayName}</span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gray-900 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded-lg border border-transparent uppercase tracking-wide cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default UserControl;
