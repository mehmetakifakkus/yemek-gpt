"use client";

import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Message } from "ai/react";
import React from "react";

import { AiOutlineFileExclamation } from "react-icons/ai";
import RecipeList from "./RecipeList";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  const [animationParent] = useAutoAnimate();

  if (!messages) {
    return (
      <div className="flex gap-2 px-4">
        <AiOutlineFileExclamation /> No messages...
      </div>
    );
  }

  return (
    <div ref={animationParent} className="flex flex-col gap-4 px-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex whitespace-pre-wrap", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          {message.role === "assistant" &&
          JSON.parse(message.content).status === "recipe not selected yet" ? (
            <RecipeList
              recipeList={JSON.parse(message.content).recipes as any[]}
            />
          ) : (
            <div
              className={cn(
                "rounded-lg px-3 text-base py-2 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-neutral-600 text-white": message.role === "user",
                  "bg-neutral-200 text-neutral-900":
                    message.role === "assistant",
                }
              )}
            >
              <p>{message.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
