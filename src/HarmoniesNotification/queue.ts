import { Queue } from 'bullmq';
import { BaseNotificationJob } from './types.js';
import RedisConnection from './config/redish.js';

console.log("Queue has been made");
export const notificationQueue = new Queue<BaseNotificationJob>('notifications', {
  connection: RedisConnection,
});
