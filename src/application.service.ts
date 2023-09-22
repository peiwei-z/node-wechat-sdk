/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:00:54
 */
import { Injectable } from '@nestjs/common';
import queryString from 'query-string';
import { AccessTokenResponse, CertificateInfo } from './common/interfaces';
import {
  redisCacheInstance,
  CacheBase,
  createHash,
  httpRequest,
  responseHandler,
} from './common';
import { WechatModuleOptions } from './common/types';
import { Exception } from './common/Exception';

@Injectable()
export abstract class ApplicationService {
  public domain: string;
  public appId: string;
  public mchId: string;
  public appSecret: string;
  public tokenPath: string;
  public cacheKeyPrefix: string;
  public privateKey: string;
  public serialNo: string;
  public apiV3Key: string;
  public certs: CertificateInfo[];
  public needVerify: boolean;

  public cache: CacheBase = redisCacheInstance;

  constructor(options: WechatModuleOptions) {
    if (options.cache) {
      this.cache = options.cache;
    }
  }

  abstract getCredentials(): any;

  public offsetSet(id: string, value: any): void {
    if (value) {
      value = value(this);
    }
    this[id] = value;
  }

  async getCacheKey(): Promise<string> {
    const credentials = await this.getCredentials();
    return `${this.cacheKeyPrefix}:${createHash(JSON.stringify(credentials))}`;
  }

  // 获取Token
  async getToken(refresh?: boolean): Promise<AccessTokenResponse> {
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

  protected async setToken(data: AccessTokenResponse): Promise<boolean> {
    const cacheKey = await this.getCacheKey();

    if (this.cache) {
      await this.cache.set(cacheKey, data, data.expires_in - 100);
    }

    return true;
  }

  async refresh(): Promise<boolean> {
    this.getToken(true);
    return true;
  }

  getRefreshedToken(): Promise<AccessTokenResponse> {
    return this.getToken(true);
  }

  protected async requestToken(credentials: object): Promise<any> {
    const url = `${this.domain}${this.tokenPath}?${queryString.stringify(
      credentials,
    )}`;

    const response = await httpRequest(url, { method: 'POST' });
    const ret = await responseHandler(response);
    const { code, message } = ret;
    if (code) throw new Exception(message, ret);
    return ret.data;
  }
}
