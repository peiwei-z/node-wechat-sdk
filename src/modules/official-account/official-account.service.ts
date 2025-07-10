/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:01:18
 */
import { Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/application.service';
import { WeChatCredentials, WechatModuleOptions } from '../../common/types';
import { SubscribeMessageService } from './message/subscribe-message.service';
import { UserService } from './user/user.service';
import { MenuService } from './menu/menu.service';
import { TemplateMessageService } from './message/template-message.service';
import { OAuthService } from './oauth/oauth.service';
import { QRCodeService } from './qrcode/qrcode.service';
import { CustomMessageService } from './message/custom-message.service';

@Injectable()
export class OfficialAccountService extends ApplicationService {
  readonly subscribeMessage: SubscribeMessageService;
  readonly templateMessage: TemplateMessageService;
  readonly user: UserService;
  readonly menu: MenuService;
  readonly oauth: OAuthService;
  readonly qrCode: QRCodeService;
  readonly customMessage: CustomMessageService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.appSecret = options.appSecret;

    this.domain = 'https://api.weixin.qq.com';
    this.cacheKeyPrefix = 'wechat:official:account:access_token';
    this.tokenPath = '/cgi-bin/token';

    this.registerProviders();
  }

  getCredentials(): WeChatCredentials {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: 'client_credential',
    };
  }

  registerProviders(): void {
    if (!this.oauth) {
      this.offsetSet('oauth', (app: ApplicationService) => {
        return new OAuthService(app);
      });
    }

    if (!this.subscribeMessage) {
      this.offsetSet('subscribeMessage', (app: ApplicationService) => {
        return new SubscribeMessageService(app);
      });
    }

    if (!this.templateMessage) {
      this.offsetSet('templateMessage', (app: ApplicationService) => {
        return new TemplateMessageService(app);
      });
    }

    if (!this.user) {
      this.offsetSet('user', (app: ApplicationService) => {
        return new UserService(app);
      });
    }

    if (!this.menu) {
      this.offsetSet('menu', (app: ApplicationService) => {
        return new MenuService(app);
      });
    }

    if (!this.qrCode) {
      this.offsetSet('qrCode', (app: ApplicationService) => {
        return new QRCodeService(app);
      });
    }

    if (!this.customMessage) {
      this.offsetSet('customMessage', (app: ApplicationService) => {
        return new CustomMessageService(app);
      });
    }
  }
}
