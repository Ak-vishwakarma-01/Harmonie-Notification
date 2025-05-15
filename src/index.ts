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
