import { generateImagePrompt } from "@/lib/openai";
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
    console.log(imageDescription);
    return new NextResponse("Okay");
  } catch (error) {
    console.log("POST CREATION ERROR\n", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
