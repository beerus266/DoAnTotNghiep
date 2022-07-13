import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
}
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	// loading: () => <p>Loading ...</p>,
});

export default function TextEditor({ html, setHtml}) {

    // const [html, setHtml] = useState('<b>1231</b>');

    // useEffect(() => {
    //     console.log(html);
    // }, [html]);
    return <QuillNoSSRWrapper  theme="snow" modules={modules} formats={formats} value={html} onChange={(html) => setHtml(html)}/>
}