import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const directoryPath = resolve(__dirname, 'files');

  try {
    const files = await readdir(directoryPath);
    console.log(files);
  } catch (e) {
    throw new Error(errorMessage);
  }
};

await list();
