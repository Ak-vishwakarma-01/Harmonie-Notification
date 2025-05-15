import dotenv from 'dotenv'

dotenv.config();

export const REDIS_URL = process.env.REDIS_URL as string ||  "rediss://default:AXnXAAIjcDFiYmMzMDQ1NjA2YjI0MmI3OWYzZWNlMGZjYzExNmMzNnAxMA@optimal-mutt-31191.upstash.io:6379";