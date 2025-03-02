import dotenv from 'dotenv';
import { resolve } from 'path';

/**
 * Load environment variables from .env file
 * Uses current working directory to find the .env file
 */
export function getEnv() {
  const projectRoot = process.cwd();
  const envPath = resolve(projectRoot, '.env');

  const envConfig = {
    path: envPath,
  };

  dotenv.config(envConfig);
}
