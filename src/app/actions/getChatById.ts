import prisma from '@/lib/prismadb'

type Props = {
  chatId?: string;
}

export default async function getChatById(params?: Props) {
  let query: any = {}
  if (params?.chatId)
    query.id = params.chatId;
  else return null;

  try {
    const chat = await prisma.chat.findFirst({
      where: query,
    });
    return chat;
  } catch (error: any) {
    throw new Error(error);
  }
}
