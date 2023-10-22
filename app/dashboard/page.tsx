import CreateNoteModal from "@/components/modals/CreateNoteModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
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

        <h2 className="text-xl text-gray-500">You have no notes yet.</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          <CreateNoteModal />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
