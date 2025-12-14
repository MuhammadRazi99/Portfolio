import { useState, useRef, useEffect } from "react";
import { AiFillRobot, AiOutlineSend } from "react-icons/ai";
import { baseURL, getCookie } from "../Constants";
import ReactMarkdown from 'react-markdown';

const BASE_URL = `${baseURL}/api/chatbot/`;


function ChatbotComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hi, I am Razi AI Assistant. How can I help you today?", type: "bot" },
  ]);

  const messagesEndRef = useRef(null);

  // Smooth auto scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const sendMessage = async (message) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data?.response || "No response from server";
    } catch (error) {
      console.error("Chatbot API error:", error);
      return "⚠️ Error communicating with chatbot.";
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;

    const userMessage = userInput.trim();
    setUserInput("");
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { text: userMessage, type: "user" }]);

    // Send to backend
    const botReply = await sendMessage(userMessage);

    // Add bot response
    setMessages((prev) => [...prev, { text: botReply, type: "bot" }]);

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChat}
        className="bg-[#2e8b57] p-4 fixed bottom-16 right-10 border rounded-lg shadow-lg text-white"
      >
        <AiFillRobot size={40} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 h-3/5 max-[670px]:w-3/4 w-[30%] bg-gray-100 border rounded-2xl shadow-xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-[#2e8b57] text-white rounded-t-2xl">
            <span className="font-semibold">Razi AI Assistant</span>
            <button onClick={toggleChat} className="text-2xl font-bold">
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`
                max-w-[75%] px-4 py-2 text-[15px] rounded-2xl leading-snug shadow-sm
                ${msg.type === "user"
                    ? "self-end bg-green-200 text-black rounded-br-md"
                    : "self-start bg-white text-black border border-gray-300 rounded-bl-md"
                  }
              `}
              >
                {msg.type === "bot" ? (
                  <div className="prose prose-sm max-w-none text-[15px]">
                    <ReactMarkdown
                      components={{
                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                        li: ({ node, ...props }) => <li {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {/* Loading Bubble */}
            {loading && (
              <div className="self-start bg-white border border-gray-300 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2e8b57] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2e8b57] rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-[#2e8b57] rounded-full animate-bounce delay-300"></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-3 flex gap-2 border-t bg-white">
            <textarea
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 shadow-sm resize-none h-11 text-black outline-none"
              placeholder="Type a message…"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="p-3 bg-[#2e8b57] text-white rounded-full shadow disabled:opacity-50 flex justify-center items-center active:scale-95"
            >
              <AiOutlineSend size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

export default ChatbotComponent;
