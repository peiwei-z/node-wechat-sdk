/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:08:32
 * @Last Modified by:   peiwei.zhu
 * @Last Modified time: 2022-05-08 18:08:32
 */

export abstract class CacheBase {
  abstract set(key: string, data: any, expired: number): Promise<any>;
  abstract get(key: string): Promise<any>;
  abstract del(key: string): Promise<any>;
}
