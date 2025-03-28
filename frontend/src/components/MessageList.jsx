import React from "react";

const MessageList = ({ messages }) => {
  return (
    <>
      {messages
        .slice()
        .reverse()
        .map(
          (message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <div
                className={`max-w-xl p-3 rounded-lg  ${
                  message.role === "assistant"
                    ? "bg-transparent rounded-bl-none"
                    : "bg-gray-100 rounded-br-none"
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          )
        )}
    </>
  );
};

export default MessageList; // Default export
