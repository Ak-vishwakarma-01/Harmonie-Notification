import { notificationQueue } from './queue.js';
import { NotificationJobType } from './types.js';

export async function sendNotification(type: NotificationJobType, payload: any) {
  console.log("sendNotification Producer called", type, payload); 
  await notificationQueue.add(type, { type, payload });
  console.log("Login Notification Added", type, payload); 
}