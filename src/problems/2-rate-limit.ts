/*
 * the doSomeWork function is expensive to run and must be protected from abuse
 * throw an error if the function is called more than 5 times in a 5 second window
 */

// Redish connection -> flushed all
import client from "../config/index.js";

async function rateLimiter(userId:string, maxRequests:number, windowSizeInSeconds:number) {
  const key = `rate-limit:${userId}`;

  const current = await client   // hover on current. const current: [error: Error | null, result: unknown][] | null
        .multi()        // The multi() method in Redis creates a transaction block — a group of commands that Redis will queue up and then execute together atomically (or at least in order).
        .incr(key)      
        .expire(key, windowSizeInSeconds)  
        .exec();   

  if (!current || current.length === 0) {
    return false;
  }
  
  for (let i = 0; i < current.length; i++) {
    if (current[i][0]) {
      console.error("redis error", current[i][0]);
      return false;
    }
  }

  const requestCount = current[0][1] as number;

  if (requestCount > maxRequests) {
    return false;
  }

  return true;
}

async function doSomeWork() {
  const success = await rateLimiter("some-user", 5, 5);

  if (!success) {
    throw new Error("rate limit exceeded");
  }

  return "success";
}

export const ratelimit = async () => {
    for (let i = 0; i < 10; i++) {
        await doSomeWork()
            .then(() => console.log(`Request ${i} succeeded`))
            .catch((err) =>
                console.error(`Request ${i} failed with error: ${err.message}`)
            );
    }
    console.log("2nd rate limit finished");
}