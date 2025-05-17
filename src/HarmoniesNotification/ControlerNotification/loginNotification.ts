import { sendNotification } from "../producer.js";

export const loginControllers = async (email: String) => {   
    console.log("loginControllers called", email); 
    await sendNotification('login', {
      email: email,
      timestamp: Date.now(),
    });
}
