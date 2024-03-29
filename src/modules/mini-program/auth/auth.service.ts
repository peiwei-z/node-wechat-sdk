/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 15:19:45
 */
import { Injectable } from "@nestjs/common";
import {
  AuthSessionDto,
  PhoneNumberDto,
} from "src/common/interfaces";
import { BaseService } from "src/base.service";

@Injectable()
export class AuthService extends BaseService {
  /**
   * code 小程序端通过 wx.login 获取
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   * @param code
   * @returns
   */
  public async getSession(code: string): Promise<AuthSessionDto> {
    const params = {
      appid: this.app.appId,
      secret: this.app.appSecret,
      js_code: code,
      grant_type: "authorization_code",
    };
    return this.httpGet("/sns/jscode2session", params);
  }

  /**
   * 获取用户手机号
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html
   * @param code
   * @returns
   */
  public async getPhoneNumber(code: string): Promise<PhoneNumberDto> {
    return this.httpPost("/wxa/business/getuserphonenumber", { code });
  }
}
