"use client";
import React from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6";
import { Chat } from "@prisma/client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

type Props = {
  chats: Chat[];
  chatId: string;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-800">
      <Link href="/">
        <Button className="w-full border-dashed border border-white">
          <FiPlusCircle className="w-5 h-5 mr-2" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.fileKey}>
            <div
              className={cn(
                "flex rounded-lg py-2 text-slate-300 items-center",
                {
                  "bg-slate-700 text-white": chatId === chat.id,
                  "hover:text-white": chatId !== chat.id,
                }
              )}
            >
              <FaRegFilePdf size={18} className="mr-2" />
              <p className="w-full text-sm overflow-hidden whitespace-nowrap truncate text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex justify-between items-center gap-20 text-sm text-slate-400">
          <Link href="/">Home</Link>
          <Link href="/sign-out">Sign Out</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
