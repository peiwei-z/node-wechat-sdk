/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 23:11:50
 */
import { Injectable } from "@nestjs/common";
import { JSAPIOptions, JSAPIResponse } from "src/common/interfaces";
import { BaseService } from "../base/base.service";

@Injectable()
export class PayService extends BaseService {
  /**
   *  JSAPI下单
   * @see https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_1.shtml
   * @param data
   * @returns
   */
  async jsapi(data: JSAPIOptions): Promise<JSAPIResponse> {
    data.appid = this.app.appId;
    data.mchid = this.app.mchId;
    const ret = await this.httpPost("/v3/pay/transactions/jsapi", data);
    if (ret.code === 0) {
      ret.data = this.getPaySign(ret.data.prepay_id);
    }
    return ret;
  }
}
