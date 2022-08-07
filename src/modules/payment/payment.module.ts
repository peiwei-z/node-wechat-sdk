/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:31:59
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:28:17
 */

import { DynamicModule, Module, Provider } from "@nestjs/common";
import { WECHAT_MODULE_CONFIG } from "src/common/constants";
import {
  WechatModuleOptions,
  ModuleForRootAsyncOptions,
} from "../../common/types";
import { PaymentService } from "./payment.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {
  static forRoot(options: WechatModuleOptions): DynamicModule {
    return {
      global: true,
      module: PaymentModule,
      providers: [
        {
          provide: PaymentService,
          useValue: new PaymentService(options),
        },
      ],
      exports: [PaymentService],
    };
  }

  static forRootAsync(options: ModuleForRootAsyncOptions): DynamicModule {
    const providers: Provider[] = [];
    if (options.useFactory) {
      providers.push({
        provide: WECHAT_MODULE_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }
    providers.push({
      provide: PaymentService,
      inject: [WECHAT_MODULE_CONFIG],
      useFactory: (opt: WechatModuleOptions) => {
        return new PaymentService(opt);
      },
    });
    return {
      global: true,
      module: PaymentModule,
      imports: [...(options.imports || [])],
      providers,
      exports: [PaymentService],
    };
  }
}
