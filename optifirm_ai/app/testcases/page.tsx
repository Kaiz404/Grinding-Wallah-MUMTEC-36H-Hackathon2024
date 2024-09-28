"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Home() {

  const code = Array.from({ length: 50 }, (_, i) => `print(${i + 1})`);

  return (
    <div className="h-full w-full flex py-8 items-center justify-center gap-32">

      <div className="flex-col flex w-1/3 h-full border border-slate-500 rounded-lg items-center">
        <p className="text-lg font-semibold text-white">Old Code</p>
        <div className="flex w-full h-full overflow-auto">
            <SyntaxHighlighter 
            language="python" 
            style={darcula} 
            customStyle={{
            width: "100%", 
            maxHeight: "100%", 
            overflow: "auto", 
            whiteSpace: "pre-wrap",
            fontSize: "1.2em"
            }}
            >
            {code.join("\n")}
            </SyntaxHighlighter>
        </div>
      </div>

      <div className="flex-col flex w-1/3 h-full border border-slate-500 rounded-lg items-center">
        <p className="text-lg font-semibold text-white">New Code</p>
        <div className="flex w-full h-full overflow-auto">
        <SyntaxHighlighter 
            language="python" 
            style={darcula} 
            customStyle={{
            width: "100%", 
            maxHeight: "100%", 
            overflow: "auto", 
            whiteSpace: "pre-wrap",
            fontSize: "1.2em"
            }}
            >
            {code.join("\n")}
            </SyntaxHighlighter>
        </div>
      </div>

    </div>
  );
}
