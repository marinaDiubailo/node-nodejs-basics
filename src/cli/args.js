import { argv } from 'node:process';

const parseArgs = () => {
  const result = [];
  const [executor, file, ...args] = argv;

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].substring(2);
    const value = args[i + 1];
    result.push(`${propName} is ${value}`);
  }

  console.log(result.join(', '));
};

parseArgs();
