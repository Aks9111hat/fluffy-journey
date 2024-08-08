import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};
interface ChatBotProps {
    onClose: () => void;
}

const Chatbot: React.FC<ChatBotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        const userMessage: Message = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('/api/genai/chatbot', { message: input });
            const botMessage: Message = { sender: 'bot', text: response.data.reply };
            setMessages([...messages, userMessage, botMessage]);
            toast.success("Message sent successfully");
        } catch (error: any) {
            toast.error(error.message);
        }

        setInput('');
    };

    return (
        <div className="chatbot-container p-4 bg-gray-100 rounded-lg shadow-md">
            <button className="absolute top-2 right-2" onClick={onClose}>
                X
            </button>
            <div className="messages overflow-auto h-64 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 m-1 rounded ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="input flex">
                <input
                    className="flex-grow p-2 border rounded"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
