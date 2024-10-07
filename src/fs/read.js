import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const filePath = resolve(__dirname, 'files', 'fileToRead.txt');

  try {
    const fileData = await readFile(filePath, { encoding: 'utf8' });
    console.log(fileData);
  } catch (e) {
    throw new Error(errorMessage);
  }
};

await read();
