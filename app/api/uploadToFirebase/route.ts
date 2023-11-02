import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes[0].imageUrl)
      return new NextResponse("No Image URL", { status: 404 });

    const firebaseUrl = await uploadFileToFirebase(
      notes[0].imageUrl,
      notes[0].name,
    );

    await db
      .update($notes)
      .set({
        imageUrl: firebaseUrl,
      })
      .where(eq($notes.id, parseInt(noteId)));

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
