import { Queue } from 'bullmq';
import RedisConnection from './config/redish.js';
import { BaseNotificationJob, NotificationJobType } from './types.js';

const notificationQueue = new Queue<BaseNotificationJob>('notifications', {
  connection: RedisConnection,
});

export async function cleanJobs(type: NotificationJobType) {
  const completed = await notificationQueue.getCompleted();
  
  for (const job of completed) {
    if (job.data.type === type) {
      await job.remove(); 
      console.log(`Deleted ${type} job ${job.id}`);
    }
  }
}