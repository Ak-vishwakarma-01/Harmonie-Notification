// src/notifications/producer1.ts
import { Queue } from 'bullmq';
import redisClient from '../config/bullredishConnecitons.js';

export const myFirstQueue = new Queue('myFirstQueue', {
  connection: redisClient,
});

export async function sendFirstJob(data: any) {
  await myFirstQueue.add('jobName1', data);
}
