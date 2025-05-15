// src/notifications/worker2.ts
import { Worker } from 'bullmq';
import redisClient from '../config/bullredishConnecitons.js';

export const mySecondWorker = new Worker('mySecondQueue', async job => {
  console.log('👷 Processing job in mySecondQueue:', job.data);
}, {
  connection: redisClient,
});
