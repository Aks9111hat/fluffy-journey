// components/FloatingChatIcon.tsx
import React, { useState } from 'react';
import Chatbot from "@/components/FunctionalComponents/ChatBot";


interface FloatingChatIconProps {
    showChatbot: boolean;
}

const FloatingChatIcon: React.FC<FloatingChatIconProps> = ({ showChatbot }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };

    if (!showChatbot) return null;

    return (
        <div>
            <div
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer shadow-lg z-50"
                onClick={handleIconClick}
            >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 0110 10 9.95 9.95 0 01-2.3 6.3L22 22 17.7 19.3A9.95 9.95 0 0112 22 10 10 0 112 12 10 10 0 0112 2m0-2a12 12 0 1012 12A12 12 0 0012 0z" />
                </svg>
            </div>
            {isOpen && <Chatbot onClose={handleIconClick} />}
        </div>
    );
};

export default FloatingChatIcon;
