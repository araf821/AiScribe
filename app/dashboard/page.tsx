import CreateNoteModal from "@/components/modals/CreateNoteModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = async () => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <div className="grainy min-h-screen">
      <div className="mx-auto max-w-7xl p-10">
        <div className="h-14"></div>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center">
            <Link href="/">
              <Button className="bg-green-600 hover:bg-emerald-700" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="w-4"></div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        <div className="h-8"></div>
        <Separator />
        <div className="h-8"></div>

        {notes.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          <CreateNoteModal />
          {notes.map((note) => (
            <a key={note.id} href={`/notes/${note.id}`}>
              <div className="flex flex-col overflow-hidden rounded-md border-stone-200 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src={note.imageUrl || ""}
                  width={400}
                  height={200}
                  alt={note.name || "Note Name"}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {note.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
