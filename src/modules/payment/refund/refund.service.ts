/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 23:11:50
 */
import { Injectable } from "@nestjs/common";
import { JSAPIResponse, RefundOptions } from "src/common/interfaces";
import { PaymentBaseService } from "../base/payment-base.service";

@Injectable()
export class RefundService extends PaymentBaseService {
  /**
   * 申请退款
   * @see https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_9.shtml
   * @param data
   * @returns
   */
  async refund(data: RefundOptions): Promise<JSAPIResponse> {
    return this.httpPost("/v3/refund/domestic/refunds", data);
  }
}
