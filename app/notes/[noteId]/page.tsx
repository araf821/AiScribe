import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

const NotePage = async ({ params }: { params: { noteId: string } }) => {
  const { userId } = auth();
  const { noteId } = params;

  if (!userId) {
    return redirect("/");
  }

  const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (!notes.length) {
    return redirect("/dashboard");
  }

  const currentNote = notes[0];

  return (
    <div className="grainy min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center rounded-lg border border-stone-200 p-4 shadow-xl">
          <Link href="/dashboard">
            <Button size="sm" className="bg-green-600 hover:bg-emerald-700">
              Back
            </Button>
          </Link>
          <span className="ml-3 font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="mx-1 inline-block">/</span>
          <span className="font-semibold text-stone-500">
            {currentNote.name}
          </span>
          <div className="ml-auto">Delete</div>
        </div>

        <div className="h-4"></div>
        <div className="w-full rounded-lg border border-stone-200 px-16 py-8 shadow-xl">
          {/* Editor */}
        </div>
      </div>
    </div>
  );
};
export default NotePage;
