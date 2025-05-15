/*
 * We need to execute several operations on the Redis database
 */

import client from "../config/index.js";

export async function transaction5() {
  // Initially set key 'shouldFail' to a non-integer value
  await client.set("shouldFail", "notAnInteger");

  const pipeline = client.multi(); // The multi() method in Redis creates a transaction block — a group of commands that Redis will queue up and then execute together atomically (or at least in order).

  pipeline.set("key1", "value 1");
  pipeline.incr("shouldFail");
  pipeline.set("key2", "value 2");

  await pipeline.exec();

  const value1 = await client.get("key1");

  console.log("value 1: ", value1);
  console.log("value 2: ", await client.get("key2"));

  console.log("shouldFail value: ", await client.get("shouldFail"));
}
