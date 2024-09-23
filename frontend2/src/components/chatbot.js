import {useState} from 'react';
import { AiFillRobot,AiOutlineSend } from "react-icons/ai";

function ChatbotComponent () {

const [isChatOpen, setIsChatOpen] = useState(false);
const [userInput,setUserInput]=useState('');
const [messages, setMessages]=useState([{text:'Hi, I am Razi AI Assistant. How can I help you today?', type:'bot'}])

const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
};

const sendMessage = async (message) => {
   try {
    const response=await fetch('http://localhost:8000/api/chatbot/', {
      method:'POST', headers:{'Content-Type': 'application/json',},
      body: JSON.stringify({message})
    })
    const data =await response.json()
    return {response:data.response}
   } catch (error) {
    console.error("Error sending message to chatbot");
    return {response: 'Error communicating with chatbot'};
   }
  };

const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Do not allow empty messages

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, type: 'user' }
    ]);

    // Clear the textarea
    setUserInput('');

    // Perform the async operation (e.g., sending message to a chatbot)
    const response = await sendMessage(userInput);

    // Add bot's response to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response.response, type: 'bot' }
    ]);
  };


const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await handleSendMessage();
    }
  };

  
return (
<div >
    
    {/*  chatbot icon button */}
    <button onClick={toggleChat} className='bg-[#ec6e59;] p-4 fixed bottom-16 right-10 border rounded-lg shadow-lg'>
    <AiFillRobot size={40} className="cursor-pointer"/>
    </button>

    {isChatOpen && (
        <div className="fixed bottom-16 right-4 h-3/5 max-[670px]:w-3/4 w-150 bg-white border rounded-lg shadow-lg">
          {/* Chatbox header with close button */}
          <div className="flex justify-between items-center p-2 bg-[#ec6e59;] text-white">
            <h3>Razi AI Assistant</h3>
            <button onClick={toggleChat} className="text-white text-2xl">
              &times;
            </button>
          </div>

          {/* Chatbox content */}      
          
          <div className="flex flex-col p-4 overflow-y-scroll h-4/6">
            {messages.map((message,index)=>(
                <p key={index} className={`text-white rounded-lg p-1 mb-3 max-w-xs ${message.type==='user'?'bg-black ml-3 self-end':"bg-[#ec6e59;] mr-3 self-start"}`}>{message.text}</p>
            ))}        
          </div>
          
          {/* text area and button */}
          <div className='fixed bottom-16 z-20 p-4 flex flex-row item-center justify-center'>
            
            <textarea className='w-full max-[670px]:w-4/5 rounded-md p-1 shadow-md mr-[0.5rem]' type='text' 
            name='userInput' value={userInput} onChange={(e)=>setUserInput(e.target.value)}
            placeholder='Ask a question...' onKeyUp={handleKeyPress}/>
            
            <button onClick={handleSendMessage}>
                <AiOutlineSend size={25}/>
            </button>
          
          </div>
        </div>
      )}
</div>
);
};

export default ChatbotComponent;