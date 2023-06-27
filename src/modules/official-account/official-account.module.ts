/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:31:59
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-10 15:39:46
 */

import { DynamicModule, Module, Provider } from "@nestjs/common";
import { WECHAT_MODULE_CONFIG } from "src/common/constants";
import {
  WechatModuleOptions,
  ModuleForRootAsyncOptions,
} from "../../common/types";
import { OfficialAccountService } from "./official-account.service";

@Module({
  imports: [],
  controllers: [],
  providers: [OfficialAccountService],
  exports: [OfficialAccountService],
})
export class OfficialAccountModule {
  static forRoot(options: WechatModuleOptions): DynamicModule {
    return {
      global: true,
      module: OfficialAccountModule,
      providers: [
        {
          provide: OfficialAccountService,
          useValue: new OfficialAccountService(options),
        },
      ],
      exports: [OfficialAccountService],
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
      provide: OfficialAccountService,
      inject: [WECHAT_MODULE_CONFIG],
      useFactory: (opt: WechatModuleOptions) => {
        return new OfficialAccountService(opt);
      },
    });
    return {
      global: true,
      module: OfficialAccountModule,
      imports: [...(options.imports || [])],
      providers,
      exports: [OfficialAccountService],
    };
  }
}
