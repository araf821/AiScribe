import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const bawdee = await req.json();

    const { noteId, content } = bawdee;

    if (!noteId || !content) {
      return new NextResponse("NoteID or Content is missing", { status: 400 });
    }

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes.length) {
      return new NextResponse("Note not found.", { status: 404 });
    }

    if (notes[0].editorState !== content) {
      await db
        .update($notes)
        .set({
          editorState: content,
        })
        .where(eq($notes.id, parseInt(noteId)));
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("NOTE SAVING ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
