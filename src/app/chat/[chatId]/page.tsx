import getChats from "@/app/actions/getChats";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PdfViewer from "@/components/PdfViewer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = auth();
  const isAuth = !!userId;

  if (!isAuth) {
    return redirect("/sign-in");
  }

  // If user doesn't have any chats, redirect to home page
  const chats = await getChats({ userId: userId as string });
  if (!chats) {
    redirect("/");
  }

  // If chat with chatId doesn't exist, redirect to home page
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[2] max-w-xs ">
          <ChatSideBar chats={chats} chatId={chatId} />
        </div>

        {/* pdf viewer */}
        <div className="max-h-screen overflow-scroll flex-[5]">
          <PdfViewer pdfUrl={chat.pdfUrl || ""} />
        </div>

        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-400">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
