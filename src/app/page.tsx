import { Button } from "@/components/ui/button";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";

import { FaArrowRight } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <main className="w-screen min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 p-0">
      <div className="bg-gray-100">
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="poster.jpg"
              id="bgvid"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(.34)" }}
            >
              <source src="/chef.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold mb-10">
              Hayal gücünüzü mutfakla buluşturun!
            </h1>
          </div>
          <p className="max-w-xl mt-10 font-semibold text-2xl text-gray-300">
            Sadece sahip olduğunuz malzemelerle neler yapabileceğinizi merak
            ediyor musunuz?
          </p>

          <p className="max-w-xl text-lg mt-6 text-gray-300">
            Bizimle, mutfağınızda bulunan malzemelerle, Türk mutfağından sizin
            için özelleştirilmiş tarifler ve öneriler bulabilir, adım adım
            talimatlarla harika yemekler hazırlayabilirsiniz.
          </p>
          {isAuth && (
            <div className="flex my-12 gap-6 items-center">
              <UserButton afterSignOutUrl="/" />

              <Link href={`/chat`}>
                <Button className="text-blue-800 bg-blue-50 hover:text-blue-800 hover:bg-blue-200 text-lg">
                  Şimdi başlayın!
                  <FaArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          )}
          <div className="w-full mt-12">
            {!isAuth && (
              <Link href="/sign-in">
                <Button className="text-blue-800 bg-blue-50 hover:text-blue-800 hover:bg-blue-200 text-lg">
                  Başlamak için giriş yapın!
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
