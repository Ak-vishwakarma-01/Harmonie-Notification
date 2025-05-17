import { REDIS_URL } from "../../config/bullredishConnecitons.js";

import { Redis } from "ioredis";

const RedisConnection = new Redis(REDIS_URL,{
  maxRetriesPerRequest:null,
});

// (async function () {
//   await RedisConnection.flushall();
//   console.log("flusehd the redis Connection");
// })();

export default RedisConnection;