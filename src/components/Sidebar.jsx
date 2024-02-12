import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import UserControl from "./UserControl";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col justify-between bg-gray-900 ">
      {/* md:flex */}
      <div>
        <Navbar />
        <Search />
        <Chats />
      </div>

      <UserControl />
    </div>
  );
};

export default Sidebar;
