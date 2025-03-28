import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatBox from "../components/ChatBox"; // Assuming ChatBox is imported here

const NadoAi = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState(""); // State to track the user's input message
  const [loading, setLoading] = useState(false); // Loading state for sending a user message
  const chatContainerRef = useRef(null); // Ref to track chat container

  const fetchMessages = async () => {
    const userId = localStorage.getItem("accessToken");

    try {
      // First API call: GET messages
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/run/messages?userId=${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.request(config);
      const messagesData = response.data?.messages?.data || [];

      // Process messages from the GET API
      const newMessages = messagesData.map((message) => {
        const role = message.role;
        const messageContent =
          message.content
            .map((contentItem) => contentItem.text?.value)
            .join(" ") || "No content";
        return { role, content: messageContent };
      });

      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching messages from the API:", error);
    }
  };

  // Function to handle sending a user message (POST API)
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!userMessage.trim()) {
      return; // If input is empty, do nothing
    }

    setLoading(true); // Set loading state when message is being sent

    const userId = localStorage.getItem("accessToken");

    try {
      // Show the user's message immediately
      const userMessageObj = {
        role: "user",
        content: userMessage,
      };
      setMessages([userMessageObj]); // Clear old messages and show only the new user message

      // Call the POST API when a user submits a question
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/run?userId=${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userMessage: userMessage, // Send user's typed message
        }),
      };

      const response = await axios.request(config);
      const messagesData = response.data?.messages?.data || [];

      // Process the first assistant message from the POST API
      const assistantMessageObj = messagesData.length > 0 ? {
        role: messagesData[0].role,
        content: messagesData[0].content
          .map((contentItem) => contentItem.text?.value)
          .join(" ") || "No content",
      } : {
        role: "assistant",
        content: "No response from assistant",
      };

      // Show only the user message and assistant's first response
      setMessages([userMessageObj, assistantMessageObj]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserMessage(""); // Clear input field
    setLoading(false); // Remove loading state after API call
  };

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // UseEffect to call the GET API when component mounts and scroll to bottom after messages are set
  useEffect(() => {
    fetchMessages();
  }, []);

  // UseEffect to scroll to the bottom whenever messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="nado-ai-container">
      {/* Chat container with a ref to track the div */}
      <div
        ref={chatContainerRef}
        className="chat-box-container overflow-y-auto max-h-[80vh] p-4"
      >
        <ChatBox messages={messages} />
      </div>

      {/* Form for user to type a message */}
      <form onSubmit={sendMessage} className="flex bg-white p-4 sticky bottom-0 w-full">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="How can I help you?"
          className="flex-grow p-3 border border-gray-300 rounded-2xl mr-2 text-lg"
          disabled={loading} // Disable input if a message is being sent
        />
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg ${loading ? "bg-gray-300 text-gray-500" : "bg-gray-100 text-black hover:bg-gray-200"}`}
          disabled={loading}
        >
          {loading ? (
            <img src="/Pause.svg" alt="loading" className="bg-black rounded-full" />
          ) : (
            <img src="/ArrowUp.svg" alt="submit" className="bg-black rounded-full" />
          )}
        </button>
      </form>
    </div>
  );
};

export default NadoAi;
