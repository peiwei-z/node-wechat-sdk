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
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
   * @param templateData
   * @returns
   */
  public async send(
    templateData: SubscribeMessageOptions
  ): Promise<DefaultDto> {
    return this.httpPost("/cgi-bin/message/subscribe/send", templateData);
  }
}
