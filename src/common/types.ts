import { ModuleMetadata, Type, Abstract } from "@nestjs/common";
import { CacheBase } from "./cache";

export interface WechatModuleOptions {
  /**
   * 微信公众号APP ID
   * WeChat official account APP ID
   */
  appId: string;
  /**
   * 微信公众号secret
   * WeChat official account app secret
   */
  appSecret: string;

  /**
   * 服务端接口验证 token
   * OfficialAccount | MiniProgram
   */
  token?: string;

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
