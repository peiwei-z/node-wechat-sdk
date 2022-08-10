/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 23:11:48
 */
import { Injectable } from "@nestjs/common";
import fs from "fs";
import { ApplicationService } from "src/application.service";
import { PaymentCredentials, WechatModuleOptions } from "../../common/types";
import { PayService } from "./pay/pay.service";

@Injectable()
export class PaymentService extends ApplicationService {
  public pay: PayService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.mchId = options.mchId;
    this.privateKeyPath = options.privateKeyPath;
    this.serialNo = options.serialNo;
    this.apiV3Key = options.apiV3Key;
    this.certs = [];
    this.needVerify = options.needVerify || true;

    this.domain = "https://api.mch.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:mini_program:access_token";
    this.tokenPath = "/cgi-bin/token";

    this.registerProviders();
    this.updateCerts();
  }

  getCredentials(): PaymentCredentials {
    return {
      appId: this.appId,
      mchId: this.mchId,
      serialNo: this.serialNo,
      apiV3Key: this.apiV3Key,
      certs: this.certs,
      privateKey: this.privateKeyPath
        ? fs.readFileSync(this.privateKeyPath)
        : "",
    };
  }

  async updateCerts(): Promise<void> {
    this.certs = await this.pay.getCertificates();
  }

  registerProviders(): void {
    if (!this.pay) {
      this.offsetSet("pay", (app: ApplicationService) => {
        return new PayService(app);
      });
    }
  }
}
