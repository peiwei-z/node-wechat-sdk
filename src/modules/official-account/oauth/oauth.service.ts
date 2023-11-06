/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 15:19:45
 */
import { Injectable } from '@nestjs/common';
import { AccessTokenDto, UserInfoDto } from 'src/common/interfaces';
import { BaseService } from 'src/base.service';
import { ApplicationService } from 'src/application.service';
import { CacheBase, redisCacheInstance } from 'src/common';

@Injectable()
export class OAuthService extends BaseService {
  protected openid: string;
  protected accessTokenPrefixKey: 'official:account:oauth:access_token';
  protected refreshTokenPrefixKey: 'official:account:oauth:refresh_token';
  protected cache: CacheBase = redisCacheInstance;

  constructor(app: ApplicationService) {
    super(app);
    if (app.cache) {
      this.cache = app.cache;
    }
  }
  /**
   * 公众号通过 code 获取access_token
   * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1
   * @param code
   * @returns
   */
  public async oauth2(code: string): Promise<AccessTokenDto> {
    const params = {
      appid: this.app.appId,
      secret: this.app.appSecret,
      code,
      grant_type: 'authorization_code',
    };
    const ret = await this.httpGet('/sns/oauth2/access_token', params);
    if (ret.code === 0) {
      this.setToken(ret.data);
    }
    return ret;
  }

  /**
   * 刷新token
   * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1
   * @param refreshToken
   * @returns
   */
  public async refreshToken(
    refreshToken: string,
  ): Promise<AccessTokenDto> {
    return this.httpGet('/sns/oauth2/refresh_token', {
      appid: this.app.appId,
      refresh_token: refreshToken,
      grant_type: 'authorization_code',
    });
  }

  /**
   * 通过access_token和openid拉取用户信息
   * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1
   * @param refreshToken
   * @returns
   */
  public async getUserInfo(openid: string): Promise<UserInfoDto> {
    const token = await this.getToken(openid);
    return this.httpGet('/sns/userinfo', {
      appid: this.app.appId,
      access_token: token,
      lang: 'zh_CN',
    });
  }

  // 获取Token
  protected async getToken(openid: string, refresh?: boolean): Promise<string> {
    const token = await this.cache.get(
      `${this.accessTokenPrefixKey}:${openid}`,
    );

    if (refresh || !token) {
      const refreshed = await this.cache.get(
        `${this.refreshTokenPrefixKey}:${openid}`,
      );
      if (refreshed) {
        const refreshRet = await this.refreshToken(refreshed);
        if (refreshRet.code === 0) return refreshRet.data.access_token;
      }
      return '';
    }
    return token;
  }

  protected async setToken(data: AccessTokenDto): Promise<this> {
    if (this.cache) {
      this.cache.set(
        `${this.accessTokenPrefixKey}:${data.openid}`,
        data.access_token,
        data.expires_in - 1000,
      );
      this.cache.set(
        `${this.refreshTokenPrefixKey}:${data.openid}`,
        data.refresh_token,
        30 * 24 * 3600,
      );
    }

    return this;
  }
}
