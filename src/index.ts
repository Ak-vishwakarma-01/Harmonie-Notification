import { runCachingDemo } from "./problems/1-caching.js";
import { ratelimit } from "./problems/2-rate-limit.js";
import { pubsub3 } from "./problems/3-pubsub.js";
import { runFindBy } from "./problems/4-findby.js";
import { transaction5 } from "./problems/5-transactions.js";

// for problems
async function main() {
    // await runCachingDemo();
    // await ratelimit();
    // await pubsub3();
    // await runFindBy();
    await transaction5();
}

main();

// this is for notification 
// src/index.ts
import "./notifications/worker1.js";
import "./notifications/worker2.js";

import { sendFirstJob } from './notifications/producer1.js';
import { sendSecondJob } from './notifications/producer2.js';

(async () => {
    await sendFirstJob({ message: 'Job for first queue' });
    await sendSecondJob({ message: 'Job for second queue' });
    for (let i = 1; i <= 5; i++) {
        await sendFirstJob({ message: `Job ${i} for first queue` });
        await sendSecondJob({ message: `Job ${i} for second queue` });
    }
})();


export { workerFun } from "./HarmoniesNotification/workers/worker.js";
export {likeControllers , loginControllers} from "./HarmoniesNotification/ControlerNotification/index.js";