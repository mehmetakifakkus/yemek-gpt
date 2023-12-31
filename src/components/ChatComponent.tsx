"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { RiSendPlane2Line } from "react-icons/ri";
import { Button } from "./ui/button";
import MessageList from "./MessageList";

type Props = { chatId: string };

const ChatComponent = ({ chatId }: Props) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    <div id="chat" className="relative max-h-screen overflow-y-scroll">
      <div className="sticky top-0 inset-x-0 p-6 h-fit bg-transparent z-20">
        <h3
          className="text-2xl sm:text-3xl font-bold mt-12 mb-2 sm:mb-6 text-red-800 z-50 drop-shadow-lg 
          w-[calc(100%-30px)]"
          style={{ filter: "drop-shadow(6px 4px 4px white)" }}
        >
          Elinizdeki malzemeleri ya da ne yemek istediğinizi yazın!
        </h3>
      </div>

      <MessageList messages={messages} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 px-6 py-4 bg-transparent"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Malzemeler ya da yemek ismi..."
          className="border-slate-600 text-lg p-4 w-full"
        />
        <div className="flex justify-end">
          <Button className=" text-lg bg-red-800 mt-4">
            Gönder <RiSendPlane2Line className="ml-2" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
