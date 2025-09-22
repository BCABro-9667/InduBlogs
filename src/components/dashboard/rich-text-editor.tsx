"use client";

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
    initialValue?: string;
    onChange: (content: string) => void;
    disabled?: boolean;
}

export function RichTextEditor({ initialValue, onChange, disabled }: RichTextEditorProps) {
  const handleEditorChange = (content: string, editor: any) => {
    onChange(content);
  };
  
  return (
    <Editor
      apiKey='p2yks470qo6wqku09s7bsqaqqnb9lgno6bgvbbsa42pezja1'
      init={{
        height: 500,
        menubar: false,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        content_style: 'body { font-family:Inter,sans-serif; font-size:16px }',
        directionality: 'ltr'
      }}
      initialValue={initialValue || "Start writing your amazing blog post here..."}
      onEditorChange={handleEditorChange}
      disabled={disabled}
    />
  );
}
