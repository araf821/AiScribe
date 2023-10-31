"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { toast } from "sonner";
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";

interface EditorProps {
  note: NoteType;
}

const Editor: FC<EditorProps> = ({ note }) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`,
  );

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt =
            "..." + this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
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

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const lastCompletion = useRef("");

  useEffect(() => {
    if (!completion || !editor) return;
    console.log(completion);

    const diff = completion.slice(lastCompletion.current.length > 0 ? lastCompletion.current.length : 0);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff.replace("...", ""));
  }, [completion, editor]);

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
