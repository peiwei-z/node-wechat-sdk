/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:28:32
 */
import { Injectable } from "@nestjs/common";
import { WechatModuleOptions } from "../../common/types";
import { AccessTokenOptions } from "../../interfaces";
import { WechatService } from "../../wechat.service";
import { AuthService } from "./auth/auth.service";
import { QRCodeService } from "./qrcode/qrcode.service";
import { SubscribeMessageService } from "./subscribe-message/subscribe-message.service";

@Injectable()
export class MiniProgramService extends WechatService {
  public readonly Auth: AuthService;
  public readonly SubscribeMessage: SubscribeMessageService;
  public readonly QRCode: QRCodeService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.appSecret = options.appSecret;

    this.Auth = new AuthService(this);
    this.QRCode = new QRCodeService(this);
    this.SubscribeMessage = new SubscribeMessageService(this);
  }

  async getCredentials(): Promise<AccessTokenOptions> {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: "client_credential",
    };
  }
}
