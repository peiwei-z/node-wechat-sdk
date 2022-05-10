/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-09 14:58:24
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 14:43:19
 */
import Redis from "ioredis";
import Config from "../../config";
import { CacheBase } from "./base.cache";

export const redisClient = new Redis(
  parseInt(Config.REDIS_PORT || "6379", 10),
  Config.REDIS_HOST || "127.0.0.1",
  {
    password: Config.REDIS_PASSWORD,
    db: Config.REDIS_DB ? parseInt(Config.REDIS_DB, 10) : 1,
    keyPrefix: "",
  }
);
export class RedisCache extends CacheBase {
  readonly redis: Redis;
  constructor() {
    super();
    this.redis = redisClient;
  }

  getKeyPrefix(): string {
    return this.redis.options.keyPrefix || "";
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

  /**
   * 删除缓存
   * @param {String} key
   * @param {Boolean} match true: 表示删除包括所有通配符key的数据，false: 仅仅删除key的缓存数据
   */
  async del(key: string, match = false): Promise<number> {
    if (!key) {
      return 0;
    }
    if (match) {
      const prefix = this.getKeyPrefix();
      const matchKeys = await this.redis.keys(`${prefix}${key}*`);
      if (matchKeys && matchKeys.length > 0) {
        if (!prefix) {
          await Promise.all(
            matchKeys.map(async (itemKey) => this.redis.del(itemKey))
          );
          return matchKeys.length;
        }
        const result = await Promise.all(
          matchKeys.map(async (itemKey: string) => {
            const tmpKey = itemKey.slice(prefix.length);
            return this.redis.del(tmpKey);
          })
        );
        return result.length;
      }
    }
    return this.redis.del(key);
  }
}
