"use client";

import { FC, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { toast } from "sonner";

interface EditorProps {
  note: NoteType;
}

const Editor: FC<EditorProps> = ({ note }) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`,
  );

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/notes/save", {
        noteId: note.id,
        content: editorState,
      });

      return res.data;
    },
  });

  const debouncedEditorState = useDebounce(editorState, 3000);

  useEffect(() => {
    if (debouncedEditorState === "") return;

    saveNote.mutate(undefined, {
      onSuccess: () => {
        toast.success("Saved changes!");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Post could not be saved");
      },
    });
    // Save current content to database
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <EditorToolbar editor={editor} />}
        <Button variant="outline" disabled className="ml-auto">
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Editor;
