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
import { MiniProgramService } from "./mini-program.service";

@Module({
  imports: [],
  controllers: [],
  providers: [MiniProgramService],
  exports: [MiniProgramService],
})
export class MiniProgramModule {
  static forRoot(options: WechatModuleOptions): DynamicModule {
    return {
      global: true,
      module: MiniProgramModule,
      providers: [
        {
          provide: MiniProgramService,
          useValue: new MiniProgramService(options),
        },
      ],
      exports: [MiniProgramService],
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
      provide: MiniProgramService,
      inject: [WECHAT_MODULE_CONFIG],
      useFactory: (opt: WechatModuleOptions) => {
        return new MiniProgramService(opt);
      },
    });
    return {
      global: true,
      module: MiniProgramModule,
      imports: [...(options.imports || [])],
      providers,
      exports: [MiniProgramService],
    };
  }
}
