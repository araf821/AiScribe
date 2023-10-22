import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative and helpful AI assistant capable of generating eye-catching thumbnails for individual notes on a notes app. Your output will be fetched into the DALL-E text to image generation API to generate the thumbnail. The description should be minimalistic and flat-styled.",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description that best represents the title of my note. TITLE: ${name}`,
        },
      ],
    });

    const data = await response.json();
    const imageDescription = data.choices[0].message.content;
    return imageDescription as string;
  } catch (error) {
    console.log("IMAGE GENERATION PROMPT ERROR", error);
  }
}
