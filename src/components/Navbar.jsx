import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  return (
    <div className="flex items-center h-12 p-0 px-4 justify-between bg-indigo-700">
      <span className="text-lg font-semibold text-white">Messenger</span>
    </div>
  );
};

export default Navbar;
