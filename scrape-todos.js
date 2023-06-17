const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'C:\\Users\\olen\\Documents\\Code\\chatgpt-app\\src'); // Replace 'src' with your actual source code directory

const todos = [];

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      traverseDirectory(filePath);
    } else if (stats.isFile() && path.extname(filePath) === '.jsx') {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const todoRegex = /\/\/\s*TODO:\s*(.*)/g;
      let match;
      while ((match = todoRegex.exec(fileContent))) {
        todos.push({
          file: filePath,
          todo: match[1],
        });
      }
    }
  }
};

traverseDirectory(rootDir);

const mdContent = todos
  .map((todo) => `- [ ] **${path.relative(rootDir, todo.file)}**: ${todo.todo}`)
  .join('\n');

const outputFilePath = path.resolve(__dirname, 'todos.md'); // Replace 'todos.md' with your desired output file path
fs.writeFileSync(outputFilePath, mdContent, 'utf8');

console.log(`TODOs scraped and saved to ${outputFilePath}`);
