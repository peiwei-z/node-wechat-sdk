/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 19:18:50
 */
import { Injectable } from "@nestjs/common";
import queryString from "query-string";
import { HttpRequest } from "./common";
import { WechatService } from "./wechat.service";

@Injectable()
export abstract class BaseService extends HttpRequest {
  protected readonly domain: string;
  protected app: WechatService;

  constructor(wechatService: WechatService) {
    super();
    this.domain = "https://api.weixin.qq.com";
    this.app = wechatService;
  }

  async request(
    url: string,
    payload: { body?: object; headers?: object; params?: object },
    method: string
  ): Promise<any> {
    const queryParams = {
      ...payload.params,
      access_token: await this.app.getToken(),
    };
    const fetchUrl = `${this.domain}${url}?${queryString.stringify(
      queryParams
    )}`;

    const ret = await this.httpRequest(fetchUrl, payload, method);
    if (ret.errcode && ret.errcode !== 0) {
      throw new Error(ret);
    }
  }
}
