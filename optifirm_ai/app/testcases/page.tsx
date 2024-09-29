"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import generateTestCases from '@/gpt/generateTestCases';

export default function Home() {

  const code = Array.from({ length: 50 }, (_, i) => `print(${i + 1})`);

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchTestCases = async () => {
      await generateTestCases(setCurrentText);
    };
    fetchTestCases();
  }, []);


  return (
    <div className="h-full w-full flex py-8 items-center justify-center gap-32">

      <div className="flex-col flex w-2/3 h-full border border-slate-500 rounded-lg items-center">
        <p className="text-lg font-semibold text-white">Generated Test Cases</p>
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
            {currentText}
            </SyntaxHighlighter>
        </div>
      </div>

        <div className="flex h-full justify-center items-center gap-16 flex-col">
            <button 
            className='rounded-3xl py-4 text-2xl p-8 bg-red-500 text-white items-center flex justify-center'
            onClick={(e) => {
            e.preventDefault();
            window.location.reload();
            }}
            >
            Regenerate
            </button>
          <Link 
          href="code"
          className='rounded-3xl py-4 px-12 text-2xl bg-green-500 text-white items-center flex justify-center'
          >
            Approve
          </Link>
        </div>

      </div>
  );
}
