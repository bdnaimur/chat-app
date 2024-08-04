// src/SocketChat.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const SocketChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('test', (msg) => {
        console.log(msg, socket.id);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default SocketChat;
