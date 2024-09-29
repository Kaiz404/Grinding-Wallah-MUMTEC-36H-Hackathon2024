const fs = require("fs") 

const getFileAsString = (file_name) => {
    fs.readFile(file_name, 'utf8', (err, data) => {
      if (err) {
          console.error(err)
          return
      }
      console.log(data)
  });
}
module.exports = { getFileAsString };

// export const getFileAsString = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = () => reject(reader.error);
//     reader.readAsText(file);
//   });
// }

// console.log(getFileAsString('gpt/src/test_file.py'))

