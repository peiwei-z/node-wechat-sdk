/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:57:23
 */
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import {
  SubscribeMessageOptions,
  DefaultDto,
} from "src/common/interfaces";

@Injectable()
export class SubscribeMessageService extends BaseService {
    /**
   * 发送订阅消息
   * @see https://developers.weixin.qq.com/doc/offiaccount/Subscription_Messages/api.html#send%E5%8F%91%E9%80%81%E8%AE%A2%E9%98%85%E9%80%9A%E7%9F%A5
   * @param templateData
   * @returns
   */
    public async send(
      templateData: SubscribeMessageOptions
    ): Promise<DefaultDto> {
      return this.httpPost("/cgi-bin/message/subscribe/bizsend", templateData);
    }
}
