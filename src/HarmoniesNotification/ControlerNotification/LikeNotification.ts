import { sendNotification } from "../producer.js";

interface LikeDetails {
  likerEmail: string;
  likedUserEmail: string;
  postId: string;
}

export async function likeControllers(details: LikeDetails) {
    await sendNotification('like', {
    likerEmail: details.likerEmail,
    likedUserEmail: details.likedUserEmail,
    postId: details.postId,
    timestamp: Date.now(),
  });
}


