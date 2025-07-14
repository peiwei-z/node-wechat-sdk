/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-10 14:14:42
 */
import { Injectable } from '@nestjs/common';
import queryString from 'query-string';
import { httpRequest, responseHandler } from './common';
import { RequestPayload } from './common/types';
import { ApplicationService } from './application.service';

@Injectable()
export class BaseService {
  protected app: ApplicationService;
  protected count: number;

  constructor(app: ApplicationService) {
    this.app = app;
    this.count = 0;
  }

  async request(
    url: string,
    payload: RequestPayload,
    returnRaw?: boolean,
    refresh?: boolean,
  ): Promise<any> {
    try {
      const queryParams = {
        access_token: (await this.app.getToken(refresh)).access_token,
        ...payload.params,
      };

      const domain = url.indexOf('http') !== -1 ? url : this.app.domain;
      const fetchUrl = `${domain}${url}?${queryString.stringify(queryParams)}`;

      const rst = await httpRequest(fetchUrl, payload);
      const response = await responseHandler(rst, returnRaw);
      if (response.code === 40001) {
        this.app.cache.del(await this.app.getCacheKey());
      }
      console.log('response', response);
      return response;
    } catch (error) {
      return error.details;
    }
  }

  async requestRaw(url: string, data: object): Promise<any> {
    return this.request(url, { body: data, method: 'POST' }, true);
  }

  async httpGet(url: string, params: object): Promise<any> {
    return this.request(url, {
      params,
      method: 'GET',
    });
  }

  async httpPost(url: string, data: object): Promise<any> {
    return this.request(url, {
      body: data,
      method: 'POST',
    });
  }
}
