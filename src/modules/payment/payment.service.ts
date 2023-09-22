/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 23:11:48
 */
import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { ApplicationService } from 'src/application.service';
import { PaymentCredentials, WechatModuleOptions } from '../../common/types';
import { PayService } from './pay/pay.service';
import { RefundService } from './refund/refund.service';

@Injectable()
export class PaymentService extends ApplicationService {
  readonly pay: PayService;
  readonly refund: RefundService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.mchId = options.mchId;
    this.privateKey = options.privateKey;
    this.serialNo = options.serialNo;
    this.apiV3Key = options.apiV3Key;
    this.certs = [];
    this.needVerify = options.needVerify || true;

    this.domain = 'https://api.mch.weixin.qq.com';
    this.cacheKeyPrefix = 'wechat:mini_program:access_token';
    this.tokenPath = '/cgi-bin/token';

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
      privateKey: fs.existsSync(this.privateKey)
        ? fs.readFileSync(this.privateKey)
        : this.privateKey,
    };
  }

  async updateCerts(): Promise<void> {
    this.certs = await this.pay.getCertificates();
  }

  registerProviders(): void {
    if (!this.pay) {
      this.offsetSet('pay', (app: ApplicationService) => {
        return new PayService(app);
      });
    }
    if (!this.refund) {
      this.offsetSet('refund', (app: ApplicationService) => {
        return new RefundService(app);
      });
    }
  }
}
