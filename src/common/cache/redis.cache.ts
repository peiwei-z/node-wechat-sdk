/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by:   peiwei.zhu
 * @Last Modified time: 2022-05-08 18:26:14
 */

import Redis from "ioredis";
import Config from "../../config";
import { CacheBase } from "./base.cache";

export const redisClient = new Redis(
  parseInt(Config.REDIS_PORT, 10),
  Config.REDIS_HOST,
  {
    password: Config.REDIS_PASSWORD,
    db: Config.REDIS_DB ? parseInt(Config.REDIS_DB, 10) : 1,
    keyPrefix: Config.APP_NAME,
  }
);
export class RedisCache extends CacheBase {
  readonly redis: Redis;
  constructor() {
    super();
    this.redis = redisClient;
  }
  async set(key: string, data: any, ttl: number): Promise<any> {
    if (!ttl && Number.isNaN(ttl)) {
      ttl = 60;
    }
    const dataStr = JSON.stringify(data);
    return this.redis.set(key, dataStr, "EX", ttl);
  }

  async get(key: string): Promise<any> {
    const result = await this.redis.get(key);
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  }

  async del(key: string) {
    if (!key) {
      return 0;
    }
    return this.redis.del(key);
  }
}
