/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-09 16:20:24
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:01:57
 */
export interface AuthSession {
  openid: string;

  session_key: string;

  unionid?: string;

  errcode?: number;

  errmsg?: string;
}
