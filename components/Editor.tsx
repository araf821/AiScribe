"use client";

import { FC, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";

interface EditorProps {}

const Editor: FC<EditorProps> = ({}) => {
  const [editorState, setEditorState] = useState("");

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debouncedEditorState = useDebounce(editorState, 3000);

  useEffect(() => {
    // Save current content to database

  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <EditorToolbar editor={editor} />}
        <Button>Saved</Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Editor;
