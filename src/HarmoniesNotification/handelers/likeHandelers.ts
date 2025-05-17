export async function handleLike(payload: any, NotificationModel: any) {
  const likeDetails: any[] = payload;

  const notifications = likeDetails.map((likeDetail) => {
    const { likerEmail, likedUserEmail, postId, timestamp } = likeDetail;

    return {
      recievermail: likedUserEmail,
      sendermail: likerEmail,
      type: "message",                
      channels: ["in-app"],           
      priority: "normal",              
      title: "Someone liked your post",
      message: `${likerEmail} liked your post.`,
      metadata: {
        postId,
        timestamp,
      },
      read: false,
      sent: true,
      sentAt: new Date(),
      archived: false,
      dismissed: false,
    };
  });
   
  console.log("Added data in NotificaionModels");
  await NotificationModel.insertMany(notifications);

  console.log(`[Like] Inserted ${notifications.length} like notifications`);
}
