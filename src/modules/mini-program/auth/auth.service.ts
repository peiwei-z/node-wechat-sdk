/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 18:52:18
 */
import { Injectable } from "@nestjs/common";
import { AuthSessionResult } from "src/interfaces/auth";
import { BaseService } from "src/base.service";

@Injectable()
export class AuthService extends BaseService {
  /**
   * code 小程序端通过 wx.login 获取
   */
  public async session(code: string): Promise<AuthSessionResult> {
    if (!this.app.appId || !this.app.appSecret) {
      throw new Error("no appId or appSecret");
    }
    const params = {
      appid: this.app.appId,
      secret: this.app.appSecret,
      js_code: code,
      grant_type: "authorization_code",
    };
    return this.request("/sns/jscode2session", { params }, "GET");
  }
}
