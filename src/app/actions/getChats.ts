import prisma from '@/lib/prismadb'

type Props = {
  userId?: string;
}

export default async function getChats(params?: Props) {
  let query: any = {}
  if (params?.userId)
    query.userId = params.userId;
  else return [];

  try {
    const listings = await prisma.chat.findMany({
      where: params,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;

  } catch (error: any) {
    throw new Error(error);
  }
}