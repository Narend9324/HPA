import {Input}  from 'antd';
import React, { useState } from 'react';


const ChatInput = () => {
  const [userMessage, setUserMessage] = useState('');

  const handleSend = () => {
    if (userMessage.trim()) {
      console.log("Message Sent:", userMessage);
      setUserMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="w-full p-4 bg-white border-t flex items-center">
      <Input
        type="text"
        placeholder="How Can I Help You?"
        className="w-full border rounded-full p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
