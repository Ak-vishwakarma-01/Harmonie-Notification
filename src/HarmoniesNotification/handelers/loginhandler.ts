export async function handleLogin(payload: any, NotificationModel: any) {
  const loginDetails: any[] = payload;

  const notifications = loginDetails.map((detail: any) => ({
    recievermail: detail.email,
    sendermail: detail.email || null,
    type: "system",                   
    channels: ["in-app"],            
    priority: "low",                 
    title: "Login Alert",
    message: `You logged in at ${new Date(detail.timestamp).toLocaleString()}.`,
    metadata: {
      timestamp: detail.timestamp,
    },
    read: false,
    sent: true,
    sentAt: new Date(),
    archived: false,
    dismissed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
  }));

  if (notifications.length > 0) {
    await NotificationModel.insertMany(notifications);
    console.log(`[Login] Inserted ${notifications.length} login to notificationModel`);
  } else {
    console.log("[Login] No login notifications to insert");
  }
}
