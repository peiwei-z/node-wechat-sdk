/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 18:42:34
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 15:59:49
 */

export interface AccessToken {
  access_token: string;

  expires_in: number;

  errcode?: number;

  errmsg?: string;

  refresh_token?: string;

  openid?: string;

  scope?: string;
}

export interface AccessTokenOptions {
  grant_type: string;

  appid: string;

  secret: string;
}
