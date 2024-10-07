import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const createWorker = (workerData) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToWorker = join(__dirname, 'worker.js');
  return new Worker(pathToWorker, {
    workerData,
  });
};

const performCalculations = async () => {
  const numberOfCPUs = cpus().length;
  const resultData = [];

  for (let i = 0; i < numberOfCPUs; i++) {
    const promise = new Promise((resolve) => {
      const worker = createWorker(10 + i);
      worker.on('message', (result) => {
        resultData.push({ status: 'resolved', data: result });
        resolve();
      });
      worker.on('error', () => {
        resultData.push({ status: 'error', data: null });
        resolve();
      });
    });
    await promise;
  }

  console.log(resultData);
};

await performCalculations();
