/*
 * @Author: peiwei.zhu
 * @Date: 2022-07-09 14:20:57
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:44:24
 */

import Crypto, { KeyObject } from "crypto";
import Qs from "qs";

export const createHash = (str: string, type: string = "sha1"): any => {
  return Crypto.createHash(type).update(str).digest("hex");
};

export const createHmac = (
  str: string,
  key: string,
  type: string = "sha256"
): any => {
  return Crypto.createHmac(type, key).update(str).digest("hex");
};

export const buildQueryString = (
  data: object,
  options: object = {}
): string => {
  return Qs.stringify(data, options);
};

export const parseQueryString = (
  data: string,
  options: object = {}
): object => {
  return Qs.parse(data, options);
};

export const randomString = (len: number = 16): string => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

export const signWithRSASha256 = (
  privateKey: Buffer | string,
  str: string,
  encoding: "hex" | "base64"
): string => {
  const sign = Crypto.createSign("RSA-SHA256");
  sign.write(str);
  sign.end();
  return sign.sign(privateKey, encoding);
};

export const verifyWithRSASha256 = (
  publicKey: KeyObject,
  str: string,
  signature: string,
  encoding: "hex" | "base64"
): boolean => {
  const sign = Crypto.createVerify("RSA-SHA256");
  sign.write(str);
  sign.end();
  return sign.verify(publicKey, signature, encoding);
};

export function createPublicKey(pem: string): KeyObject {
  return Crypto.createPublicKey({
    key: pem,
    format: "pem",
  });
}

export const isOutdated = (date: string | Date): boolean => {
  const target = new Date(date);
  const now = Date.now();

  return target.getTime() <= now;
};

export const getTimestamp = (ms?: boolean): number => {
  const timestamp = Date.now();
  return ms ? timestamp : Math.floor(timestamp / 1000);
};

// 将单词首字母转成大写，'hello word' => 'Hello World'
export const strUcwords = function (str: string): string {
  return str.replace(/\b[a-z]/gi, function (letter) {
    return letter.toUpperCase();
  });
};

// 将单词首字母转成小写，'Hello World' => 'hello word'
export const strLcwords = function (str: string): string {
  return str.replace(/\b[a-z]/gi, function (letter) {
    return letter.toLowerCase();
  });
};

// 驼峰（首字母大写），'hello word' => 'HelloWorld'
export const strStudly = function (value: string): string {
  return strUcwords(value.replace(/[\-|\_]/gi, " ")).replace(/\s/gi, "");
};

// 驼峰（首字母小写），'hello word' => 'helloWorld'
export const strCamel = function (value: string): string {
  return strLcwords(strStudly(value));
};
