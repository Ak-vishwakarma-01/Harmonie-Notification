import dotenv from 'dotenv'
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL as string;


import { Redis } from "ioredis";
const client = new Redis(REDIS_URL);

(async function () {
  await client.flushall();
})();


export default client;