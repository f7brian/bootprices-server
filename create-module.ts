import fs from 'fs';
import path from 'path';

const moduleNames = process.argv.slice(2); // Get all arguments after the command

if (moduleNames.length === 0) {
  console.error('❌ Please provide at least one module name');
  process.exit(1);
}

moduleNames.forEach((moduleName) => {
  const lowerCaseName = moduleName.toLowerCase();
  const baseDir = path.join(__dirname, 'src', 'app', 'modules', moduleName); // keep original casing for folder

  const files = [
    `${lowerCaseName}.controller.ts`,
    `${lowerCaseName}.interface.ts`,
    `${lowerCaseName}.route.ts`,
    `${lowerCaseName}.service.ts`,
    `${lowerCaseName}.validation.ts`,
    `${lowerCaseName}.repository.ts`,
  ];

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`📁 Created directory: ${baseDir}`);
  }

  files.forEach((file) => {
    const filePath = path.join(baseDir, file);
    fs.writeFileSync(filePath, `// ${file}`, 'utf8');
    console.log(`📄 Created file: ${filePath}`);
  });
});
