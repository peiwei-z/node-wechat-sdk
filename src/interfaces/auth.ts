/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-09 16:20:24
 * @Last Modified by:   peiwei.zhu
 * @Last Modified time: 2022-05-09 16:20:24
 */
export interface AuthSessionResult {
  openid: string;

  session_key: string;

  unionid?: string;

  errcode?: number;

  errmsg?: string;
}
