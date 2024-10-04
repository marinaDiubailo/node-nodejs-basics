import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { stdin, stdout } from 'node:process';

const transform = async () => {
  const transformer = new Transform({
    transform(chunk, enc, cb) {
      cb(null, chunk.toString().split('').reverse().join(''));
    },
  });

  try {
    await pipeline(stdin, transformer, stdout);
  } catch (e) {
    console.error(e);
  }
};

await transform();
