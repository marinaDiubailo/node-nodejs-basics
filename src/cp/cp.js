import { spawn } from 'node:child_process';
import { stdin, stdout, exit } from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream';

const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToScript = join(__dirname, 'files', 'script.js');
  const childProcess = spawn('node', [pathToScript, ...args]);

  pipeline(stdin, childProcess.stdin, (err) => {
    if (err) {
      console.error(err);
      exit(1);
    }
  });

  pipeline(childProcess.stdout, stdout, (err) => {
    if (err) {
      console.error(err);
      exit(1);
    }
  });

  stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === 'CLOSE') {
      exit(0);
    }
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
