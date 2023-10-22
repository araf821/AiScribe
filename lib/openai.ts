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
            "You are a creative and helpful AI assistant capable of generating eye-catching thumbnails for individual notes on a notes app. Your output will be fetched as a prompt into the DALL-E text to image generation API to generate the thumbnail. The prompt should be minimalistic and flat-styled, no realism, 2D.",
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

export async function generateImage(imageDescription: string) {
  try {
    const res = await openai.createImage({
      prompt: imageDescription,
      n: 1,
      size: "256x256",
    });

    const data = await res.json();
    console.log(data);

    const imageUrl = data.data[0].url;
    return imageUrl as string;
  } catch (error) {
    console.log("IMAGE GENERATION ERROR", error);
  }
}
