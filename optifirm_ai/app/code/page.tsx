"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useState, useEffect } from 'react';
import { testCases, specSheet, unoptimizedFileContent } from '@/gpt/src/mock_data';
import generateOptimizedCode from '@/gpt/generateOptimizedCode';

export default function Home() {

  const code = Array.from({ length: 50 }, (_, i) => `print(${i + 1})`);

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  
  useEffect(() => {
    const fetchTestCases = async () => {
      await generateOptimizedCode(setCurrentText);
    };
    fetchTestCases();
  }, []);


  return (
    <div className="h-full w-full flex py-8 items-center justify-center gap-32">

      <div className="flex-col flex w-2/5 h-full border border-slate-500 rounded-lg items-center">
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
            fontSize: "1em"
            }}
            >
            {unoptimizedFileContent}
            </SyntaxHighlighter>
        </div>
      </div>

      <div className="flex-col flex w-2/5 h-full border border-slate-500 rounded-lg items-center">
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
            fontSize: "1em"
            }}
            >
            {currentText}
            </SyntaxHighlighter>
        </div>

        <div className='fixed bottom-8 right-12 w-fit flex-col items-end justify-end flex gap-4'>
          <button 
          className='rounded-3xl py-4 text-2xl px-7 bg-red-500 text-white items-center flex justify-center'
          >
            Reject
          </button>
          <button 
          className='rounded-3xl py-4 px-4 text-2xl bg-green-500 text-white items-center flex justify-center'
          >
            Approve
          </button>
        </div>

      </div>

    </div>
  );
}
