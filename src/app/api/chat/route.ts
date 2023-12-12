import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import axios from "axios";

// Comment out the following line since prisma does not work in edge runtime
// export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { messages, selectedRecipe } = await req.json();
    // const [similarRecipes, setSimilarRecipes] = useState([]);
    // const [selectedRecipe, setSelectedRecipe] = useState(null);
    console.log('messages', messages)
    const lastMessage = messages[messages.length - 1];
    console.log('lastMessage', lastMessage)

    const result = await axios.post('https://vectordbserver-468abb35481d.herokuapp.com/', {
      message: lastMessage.content,
    })

    if (!selectedRecipe) {
      return NextResponse.json({ status: 'recipe not selected yet', recipes: result.data }, { status: 200 });
    }

    let context = result.data[0];
    if (!context || context === '' || context.length < 10) {
      return NextResponse.json({ error: "context not found" }, { status: 404 });
    }

    // console.log('context', context.page_content)

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence for recipes.
      Don't justify your answers. Don't give information not mentioned in the CONTEXT BLOCK.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      This recipe assistant will give the answer from the recipe context.

      START CONTEXT BLOCK
      "${context.page_content}"
      END OF CONTEXT BLOCK
      
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "Özür dilerim bu sorunuza cevap veremiyorum".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };

    console.log('prompt', prompt.content)

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}