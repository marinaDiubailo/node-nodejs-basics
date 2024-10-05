import { createReadStream } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
const { createHash } = await import('node:crypto');

const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const path = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const stream = createReadStream(path);
  const hash = createHash('sha256');

  try {
    await pipeline(stream, hash);

    const result = hash.digest('hex');
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

await calculateHash();
