/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-12 17:16:44
 */
import { Injectable } from "@nestjs/common";
import { url } from "inspector";
import queryString from "query-string";
import { HttpRequest } from "./common";
import { RequestPayload } from "./common/types";
import { WechatService } from "./wechat.service";

@Injectable()
export abstract class BaseService extends HttpRequest {
  protected app: WechatService;
  protected count: number;

  constructor(wechatService: WechatService) {
    super();
    this.app = wechatService;
    this.count = 0;
  }

  async request(
    url: string,
    payload: RequestPayload,
    returnResponse?: boolean,
    refresh?: boolean
  ): Promise<any> {
    const queryParams = {
      ...payload.params,
      access_token: (await this.app.getToken(refresh)).access_token,
    };
    const fetchUrl = `${this.app.domain}${url}?${queryString.stringify(
      queryParams
    )}`;

    const response = await this.httpRequest(fetchUrl, payload);
    if (response.ok) {
      const ret = returnResponse ? response : await response.json();
      console.log(ret, "refresh:count:" + this.count);
      if (ret?.errcode === 40001 && this.count < 5) {
        this.count++;
        this.request(url, payload, returnResponse, true);
      } else {
        this.count = 0;
      }
      return ret;
    } else {
      return new Error(response);
    }
  }

  async requestRaw(url: string, data: object): Promise<any> {
    const response = await this.request(
      url,
      {
        body: data,
        method: "POST",
      },
      true
    );
    return response.arrayBuffer();
  }

  async httpGet(url: string, params: object): Promise<any> {
    return this.request(url, {
      params,
      method: "POST",
    });
  }

  async httpPost(url: string, data: object): Promise<any> {
    return this.request(url, {
      body: data,
      method: "POST",
    });
  }
}
