/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 23:11:50
 */
import { Injectable } from '@nestjs/common';
import {
  H5PaymentDto,
  H5PayOptions,
  JSAPIOptions,
  JSAPIDto,
} from 'src/common/interfaces';
import { PaymentBaseService } from '../base/payment-base.service';

@Injectable()
export class PayService extends PaymentBaseService {
  /**
   *  JSAPI下单
   * @see https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_1.shtml
   * @param data
   * @returns
   */
  async jsapi(data: JSAPIOptions): Promise<JSAPIDto> {
    const ret = await this.httpPost('/v3/pay/transactions/jsapi', {
      ...data,
      appid: this.app.appId,
      mchid: this.app.mchId,
    });
    if (ret.code === 0) {
      ret.data = this.getPaySign(ret.data.prepay_id);
    }
    return ret;
  }

  /**
   *  H5下单
   * @see https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_1.shtml
   * @param data
   * @returns
   */
  async h5(data: H5PayOptions): Promise<H5PaymentDto> {
    return this.httpPost('/v3/pay/transactions/h5', {
      ...data,
      appid: this.app.appId,
      mchid: this.app.mchId,
    });
  }
}
