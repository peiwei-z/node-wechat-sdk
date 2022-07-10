/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-10 14:14:42
 */
import { Injectable } from "@nestjs/common";
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
    returnRaw?: boolean,
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
      const ret = returnRaw ? response : await response.json();
      console.log(ret, "refresh_access_token_count:" + this.count);
      if (ret?.errcode === 40001 && this.count < 5) {
        this.count++;
        this.request(url, payload, returnRaw, true);
      } else {
        this.count = 0;
      }

      if (returnRaw) {
        return ret.arrayBuffer();
      } else {
        const { errcode, errmsg } = ret;
        delete ret.errcode;
        delete ret.errmsg;
        return {
          data: errcode ? null : ret,
          code: errcode || 0,
          message: errmsg || "",
        };
      }
    } else {
      return new Error(response);
    }
  }

  async requestRaw(url: string, data: object): Promise<any> {
    return this.request(url, { body: data, method: "POST" }, true);
  }

  async httpGet(url: string, params: object): Promise<any> {
    return this.request(url, {
      params,
      method: "GET",
    });
  }

  async httpPost(url: string, data: object): Promise<any> {
    return this.request(url, {
      body: data,
      method: "POST",
    });
  }
}
