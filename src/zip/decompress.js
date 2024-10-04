import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const compressedFilePath = resolve(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = resolve(
    __dirname,
    'files',
    'fileToCompress.txt',
  );

  try {
    await pipeline(
      createReadStream(compressedFilePath),
      createGunzip(),
      createWriteStream(decompressedFilePath),
    );
  } catch (e) {
    console.error(e);
  }
};

await decompress();
