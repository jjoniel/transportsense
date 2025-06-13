"use client";

import React, { useState, useRef, useEffect } from "react";
import { Choice, conversationTree } from "@/data/conversationData";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

const initialNode = conversationTree["root"];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: initialNode.botText,
    },
  ]);

  const [currentNodeId, setCurrentNodeId] = useState<string>("root");
  const [nextId, setNextId] = useState(2);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (choice: Choice) => {
    const userMessage: Message = {
      id: nextId,
      sender: "user",
      text: choice.text,
    };

    const nextNode = conversationTree[choice.nextNode];
    if (!nextNode) return;

    const botResponse: Message = {
      id: nextId + 1,
      sender: "bot",
      text: nextNode.botText,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    setCurrentNodeId(choice.nextNode);
    setNextId((prevId) => prevId + 2);
  };

  const currentChoices = conversationTree[currentNodeId]?.choices || [];

  return (
    <div className="flex flex-col h-full w-full text-white">
      <div className="flex-grow p-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`rounded-lg px-4 py-2 max-w-[85%] text-sm ${
                  message.sender === "user" ? "bg-[var(--accent)]" : "bg-[var(--surface)]"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[var(--surface-light)] shrink-0">
        <div className="space-y-2">
          {currentChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(choice)}
              className="w-full px-4 py-2 bg-transparent border border-[var(--accent)] rounded-lg text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
