const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 3) {
  // eslint-disable-next-line no-console
  console.error('file-compose [folder...] [ext] [output]');
  process.exit(1);
}

const folders = args.slice(0, -2);
const [extension, output] = args.slice(-2);

if (fs.existsSync(output)) {
  fs.truncateSync(output, 0);
}

folders.forEach((folder) => {
  fs.readdirSync(folder).forEach((file) => {
    if (file.endsWith(extension)) {
      fs.appendFileSync(output, fs.readFileSync(path.join(folder, file)));
    }
  });
});
