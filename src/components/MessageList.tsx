"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";

import { AiOutlineFileExclamation } from "react-icons/ai";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  if (!messages) {
    return (
      <div className="flex gap-2 px-4">
        <AiOutlineFileExclamation /> No messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn(
              "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
              {
                "bg-neutral-600 text-white": message.role === "user",
                "bg-neutral-200 text-neutral-900": message.role === "assistant",
              }
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
