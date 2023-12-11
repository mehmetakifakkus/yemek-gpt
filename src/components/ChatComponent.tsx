"use client";

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { RiSendPlane2Line } from "react-icons/ri";
import { Button } from "./ui/button";
import MessageList from "./MessageList";

type Props = { chatId: string };

const ChatComponent = ({ chatId }: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
  });

  useEffect(() => {
    const chat = document.getElementById("chat");
    if (chat) {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div id="chat" className="relative max-h-screen overflow-scroll">
      <div className="sticky top-0 inset-x-0 p-3 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat with document selected</h3>
      </div>

      <MessageList messages={messages} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 px-2 py-4 bg-white"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask any question..."
          className="w-full border-slate-600"
        />
        <div className="flex justify-end">
          <Button className=" text-lg bg-slate-700 mt-4">
            Send <RiSendPlane2Line className="ml-2" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
