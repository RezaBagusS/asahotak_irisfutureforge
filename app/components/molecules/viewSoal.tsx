"use client";

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

interface PageProps {
  html: string
}

export default function Page({ html }: PageProps) {
  return <FroalaEditorView model={html} />;
}
