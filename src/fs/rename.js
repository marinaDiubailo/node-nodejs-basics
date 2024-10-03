import { readdir, rename as renameFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const errorMessage = 'FS operation failed';
  const oldName = 'wrongFilename.txt';
  const newName = 'properFilename.md';
  const directoryPath = resolve(__dirname, 'files');
  const oldPath = resolve(directoryPath, oldName);
  const newPath = resolve(directoryPath, newName);

  const files = await readdir(directoryPath);

  if (!files.includes(oldName) || files.includes(newName)) {
    throw new Error(errorMessage);
  }

  await renameFile(oldPath, newPath);
};

await rename();
