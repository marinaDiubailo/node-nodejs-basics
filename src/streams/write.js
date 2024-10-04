import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin } from 'node:process';

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const path = resolve(__dirname, 'files', 'fileToWrite.txt');

  const stream = createWriteStream(path);

  try {
    await pipeline(stdin, stream);
  } catch (e) {
    console.error(e);
  }

  stream.on('finish', () => {
    console.log('Done');
  });
};

await write();
