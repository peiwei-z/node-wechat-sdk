/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-09 10:47:25
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 14:21:58
 */
export * from "./cache";
export * from "./FetchBase";
export * from "./util";
import * as constants from "./constants";

import { RedisCache, redisClient } from "./cache";

export const redisCacheInstance = new RedisCache();

export { redisClient, constants };
