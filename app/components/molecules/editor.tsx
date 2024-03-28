"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ImageUpload } from "@ckeditor/ckeditor5-image";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import FroalaEditor from "react-froala-wysiwyg";
import React, { useState } from "react";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Include the Froala Editor JS file.
import "froala-editor/js/plugins.pkgd.min.js";

const Editor = ({ value, onChange }: any) => {
  const [model, setModel] = useState(() => {
    return localStorage.getItem("savedText") || value;
  });

  return (
    <>
      {/* <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          ckfinder: {
            uploadUrl: "/api/v1/uploadImage",
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      /> */}

      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={(model: string) => {
          setModel(model);
          console.log(model);
        }}
        config={{
          placeHolderText: "Edit Your Content Here!",
          saveInterval: 2000,
          events: {
            "save.before": function (html: string) {
              localStorage.setItem("savedText", html);
            },
          },
          ImageUpload: true,
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
              ],
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "alignRight",
                "alignJustify",
              ],
            },
            moreRich: {
              buttons: [
                "insertLink",
                "insertImage",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "insertHR",
              ],
            },
          },
        }}
      />

      <button
        onClick={() => {
          navigator.clipboard.writeText(model);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        copy
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("savedText");
          setModel("");
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        reset
      </button>
    </>
  );
};

export default Editor;
