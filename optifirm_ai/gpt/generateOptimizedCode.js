require('dotenv').config();
const OpenAI = require("openai");
import { important } from "./important";
const openai = new OpenAI({
    apiKey: important
});


import { unoptimizedFileContent, specSheet, testCases } from "./src/mock_data";

// const unoptimizedFileContent = fs.readFile('gpt/src/unoptimized_firmware.py', 'utf8', function (err, data) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     // console.log(data);
// })

// const specSheet = fs.readFile('gpt/src/SpecSheet.txt', 'utf8', function (err, data) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     // console.log(data);
// })

// const testCases = fs.readFile('gpt/src/test_cases.py', 'utf8', function (err, data) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data);
// })

async function generateOptimizedCode(setOptimizedCode) {
    console.log("\x1b[32mOptimizing code...\x1b[0m");

    const unoptimizedCode = unoptimizedFileContent;
    const fileName = "unoptimized_code.py";

    const promptForOptimizingCode = `
        Given the code below (${fileName}):
        \`\`\`
        ${unoptimizedCode}\n
        \`\`\` 
        And the test cases below:\n
        \`\`\`
        ${testCases}\n
        \`\`\`
        As well as the specification sheet given:
        \`\`\`
        ${specSheet}
        \`\`\`

        Generate an optimized version of the code that adheres to the specification sheet 
        and passes the test cases provided. 
        Make sure to not include any explanation before generating the code.
        All documentation should be done in the code itself.
        Do not include "python\`\`\`" in front of the code.\n
    `;

    const messages = [
        { role: 'assistant', content: 'You are a code generator and a code optimizer, you only output code as your are instructed' },
        { role: 'user', content: promptForOptimizingCode },
    ];

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
            output += event.data.delta?.content[0]?.text.value;

            setOptimizedCode(output);
            // console.log(output)
        }

        else if (event.event === 'thread.message.completed') {
            console.log("Thread completed");
            console.log(event.data.content[0].text.value);
            setOptimizedCode(event.data.content[0].text.value);
            break;
        }
    }
}

generateOptimizedCode('gpt/src/unoptimized_firmware.py');