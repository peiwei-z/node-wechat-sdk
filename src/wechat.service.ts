/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:48:24
 */
import { Injectable } from "@nestjs/common";
import queryString from "query-string";
import { AccessTokenOptions, AccessToken } from "./interfaces";
import {
  HttpRequest,
  Util,
  redisCacheInstance,
  RedisCache,
  CacheBase,
} from "./common";
import { WechatModuleOptions } from "./common/types";

@Injectable()
export abstract class WechatService extends HttpRequest {
  public readonly domain: string;

  protected readonly tokenPath: string;
  protected readonly cacheKeyPrefix: string;
  protected cache: CacheBase = redisCacheInstance;

  public appId: string;
  public appSecret: string;

  constructor(options: WechatModuleOptions) {
    super();

    this.domain = "https://api.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:access_token";
    this.tokenPath = "/cgi-bin/token";

    if (options.cache) {
      this.cache = options.cache;
    }
  }

  abstract getCredentials(): Promise<AccessTokenOptions>;

  async getCacheKey(): Promise<string> {
    const credentials = await this.getCredentials();
    return `${this.cacheKeyPrefix}:${Util.md5(JSON.stringify(credentials))}`;
  }

  // 获取Token
  async getToken(refresh?: boolean): Promise<AccessToken> {
    if (!refresh && this.cache) {
      const cacheKey = await this.getCacheKey();
      const token = await this.cache.get(cacheKey);
      if (token) return token;
    }

    const credentials = await this.getCredentials();
    const ret = await this.requestToken(credentials);

    await this.setToken(ret);
    return ret;
  }

  protected async setToken(data: AccessToken): Promise<this> {
    const cacheKey = await this.getCacheKey();

    if (this.cache) {
      await this.cache.set(cacheKey, data, data.expires_in - 1);
    }

    return this;
  }

  async refresh(): Promise<this> {
    this.getToken(true);
    return this;
  }

  getRefreshedToken(): Promise<AccessToken> {
    return this.getToken(true);
  }

  protected async requestToken(
    credentials: AccessTokenOptions
  ): Promise<AccessToken> {
    const url = `${this.domain}${this.tokenPath}?${queryString.stringify(
      credentials
    )}`;

    try {
      return this.httpRequest(url);
    } catch (err) {
      throw new Error(err);
    }
  }
}
