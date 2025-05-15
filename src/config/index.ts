import dotenv from 'dotenv'
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL as string;


import { Redis } from "ioredis";
const redis = new Redis(REDIS_URL);

(async function () {
  await redis.flushall();
})();


export default redis;