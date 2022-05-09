/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 19:24:55
 */
import { Injectable } from "@nestjs/common";
import queryString from "query-string";
import { AccessTokenOptions, AccessToken } from "./interfaces";
import Config from "./config";
import { HttpRequest, Util, redisCacheInstance, RedisCache } from "./common";
import { WechatModuleOptions } from "./common/types";

@Injectable()
export abstract class WechatService extends HttpRequest {
  public readonly domain: string;

  public readonly appId: string;
  public readonly appSecret: string;

  public readonly tokenPath: string;
  public readonly cacheKeyPrefix: string;
  public readonly cache: RedisCache;

  constructor(options: WechatModuleOptions) {
    super();
    this.appId = options.appId || Config.MINI_PROGRAM_APP_ID;
    this.appSecret = options.appSecret || Config.MINI_PROGRAM_APP_SECRET;

    this.domain = "https://api.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:access_token:";
    this.cache = redisCacheInstance;
  }

  abstract getCredentials(): Promise<AccessTokenOptions>;

  async getCacheKey(): Promise<string> {
    const credentials = await this.getCredentials();
    return `${this.cacheKeyPrefix}:${Util.md5(JSON.stringify(credentials))}`;
  }

  // 获取Token
  async getToken(refresh?: boolean): Promise<string> {
    const cacheKey = await this.getCacheKey();

    if (!refresh && this.cache) {
      const token = await this.cache.get(cacheKey);
      if (token) return token;
    }

    const credentials = await this.getCredentials();
    const ret = await this.requestToken(credentials);

    await this.setToken(ret);
    return ret.access_token;
  }

  protected async setToken(data: AccessToken): Promise<this> {
    const cacheKey = await this.getCacheKey();
    if (this.cache) {
      await this.cache.set(cacheKey, data.access_token, data.expires_in - 1);
    }

    return this;
  }

  async refresh(): Promise<this> {
    await this.getToken(true);
    return this;
  }

  getRefreshedToken(): Promise<string> {
    return this.getToken(true);
  }

  async requestToken(credentials: AccessTokenOptions): Promise<AccessToken> {
    const url = `${this.domain}${this.tokenPath}?${queryString.stringify(
      credentials
    )}`;

    try {
      const ret = await this.httpRequest(url);
      if (ret.errcode !== 0) {
        throw new Error(ret.errmsg);
      }
      return ret;
    } catch (err) {
      throw new Error(err);
    }
  }

  async request(
    url: string,
    payload: { body?: object; headers?: object; params?: object },
    method: string
  ): Promise<any> {
    const queryParams = {
      ...payload.params,
      access_token: await this.getToken(),
    };
    const fetchUrl = `${this.domain}${url}?${queryString.stringify(
      queryParams
    )}`;

    const ret = await this.httpRequest(fetchUrl, payload, method);
    if (ret.errcode !== 0) {
      throw new Error(ret.errmsg);
    }
  }

  getInstance() {
    return this;
  }
}
