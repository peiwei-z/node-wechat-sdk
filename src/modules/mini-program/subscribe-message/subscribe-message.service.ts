/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:50:48
 */
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import { SubscribeMessage, DefaultResult } from "src/interfaces";

@Injectable()
export class SubscribeMessageService extends BaseService {
  public async send(templateData: SubscribeMessage): Promise<DefaultResult> {
    return this.request("/cgi-bin/message/subscribe/send", {
      body: templateData,
    });
  }
}
