// src/notifications/producer2.ts
import { Queue } from 'bullmq';
import redisClient from '../config/bullredishConnecitons.js';

export const mySecondQueue = new Queue('mySecondQueue', {
  connection: redisClient,
});

export async function sendSecondJob(data: any) {
  await mySecondQueue.add('jobName2', data);
}
