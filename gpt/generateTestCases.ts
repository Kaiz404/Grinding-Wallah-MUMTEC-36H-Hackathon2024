require('dotenv').config();
const OpenAI = require("openai");
const fs = require("fs");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const unoptimizedFileContent = fs.readFile('gpt/src/unoptimized_firmware.py', 'utf8', function (err, data) {
    if (err) {
        console.error(err)
        return
    }
    console.log(data);
})

const specSheet = fs.readFile('gpt/src/SpecSheet.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err)
        return
    }
    console.log(data);
})

async function generateTestCases(setTestCases) {
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
            output += event.data.delta?.content[0]?.text.value;

            setTestCases(output);
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

generateTestCases('gpt/src/unoptimized_firmware.py');