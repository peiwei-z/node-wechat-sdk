import { ModuleMetadata, Type, Abstract } from "@nestjs/common";
import { CacheBase } from "./cache";

export interface WechatModuleOptions {
  /**
   * 微信公众号APP ID
   * WeChat official account APP ID
   */
  appId?: string;
  /**
   * 微信公众号secret
   * WeChat official account app secret
   */
  appSecret?: string;

  /**
   * 商户id mch_id
   */
  mchId?: string;
  /**
   * 商户 API 私钥
   */
  privateKeyPath?: string;
  /**
   * 商户 API 证书 serial_no
   */
  serialNo?: string;
  /**
   *  APIv3 密钥
   */
  apiV3Key?: string;

  /**
   *  支付回调地址
   */
  notifyUrl?: string;

  /**
   * 服务端接口验证 token
   * OfficialAccount | MiniProgram
   */
  token?: string;

  needVerify?: boolean;
  /**
   * 缓存器
   */
  cache?: CacheBase;
}

export interface ModuleForRootAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) => Promise<WechatModuleOptions> | WechatModuleOptions;
  /**
   * The providers which should get injected
   */
  inject?: (string | symbol | Function | Type<any> | Abstract<any>)[];
}

export interface RequestPayload {
  method: string;
  body?: object;
  headers?: object;
  params?: object;
}

export interface GenerateAuthorizationTokenPayload {
  method: string;
  url: string;
  timestamp: string;
  nonce: string;
  body: string;
}

export interface GeneratePaymentPayload {
  appId: string;
  timestamp: string;
  nonce: string;
  body: string;
}

export interface VerifyResponseSignaturePayload {
  timestamp: string;
  nonce: string;
  body: string;
}

export interface MiniProgramCredentials {
  appid: string;
  secret: string;
  grant_type: string;
}

export interface PaymentCredentials {
  appId: string;
  mchId: string;
  serialNo: string;
  apiV3Key: string;
  certs: object[];
  privateKey: Buffer;
}

export interface CipherData {
  algorithm: string;
  ciphertext: string;
  associated_data?: string;
  nonce: string;
}
