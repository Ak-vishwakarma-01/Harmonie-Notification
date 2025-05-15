/*
 * When a user sends a message, we need to publish that message out to other systems
 * the other systems are all connected to the same Redis server
 */

import { Redis } from "ioredis";
import { REDIS_URL } from "../config/index.js";

const subscriberClient = new Redis(REDIS_URL);

const CHANNEL_NAME = "chat:my_channel";

export async function pubsub3() {

    //Subscribes to the Redis channel called chat:my_channel.
    //subscriberClient listens for any messages sent to that channel.
    subscriberClient.subscribe(CHANNEL_NAME, (error) => {
        if (error) {
            console.error("Failed to subscribe", error);
        }
    });

    //When a message is received, it prints the message, channel name, and current timestamp.
    subscriberClient.on("message", (channel, message) => {
        console.log(`Got message "${message} on channel "${channel} "${new Date()}"`);
    });

    //Every 2 seconds, the publisherClient sends "Hello from publishers" to the chat:my_channel. Any client subscribed to this channel (like subscriberClient) will receive and log it.
    const publisherClient = new Redis(REDIS_URL);
    setInterval(() => {
        publisherClient.publish(CHANNEL_NAME, "Hello from publishers");
    }, 2_000);
    console.log("3rd publish finished");
}
