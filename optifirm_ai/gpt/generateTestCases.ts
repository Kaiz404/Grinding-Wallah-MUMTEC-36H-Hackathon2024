require('dotenv').config({ path: 'optifirm_ai/.env' });
import OpenAI from "openai";
import * as fs from 'fs';

import { unoptimizedFileContent, specSheet } from "./src/mock_data";


// const unoptimizedFileContent = fs.readFile('optifirm_ai/gpt/src/unoptimized_firmware.py', 'utf8', function (err, data) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data);
// })

// const specSheet = fs.readFile('optifirm_ai/gpt/src/SpecSheet.txt', 'utf8', function (err, data) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data);
// })

export async function generateTestCases(setTestCases) {
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
        throw new Error('The OPENAI_API_KEY environment variable is missing or empty.');
    }
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    

    console.log("\x1b[32mGenerating test cases...\x1b[0m");

    const unoptimizedCode = unoptimizedFileContent;
    const fileName = "unoptimized_code.py";

    const promptForTestGeneration = `
        Given the code below (${fileName}):
        \`\`\`
        ${unoptimizedCode}\n
        \`\`\` 
        As well as the specification sheet given:
        \`\`\`
        ${specSheet}
        \`\`\`
        
        Generate unit test cases, do not add additional explanation before generating the code, 
        all documentation should be done in the code itself.
        Ample documentation should be provided for each test case.
        simply return the test cases code in perfect formatting. Do not include "python\`\`\`" in front of the code.\n
    `;

    const messages = [
        { role: 'assistant', content: 'You are a code generator and a code optimizer, you only output code as your are instructed' },
        { role: 'user', content: promptForTestGeneration },
    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages
    });


    const stream = await openai.beta.threads.createAndRun({
        assistant_id: "asst_H5alqRIP77iT3ZA21RdN6MjL",
        thread: {
          messages: messages,
        },
        stream: true
    });

    var output = "";
  
    for await (const event of stream) {
        console.log(event);
        if (event.data.delta?.content[0]?.text.value) {
            // output += event.data.delta?.content[0]?.text.value;

            setTestCases((prevCode: any) => prevCode + event.data.delta?.content[0]?.text.value;);
            // console.log(output)
        }

        else if (event.event === 'thread.message.completed') {
            console.log("Thread completed");
            console.log(event.data.content[0].text.value);
            setTestCases(event.data.content[0].text.value);
            break;
        }
    }
}