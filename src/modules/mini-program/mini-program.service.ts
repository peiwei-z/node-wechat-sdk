/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:01:18
 */
import { Injectable } from "@nestjs/common";
import {
  MiniProgramCredentials,
  WechatModuleOptions,
} from "../../common/types";
import { WechatService } from "../../wechat.service";
import { AuthService } from "./auth/auth.service";
import { QRCodeService } from "./qrcode/qrcode.service";
import { SubscribeMessageService } from "./subscribe-message/subscribe-message.service";

@Injectable()
export class MiniProgramService extends WechatService {
  public Auth: AuthService;
  public SubscribeMessage: SubscribeMessageService;
  public QRCode: QRCodeService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.appSecret = options.appSecret;

    this.domain = "https://api.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:mini_program:access_token";
    this.tokenPath = "/cgi-bin/token";

    this.registerProviders();
  }

  getCredentials(): MiniProgramCredentials {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: "client_credential",
    };
  }

  registerProviders(): void {
    if (!this.Auth) {
      this.offsetSet("Auth", (app: WechatService) => {
        return new AuthService(app);
      });
    }

    if (!this.QRCode) {
      this.offsetSet("QRCode", (app: WechatService) => {
        return new QRCodeService(app);
      });
    }

    if (!this.SubscribeMessage) {
      this.offsetSet("SubscribeMessage", (app: WechatService) => {
        return new SubscribeMessageService(app);
      });
    }
  }
}
