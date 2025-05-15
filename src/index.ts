import { runCachingDemo } from "./problems/1-caching.js";
import { ratelimit } from "./problems/2-rate-limit.js";
import { pubsub3 } from "./problems/3-pubsub.js";
import { runFindBy } from "./problems/4-findby.js";
import { transaction5 } from "./problems/5-transactions.js";
async function main() {
    // await runCachingDemo();
    // await ratelimit();
    // await pubsub3();
    // await runFindBy();
    await transaction5();
}

main();