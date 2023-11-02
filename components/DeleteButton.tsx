"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  noteId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ noteId }) => {
  const router = useRouter();

  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", { noteId });
      return response.data;
    },
  });

  return (
    <Button
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to delete this note?",
        );
        if (!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            toast.success("Successfully deleted note.");
            router.push("/dashboard");
          },
          onError: () => {
            toast.error("Something went wrong.");
          },
        });
      }}
      size="sm"
      variant="destructive"
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;
