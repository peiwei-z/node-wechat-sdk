/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:12:17
 */
import fetch from "node-fetch";

export class HttpRequest {
  async httpRequest(
    url: string,
    payload?: { body?: object; headers?: object },
    method?: string
  ) {
    const config = {
      method: method || (payload?.body ? "POST" : "GET"),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...payload?.headers,
      },
      body: payload?.body ? JSON.stringify(payload.body) : null,
    };

    try {
      const response = await fetch(url, config);
      if (response.ok) {
        return response.json();
      } else {
        return new Error(response);
      }
    } catch (error) {
      return new Error(error);
    }
  }
}
