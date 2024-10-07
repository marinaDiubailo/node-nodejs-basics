import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourceFilePath = resolve(__dirname, 'files', 'fileToCompress.txt');
  const compressedFilePath = resolve(__dirname, 'files', 'archive.gz');

  try {
    await pipeline(
      createReadStream(sourceFilePath),
      createGzip(),
      createWriteStream(compressedFilePath),
    );
  } catch (e) {
    console.error(e);
  }
};

await compress();
