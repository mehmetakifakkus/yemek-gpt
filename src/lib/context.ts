import { Pinecone } from "@pinecone-database/pinecone"
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = pinecone.Index('chatpdf');

  try {
    const namespace = convertToAscii(fileKey);
    const results = await index.namespace(namespace).query({
      topK: 7,
      vector: embeddings,
      includeMetadata: true,
    });
    return results.matches || [];
  } catch (error) {
    console.log('error querying pinecone', error)
  }
}

export async function getContext(query: string, fileKey: string) {

  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifiedMatches = matches?.filter((match) => {
    return match.score && match.score > 0.5;
  });

  type Metadata = {
    pageNumber: number;
    text: string;
  }

  let docs = qualifiedMatches?.map((match) => (match.metadata as Metadata).text);

  return docs?.join('\n').substring(0, 3000);
}