import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { UserPlus } from "react-feather";
import { Video } from "react-feather";
import { MoreHorizontal } from "react-feather";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-[2]">
      <div className="h-12 bg-gray-900 flex items-center justify-between p-2.5 text-white">
        {<span>{data.user?.displayName}</span>}
        <div className="flex gap-3.5">
          <Video className="cursor-pointer" />
          <UserPlus className="cursor-pointer" />
          <MoreHorizontal className="cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
