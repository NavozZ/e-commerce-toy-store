const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'server', 'src', 'controllers');
const files = ['announcementController.js', 'categoryController.js', 'productController.js', 'orderController.js', 'cartController.js', 'authController.js'];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('asyncHandler')) continue;

  content = "const asyncHandler = require('../utils/asyncHandler');\n\n" + content;
  
  const regex = /exports\.([a-zA-Z0-9_]+)\s*=\s*async\s*\([^)]*\)\s*=>\s*\{/g;
  let match;
  let output = '';
  let lastIndex = 0;
  
  while ((match = regex.exec(content)) !== null) {
    output += content.slice(lastIndex, match.index);
    const startObj = match.index;
    const startBrace = match.index + match[0].length - 1;
    
    // add the asyncHandler wrapper
    output += match[0].replace(/async\s*\(/, 'asyncHandler(async (');
    
    let braceCount = 1;
    let i = startBrace + 1;
    while (i < content.length && braceCount > 0) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      i++;
    }
    
    // We found the matching closing brace at i-1
    output += content.slice(startBrace + 1, i);
    // Add the closing parenthesis for asyncHandler
    output += ')';
    
    lastIndex = i;
  }
  
  output += content.slice(lastIndex);
  fs.writeFileSync(filePath, output, 'utf8');
  console.log('Wrapped', file);
}
