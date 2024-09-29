// import fs from "fs/promises";
const {fs} = require("fs/promises") 

async function content(path) {  
    return await readFile(path, 'utf8')
  }
  
const text = content('./existing-file.txt')  
console.log(text)