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
            className="w-full h-full object-cover"
            style={{ filter: "opacity(.75);" }}
          >
            <source src="/chef.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex w-full max-h-screen overflow-scroll">
          {/* chat component px-[0px] sm:px-[40px] lg:px-[120px] xl:w-[960px] */}
          <div className="flex w-[92vw] sm:w-[80vw] justify-center mx-auto">
            <ChatComponent chatId={chatId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
