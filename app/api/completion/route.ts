import { OpenAIApi, Configuration } from "openai-edge";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
              The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
          AI is a well-behaved and well-mannered individual.
          AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
        },
        {
          role: "user",
          content: `
          I am writing a piece of text in a notion text editor app.
          Help me complete my train of thought here: ##${prompt}##
          keep the tone of the text consistent with the rest of the text.
          keep the response short and sweet. Your exact response would be added on next to whatever thought I have provided, without including the portion that I already have specified. So, please only provide the text that would come after the thought I have provided.
          `,
        },
      ],
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("AI COMPLETION ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
