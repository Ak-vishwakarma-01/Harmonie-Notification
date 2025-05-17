import { Worker } from 'bullmq';
import RedisConnection from '../config/redish';
import { BaseNotificationJob } from '../types';
import { handleLogin } from '../handelers/loginhandler';
import { handleLike } from '../handelers/likeHandelers';

let notificationModel:any = null;

const loginBatch: any[] = [];
const likeBatch: any[] = [];
let loginTimer: NodeJS.Timeout | null = null;
let likeTimer: NodeJS.Timeout | null = null;

function flushLoginBatch() {
  if (loginBatch.length > 0) {
    // Pass NotificationModel as second argument
    handleLogin([...loginBatch], notificationModel);
    loginBatch.length = 0;
    if (loginTimer) {
      clearTimeout(loginTimer);
      loginTimer = null;
    }
  }
}

function flushLikeBatch() {
  if (likeBatch.length > 0) {
    // Pass NotificationModel as second argument
    handleLike([...likeBatch], notificationModel);
    likeBatch.length = 0;
    if (likeTimer) {
      clearTimeout(likeTimer);
      likeTimer = null;
    }
  }
}

export async function workerFun(newNotificationModel: any) {
  notificationModel = newNotificationModel;
  console.log('worker is running now:-')
  const worker = new Worker<BaseNotificationJob>(
    'notifications',
    async job => {
      const { type, payload } = job.data;

      switch (type) {
        case 'login':
          loginBatch.push(payload);
          if (loginBatch.length === 2) {
            flushLoginBatch();
          } else if (!loginTimer) {
            loginTimer = setTimeout(flushLoginBatch, 60000);
          }
          break;
        case 'like':
          likeBatch.push(payload);
          if (likeBatch.length === 2) {
            flushLikeBatch();
          } else if (!likeTimer) {
            likeTimer = setTimeout(flushLikeBatch, 60000);
          }
          break;
        default:
          console.warn(`No handler for notification type: ${type}`);
      }
    },
    {
      connection: RedisConnection,
      // concurrency: 10,
    }
  );

  worker.on('completed', job => {
    console.log(`Processed ${job.name} (${job.id})`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Failed ${job?.name} (${job?.id}):`, err);
  });

}

