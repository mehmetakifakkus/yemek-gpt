import prisma from '@/lib/prismadb'
import { loadS3IntoPinecone } from '@/lib/pinecone';
import { getS3Url } from "@/lib/s3";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);

    const user = await clerkClient.users?.getUser((userId as string) || "");
    await loadS3IntoPinecone(file_key);

    await prisma.user.upsert({
      where: {
        clerkId: userId
      },
      update: {
        clerkId: userId
      },
      create: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress || ""
      },
    })

    const chat = await prisma.chat.create({
      data: {
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      }
    })

    return NextResponse.json(
      {
        chat_id: chat.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}