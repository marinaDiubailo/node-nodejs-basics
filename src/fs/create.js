import { writeFile, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const contentText = 'I am fresh and young';
  const errorMessage = 'FS operation failed';
  const directoryPath = resolve(__dirname, 'files');
  const fileName = 'fresh.txt';

  const files = await readdir(directoryPath);

  if (!files || files.includes(fileName)) {
    throw new Error(errorMessage);
  }

  await writeFile(resolve(directoryPath, fileName), contentText);
};

await create();
