import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = body;

    const imageDescription = await generateImagePrompt(name);
    if (!imageDescription) {
      return new NextResponse("Error generating an image generation prompt.", {
        status: 500,
      });
    }

    const imageUrl = await generateImage(imageDescription);

    if (!imageUrl) {
      return new NextResponse("Error generating an image.", {
        status: 500,
      });
    }

    const note = await db
      .insert($notes)
      .values({
        name,
        userId,
        imageUrl,
      })
      .returning({
        id: $notes.id,
      });

    return NextResponse.json({ noteId: note[0].id });
  } catch (error) {
    console.log("POST CREATION ERROR\n", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
