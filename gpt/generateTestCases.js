import OpenAI from "openai";
import fs from "fs/promises";

const openai = new OpenAI();


async function generateTestCases(fileName) {
    console.log("\x1b[32mGenerating test cases...\x1b[0m");

    const mockCode = fs.readFileSync(fileName, 'utf8');

    const promptForTestGeneration = `
        Given the code below (${fileName}):
        \`\`\`
        ${mockCode}\n
        \`\`\` 
        As well as the specification sheet given:
        \`\`\`
        ${getSpecSheet(path.join(__dirname, 'src', 'SpecSheet.pdf'))}
        \`\`\`
        
        Generate unit test cases, do not add additional explanation before generating the code, 
        all documentation should be done in the code itself.
        Ample documentation should be provided for each test case.
        simply return the test cases code in perfect formatting. Do not include "python\`\`\`" in front of the code.\n
    `;

    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: promptForTestGeneration },
    ];

    const response = await openai.createChatCompletion({
        model: 'gpt-4o',
        messages: messages
    });

    console.log(completion.choices[0]);

    return completion.choices[0].message.content;
}