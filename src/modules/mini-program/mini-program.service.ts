/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 18:55:34
 */
import { Injectable } from "@nestjs/common";
import { WechatModuleOptions } from "../../common/types";
import { AccessTokenOptions } from "../../interfaces";
import { WechatService } from "../../wechat.service";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class MiniProgramService extends WechatService {
  public readonly tokenPath: string = "/cgi-bin/token";
  public readonly Auth: AuthService;

  constructor(options: WechatModuleOptions) {
    super(options);

    this.Auth = new AuthService(this.getInstance());
  }

  async getCredentials(): Promise<AccessTokenOptions> {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: "client_credential",
    };
  }
}
