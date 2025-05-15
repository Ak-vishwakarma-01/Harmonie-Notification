import dotenv from 'dotenv'
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL as string;


import { Redis } from "ioredis";
const Redisclient = new Redis(REDIS_URL,{
  maxRetriesPerRequest:null,
});

// (async function () {
//   await client.flushall();
// })();


export default Redisclient;