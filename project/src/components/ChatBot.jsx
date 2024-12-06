import { useState, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyDov_75mbdLbn5t1U3ciYMqFw4qV6upFq8"); // Replace with actual API key

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your AI Health Assistant. How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (userMessage) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As a medical assistant, please provide a helpful response to: ${userMessage}. Keep the response concise and professional.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I apologize, but I\'m having trouble processing your request. Please try again later.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message;
      setMessage('');
      setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
      setIsLoading(true);

      const response = await generateResponse(userMessage);
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden">
          <div className="bg-[#09B480] p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-white" />
              <h3 className="text-lg font-semibold text-white">Health Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-[#09B480] text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#09B480]"
              />
              <button
                type="submit"
                className="bg-[#09B480] text-white p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#09B480] hover:bg-opacity-90 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200 flex items-center justify-center"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;