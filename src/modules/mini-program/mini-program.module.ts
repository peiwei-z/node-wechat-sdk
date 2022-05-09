/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:31:59
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 17:43:14
 */

import { DynamicModule, Module, Provider } from "@nestjs/common";
import { WECHAT_MODULE_CONFIG } from "src/common/constants";
import {
  WechatModuleOptions,
  ModuleForRootAsyncOptions,
} from "../../common/types";
import { MiniProgramService } from "./mini-program.service";

@Module({})
export class MiniProgramModule {
  static forRoot(options: WechatModuleOptions) {
    return {
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

  static forRootAsync(options: ModuleForRootAsyncOptions) {
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
      module: MiniProgramModule,
      imports: options.imports,
      providers,
      exports: [MiniProgramService],
    };
  }
}
