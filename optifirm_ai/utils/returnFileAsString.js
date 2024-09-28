// const fs = require("fs") 

// fs.readFile('gpt/test_file.py', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// });

const getFileAsString = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export default getFileAsString;
// console.log(getFileAsString('gpt/test_file.py'))

describe('getFileAsString', () => {
  it('should read the file content as a string', async () => {
    const fileContent = 'Hello, world!';
    const file = new Blob([fileContent], { type: 'text/plain' });

    const result = await getFileAsString(file);
    expect(result).toBe(fileContent);
  });

  it('should reject with an error if the file cannot be read', async () => {
    const file = new Blob([], { type: 'text/plain' });

    // Mock FileReader to simulate an error
    const originalFileReader = global.FileReader;
    global.FileReader = jest.fn(() => ({
      readAsText: jest.fn(),
      onload: null,
      onerror: null,
      result: null,
      error: new Error('File read error'),
    }));

    await expect(getFileAsString(file)).rejects.toThrow('File read error');

    // Restore the original FileReader
    global.FileReader = originalFileReader;
  });
});