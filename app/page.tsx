import TypeWriterTitle from "@/components/TypeWriterTitle";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-rose-300 to-teal-300">
      <div className="grainy left-0 top-0 h-[100dvh] w-screen opacity-75"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="max-w-md text-center text-7xl font-semibold ">
          AI <span className="font-bold text-green-600">Note Taking</span>{" "}
          Assistant
        </h1>
        <div className="mt-4"></div>
        <h2 className="text-center text-3xl font-semibold text-slate-700">
          <TypeWriterTitle />
        </h2>
        <div className="mt-8"></div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-emerald-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
