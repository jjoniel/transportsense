"use client";

import React, { useState, useRef, useEffect } from "react";
import { Choice, conversationTree } from "@/data/conversationData";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

type Phase =
  | "initialPhase"
  | "simulationStart"
  | "laneAdded"
  | "trafficReturns"
  | "paradoxExplanation"
  | "simulationReset"
  | "laneRemoved"
  | "trafficGone"
  | "solutionExplanation";

interface ChatInterfaceProps {
  onChoiceSelect?: (choice: Choice) => void;
  onPhaseChange?: (phase: Phase) => void;
}

const initialNode = conversationTree["initialPhase"];

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onChoiceSelect,
  onPhaseChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: initialNode.botText,
    },
  ]);

  const [currentNodeId, setCurrentNodeId] = useState<string>("initialPhase");
  const [nextId, setNextId] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = async (choice: Choice) => {
    onChoiceSelect?.(choice);

    //if starting over, reset chat and metrics without AI query
    if (choice.nextNode === "initialPhase") {
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: initialNode.botText,
        },
      ]);
      setCurrentNodeId("initialPhase");
      onPhaseChange?.("initialPhase");
      setNextId(2);
      return;
    }

    const userMessage: Message = {
      id: nextId,
      sender: "user",
      text: choice.text,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const nextNode = conversationTree[choice.nextNode];
    if (!nextNode) {
      setIsLoading(false);
      return;
    }

    const promptData = {
      userAction: choice.text,
      nextPhase: nextNode.botText,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptData }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();

      const botResponse: Message = {
        id: nextId + 1,
        sender: "bot",
        text: data.text,
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      onPhaseChange?.(currentNodeId as Phase);
    } catch (error) {
      console.error("Error with Gemini integration:", error);
      const fallbackResponse: Message = {
        id: nextId + 1,
        sender: "bot",
        text: nextNode.botText,
      };
      setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
      onPhaseChange?.(currentNodeId as Phase);
    } finally {
      setCurrentNodeId(choice.nextNode);
      setNextId((prevId) => prevId + 2);
      setIsLoading(false);
    }
  };

  const currentChoices = conversationTree[currentNodeId]?.choices || [];

  return (
    <div className="flex flex-col h-full w-full text-white border-t border-gray-700 pt-4">
      <div className="flex-grow p-1 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`rounded-2xl px-4 py-2 max-w-[85%] text-md ${
                  message.sender === "user" ? "bg-[var(--accent)]" : "bg-[#222]"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <p className="text-center text-gray-400 text-sm">
            Assistant is thinking...
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 shrink-0">
        <div className="space-y-2">
          {currentChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(choice)}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-transparent border border-[var(--accent)] rounded-3xl text-left hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
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
