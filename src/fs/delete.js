import { rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const remove = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const filePath = resolve(__dirname, 'files', 'fileToRemove.txt');

  try {
    await rm(filePath);
  } catch (e) {
    throw new Error(errorMessage);
  }
};

await remove();
