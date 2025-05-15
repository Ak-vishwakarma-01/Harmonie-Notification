/*
 * We store users in JSON format with their ID as the key
 * write a function to fetch a user by their email address
 */
import client from "../config/index.js";

const users = Array.from({ length: 10 }, (_, i) => {
  return {
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
  };
});

// insert users
for (const user of users) {
  client.hset(`users:${user.id}`, user);
  
  client.set(`users_email_idx:${user.email}`, user.id);

  console.log("inserted user", user);
}

async function findUserByEmail(email:string) {
  const userId = await client.get(`users_email_idx:${email}`);

  const user = await client.hgetall(`users:${userId}`);

  return user;
}

export async function runFindBy() {
  console.time("findUserByEmail");

  const user = await findUserByEmail("user1@example.com");
  console.log("found the user", user);
  const user1 = await findUserByEmail("user2@example.com");
  console.log("found the user1", user1);
  const user2 = await findUserByEmail("user5@example.com");
  console.log("found the user2", user2);


  console.timeEnd("findUserByEmail");
}
