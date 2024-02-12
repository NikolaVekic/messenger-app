import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const formatDate = (firestoreTimestamp) => {
  const date = firestoreTimestamp.toDate(); // Convert to JavaScript Date object
  const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // Customize format options as needed
  return new Intl.DateTimeFormat("en-US", options).format(date); // Example: "12:24 PM"
};

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    // owner class on condition
    <div
      className={`flex gap-5 mb-5 ${
        message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="flex flex-col align-center flex-start items-center text-gray-200">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="text-black pt-2">
          {message.date ? formatDate(message.date) : "Unknown time"}
        </span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-2.5 content">
        <p className="bg-white p-2.5 rounded-lg max-w-max">{message.text}</p>
        {message.img && (
          <img className="w-1/2 rounded-lg" src={message.img} alt="" />
        )}
      </div>
    </div>
  );
};

export default Message;
