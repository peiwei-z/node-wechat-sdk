/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:27:17
 */
import fetch from 'node-fetch';
import { RequestPayload } from './types';

export const httpRequest = async (url: string, payload: RequestPayload) => {
  const config = {
    method: payload.method,
    headers: {
      'Content-Type': 'application/json',
      ...payload.headers,
    },
    body: payload.body ? JSON.stringify(payload.body) : null,
  };

  try {
    return fetch(url, config);
  } catch (error) {
    return new Error(error);
  }
};
export const responseHandler = async (response, returnRaw = false) => {
  if (response.ok) {
    const contentType = response.headers.get('content-type');
    let ret = null;
    if (contentType.includes('image')) {
      ret = await response.buffer();
    } else {
      ret = await response.json();
    }
    const { errcode, errmsg } = ret;
    delete ret.errcode;
    delete ret.errmsg;

    if (returnRaw) {
      if (errcode) {
        return { data: null, code: errcode, message: errmsg || '' };
      }
      return ret;
    }
    return {
      data: errcode ? null : ret,
      code: errcode || 0,
      message: errmsg || '',
    };
  } else {
    return new Error(response);
  }
};
