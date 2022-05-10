/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:12:26
 */
import { Injectable } from "@nestjs/common";
import queryString from "query-string";
import { HttpRequest } from "./common";
import { WechatService } from "./wechat.service";

@Injectable()
export abstract class BaseService extends HttpRequest {
  protected app: WechatService;

  constructor(wechatService: WechatService) {
    super();
    this.app = wechatService;
  }

  async request(
    url: string,
    payload: { body?: object; headers?: object; params?: object },
    method?: string
  ): Promise<any> {
    const queryParams = {
      ...payload.params,
      access_token: (await this.app.getToken()).access_token,
    };
    const fetchUrl = `${this.app.domain}${url}?${queryString.stringify(
      queryParams
    )}`;

    return this.httpRequest(fetchUrl, payload, method);
  }
}
