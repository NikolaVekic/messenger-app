/* eslint-disable default-case */
import React, { useContext, useState } from "react";
import { FilePlus } from "react-feather";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Input.jsx updated with Tailwind CSS
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const updateUserChats = async (downloadURL = null) => {
      const lastMessageContent = downloadURL ? "Sent an image" : text;

      try {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessageContent,
            img: downloadURL || "",
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });
        console.log("Updated currentUser's userChats successfully");

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessageContent,
            img: downloadURL || "",
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });
        console.log("Updated chat partner's userChats successfully");
      } catch (error) {
        console.error("Error updating userChats:", error);
      }
    };

    if (img) {
      const storageRef = ref(storage, `images/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: handle upload progress here
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              await updateUserChats(downloadURL);
            } catch (error) {
              console.error("Error sending message with image:", error);
            } finally {
              setText("");
              setImg(null);
            }
          });
        }
      );
    } else if (text.trim()) {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        await updateUserChats();
      } catch (error) {
        console.error("Error sending text message:", error);
      } finally {
        setText("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };
  return (
    <div className="h-12 bg-white p-2.5 flex items-center justify-between">
      <input
        className="w-full border-none outline-none text-lg"
        type="text"
        placeholder="type something"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-3.5">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <FilePlus />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
};
export default Input;
