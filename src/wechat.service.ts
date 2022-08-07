/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:00:54
 */
import { Injectable } from "@nestjs/common";
import { WechatModuleOptions } from "./common/types";
import { ApplicationService } from "./application.service";
import { MiniProgramService, PaymentService } from "./modules";

enum ServiceType {
  MiniProgram = "MiniProgram",
  Payment = "Payment",
}
@Injectable()
export class WechatService extends ApplicationService {
  private readonly options: WechatModuleOptions;
  readonly MiniProgram: typeof MiniProgramService;
  readonly Payment: typeof PaymentService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.options = options;

    this.MiniProgram = MiniProgramService;
    this.Payment = PaymentService;
  }

  /**
   * 通用获取实例方法
   * @param service 服务名称，可选值：'MiniProgram' | 'Payment'
   * @param options 对应的配置参数
   */
  getInstance(
    service: "MiniProgram" | "Payment",
    options?: WechatModuleOptions
  ): any {
    try {
      let applicationClass = this[service];
      return new applicationClass(options || this.options);
    } catch (e) {
      console.log(e);
    }
  }

  getCredentials(): void {}
}
