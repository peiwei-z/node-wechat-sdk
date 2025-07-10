/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:57:23
 */
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import {
  DefaultDto,
  CustomMessageOptions,
} from "src/common/interfaces";

@Injectable()
export class CustomMessageService extends BaseService {
    /**
   * 发送客服消息
   * @see https://developers.weixin.qq.com/doc/service/api/customer/message/api_sendcustommessage.html
   * @param templateData
   * @returns
   */
    public async send(
      templateData: CustomMessageOptions
    ): Promise<DefaultDto> {
      return this.httpPost("/cgi-bin/message/custom/send", templateData);
    }
}
