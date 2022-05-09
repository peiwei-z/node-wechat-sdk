/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-09 10:47:25
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 13:46:14
 */
export * from "./cache";
export * from "./HttpRequest";
export * from "./Util";
import * as constants from "./constants";

import { RedisCache, redisClient } from "./cache";

export const redisCacheInstance = new RedisCache();

export { redisClient, constants };
