"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface CreateNoteModalProps {}

const CreateNoteModal: FC<CreateNoteModalProps> = ({}) => {
  const [input, setInput] = useState("");

  const createNote = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/notes", {
        name: input,
      });
      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      return alert("please");
    }

    createNote.mutate(undefined, {
      onSuccess: () => {
        console.log("sucess૟");
      },
      onError: () => {
        console.log("Erriru");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-full flex-row items-center justify-center rounded-lg border-2 border-dashed border-green-600 p-4 transition hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-lg sm:flex-col">
          <Plus className="h-6 w-6 text-green-600" strokeWidth={2} />
          <h2 className="font-semibold text-green-600 sm:mt-2">New Note</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Create a new note by entering the name below!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Notes for..."
          />
          <div className="flex items-center gap-2">
            <DialogClose>
              <Button type="reset" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button className="bg-green-600 hover:bg-emerald-700">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteModal;
