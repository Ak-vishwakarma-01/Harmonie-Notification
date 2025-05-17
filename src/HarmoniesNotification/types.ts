export type NotificationJobType = 'login' | 'like' | 'comment';

export interface BaseNotificationJob {
  type: NotificationJobType;
  payload: any; // Extend based on type
}
