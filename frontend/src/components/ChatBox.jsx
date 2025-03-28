import MessageList  from './MessageList';

const ChatBox = ({ messages }) => {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Rest of the ChatBox component */}
      <MessageList messages={messages} />
    </div>
  );
};

export default ChatBox;