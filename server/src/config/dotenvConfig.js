import dotenv from 'dotenv';
import { resolve } from 'path';

export function getEnv() {
  const projectRoot = process.cwd();
  const envPath = resolve(projectRoot, '.env');

  const envConfig = {
    path: envPath,
  };

  dotenv.config(envConfig);
}
