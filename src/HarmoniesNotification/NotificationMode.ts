import mongoose, { Document, Schema, Types } from "mongoose";

enum MessageType {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
  Reminder = "reminder",
  Message = "message",
  System = "system",
  ActionRequired = "action-required"
}

enum ChannelType {
  InApp = "in-app",
  Email = "email",
  Sms = "sms",
  Push = "push"
}

enum PriorityType {
  Low = "low",
  Normal = "normal",
  High = "high",
  Critical = "critical"
}

enum ActionType {
  Accept = "accept",
  Reject = "reject",
  View = "view",
  Custom = "custom"
}

interface IAction {
  label: string;
  actionType: ActionType;
  payload?: any;
}

interface ILink {
  url: string | null;
  label?: string | null;
  isExternal?: boolean;
}

export interface INotification extends Document {
  recipient?: Types.ObjectId;
  sender?: Types.ObjectId | null;

  recievermail?: string;
  sendermail?: string;

  type: MessageType;
  channels: ChannelType[];
  priority: PriorityType;

  title: string;
  message: string;

  link?: ILink;
  actions?: IAction[];

  metadata?: any;

  read: boolean;
  readAt?: Date;
  sent: boolean;
  sentAt?: Date;
  expiresAt?: Date;

  threadId?: Types.ObjectId | null;
  archived: boolean;
  dismissed: boolean;

  createdAt: Date;
  updatedAt: Date;

  markAsRead(): Promise<INotification>;
  markAsSent(): Promise<INotification>;
  dismiss(): Promise<INotification>;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    sender: { type: Schema.Types.ObjectId, ref: "User", default: null },

    recievermail: { type: String },
    sendermail: { type: String },

    type: {
      type: String,
      enum: Object.values(MessageType),
      default: MessageType.Info
    },

    channels: {
      type: [String],
      enum: Object.values(ChannelType),
      default: [ChannelType.InApp]
    },

    priority: {
      type: String,
      enum: Object.values(PriorityType),
      default: PriorityType.Normal
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    link: {
      url: { type: String, default: null },
      label: { type: String, default: null },
      isExternal: { type: Boolean, default: false }
    },

    actions: [
      {
        label: { type: String },
        actionType: { type: String, enum: Object.values(ActionType) },
        payload: Schema.Types.Mixed
      }
    ],

    metadata: {
      type: Schema.Types.Mixed,
      default: {}
    },

    read: { type: Boolean, default: false },
    readAt: { type: Date },

    sent: { type: Boolean, default: false },
    sentAt: { type: Date },

    expiresAt: { type: Date, default: null },

    threadId: {
      type: Schema.Types.ObjectId,
      ref: "Notification",
      default: null
    },

    archived: { type: Boolean, default: false },
    dismissed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

notificationSchema.methods.markAsRead = function () {
  this.read = true;
  this.readAt = new Date();
  return this.save();
};

notificationSchema.methods.markAsSent = function () {
  this.sent = true;
  this.sentAt = new Date();
  return this.save();
};

notificationSchema.methods.dismiss = function () {
  this.dismissed = true;
  return this.save();
};

export const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);
