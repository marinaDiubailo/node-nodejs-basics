import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdout } from 'node:process';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const path = resolve(__dirname, 'files', 'fileToRead.txt');

  const stream = createReadStream(path, {
    encoding: 'utf-8',
  });

  try {
    await pipeline(stream, stdout);
  } catch (e) {
    console.error(e);
  }
};

await read();
