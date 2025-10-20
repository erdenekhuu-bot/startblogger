"use client";
import CkEditor from "@/components/CKEditor";
import { useState } from "react";

const Editor: React.FC = () => {
  const [editorData, setEditorData] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <CkEditor
        editorData={editorData}
        setEditorData={setEditorData}
        handleOnUpdate={handleOnUpdate}
      />
      <div className="text-black" dangerouslySetInnerHTML={{__html: data}} />
    </div>
  );
};

export default Editor;