/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-12 17:16:35
 */
import fetch from "node-fetch";
import { RequestPayload } from "./types";

export class HttpRequest {
  async httpRequest(url: string, payload: RequestPayload) {
    const config = {
      method: payload.method,
      headers: {
        "Content-Type": "application/json",
        ...payload.headers,
      },
      body: payload.body ? JSON.stringify(payload.body) : null,
    };

    try {
      return fetch(url, config);
    } catch (error) {
      return new Error(error);
    }
  }
}
