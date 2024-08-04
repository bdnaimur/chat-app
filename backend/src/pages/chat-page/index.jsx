import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatPage() {
  const [chats, setChats] = useState([]);

  const getChatData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/chat");
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <div>
      {chats.map((chat) => {
        console.log(chat.chatName);
        return <div key={chat._id}>Name: {chat.chatName}</div>; // Ensure to return the JSX element and provide a unique key
      })}
    </div>
  );
}

export default ChatPage;
