/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:16:03
 * @Last Modified by: peiwei.zhu 
 * @Last Modified time: 2022-05-08 18:35:49
 */

import * as constants from "./constants";

import { RedisCache, redisClient } from "./cache";

export const redisCacheInstance = new RedisCache();

export { redisClient, constants };
