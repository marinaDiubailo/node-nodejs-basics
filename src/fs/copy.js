import { cp, readdir, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const directoryPath = resolve(__dirname, 'files');
  const copyDirectoryPath = resolve(__dirname, 'files_copy');

  try {
    await readdir(directoryPath);
  } catch (e) {
    throw new Error(errorMessage);
  }

  try {
    await readdir(copyDirectoryPath);
    throw new Error(errorMessage);
  } catch (e) {}

  await mkdir(copyDirectoryPath);

  await cp(directoryPath, copyDirectoryPath, { recursive: true });
};

await copy();
