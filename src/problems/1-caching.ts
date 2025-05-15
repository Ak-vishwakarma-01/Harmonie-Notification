/*
 * The fetch data function is slow and we need it to be really fast
 * reduce the calls to the network and make the function faster
 */

import { Redis } from "ioredis";
import { REDIS_URL } from "../config/index.js";

const client = new Redis(REDIS_URL); // connecting upstash redish

(async function () {
  await client.flushall(); // clear upstash 
})();

async function fetchData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");

  const data = await response.json();

  return data;
}


async function fetchWithCache(fetchFn: typeof fetchData, key: string) {
  const cacheData = await client.get(key);

  if(cacheData) {
    return JSON.parse(cacheData);
  }

  const data = await fetchData();
  await client.set(key, JSON.stringify(data));

  return data;
}

async function main() {
  console.time("fetchData");
  await fetchWithCache(fetchData, "pokemon"); // this one will be slower
  console.timeEnd("fetchData");
  console.time("fetchData again");
  await fetchWithCache(fetchData, "pokemon");
  console.timeEnd("fetchData again");
  console.time("fetchData again");
  await fetchWithCache(fetchData, "pokemon");
  console.timeEnd("fetchData again");
}


// Export the main function instead:
export async function runCachingDemo() {
  await main();
}
