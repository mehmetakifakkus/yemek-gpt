import ChatComponent from "@/components/ChatComponent";
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

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="bg-gray-100 relative w-full h-screen z-0">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            id="bgvid"
            className="w-full h-full object-cover"
            style={{ filter: "opacity(.5);" }}
          >
            <source src="/chef.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex w-full max-h-screen overflow-scroll">
          {/* chat sidebar */}
          {/* <div className="flex-[2] max-w-xs ">
          <ChatSideBar chats={chats} chatId={chatId} />
        </div> */}

          {/* chat component */}
          <div className="flex-[6] border-l-4 border-l-slate-400 sm:px-[120px] lg:px-[240px]">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
