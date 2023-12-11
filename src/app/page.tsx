import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import getChats from "./actions/getChats";
import ChatList from "@/components/ChatList";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  const chats = await getChats({ userId: userId as string });
  const lastChatId = chats.length > 0 ? chats[chats.length - 1].id : "";

  return (
    <main className="w-screen min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 p-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          {isAuth && (
            <div className="flex my-12">
              {chats.length > 0 && (
                <Link href={`/chat/${lastChatId}`}>
                  <Button>
                    Go to Chats <FaArrowRight className="ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          )}

          <p className="max-w-lg mt-1 text-lg text-slate-800">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-8">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <IoLogInOutline className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            )}
          </div>
          {/* {isAuth && <ChatList chats={chats} />} */}
        </div>
      </div>
    </main>
  );
}
