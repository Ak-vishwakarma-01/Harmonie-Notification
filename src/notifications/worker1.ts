// src/notifications/worker1.ts
import { Worker } from 'bullmq';
import redisClient from '../config/bullredishConnecitons.js';

export const myFirstWorker = new Worker('myFirstQueue', async job => {
  console.log('👷 Processing job in myFirstQueue:', job.data);
}, {
  connection: redisClient,
  
});
