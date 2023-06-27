/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:01:18
 */
import { Injectable } from "@nestjs/common";
import { ApplicationService } from "src/application.service";
import {
  WeChatCredentials,
  WechatModuleOptions,
} from "../../common/types";
import { AuthService } from "./auth/auth.service";
import { QRCodeService } from "./qrcode/qrcode.service";
import { SubscribeMessageService } from "./subscribe-message/subscribe-message.service";

@Injectable()
export class MiniProgramService extends ApplicationService {
  public auth: AuthService;
  public subscribeMessage: SubscribeMessageService;
  public qrcode: QRCodeService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.appSecret = options.appSecret;

    this.domain = "https://api.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:mini_program:access_token";
    this.tokenPath = "/cgi-bin/token";

    this.registerProviders();
  }

  getCredentials(): WeChatCredentials {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: "client_credential",
    };
  }

  registerProviders(): void {
    if (!this.auth) {
      this.offsetSet("auth", (app: ApplicationService) => {
        return new AuthService(app);
      });
    }

    if (!this.qrcode) {
      this.offsetSet("qrcode", (app: ApplicationService) => {
        return new QRCodeService(app);
      });
    }

    if (!this.subscribeMessage) {
      this.offsetSet("subscribeMessage", (app: ApplicationService) => {
        return new SubscribeMessageService(app);
      });
    }
  }
}
