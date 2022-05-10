/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:08:12
 */
import { Injectable } from "@nestjs/common";
import { AuthSession } from "src/interfaces";
import { BaseService } from "src/base.service";

@Injectable()
export class AuthService extends BaseService {
  /**
   * code 小程序端通过 wx.login 获取
   */
  public async session(code: string): Promise<AuthSession> {
    const params = {
      appid: this.app.appId,
      secret: this.app.appSecret,
      js_code: code,
      grant_type: "authorization_code",
    };
    return this.request("/sns/jscode2session", { params }, "GET");
  }
}
