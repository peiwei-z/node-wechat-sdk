import { DynamicModule, Module } from "@nestjs/common";
import { WechatController } from "./wechat.controller";
import { WechatModuleOptions } from "./common/types";
import { WechatService } from "./wechat.service";

@Module({
  imports: [],
  controllers: [WechatController],
  providers: [],
  exports: [],
})
export class WechatModule {
  static forRoot(options: WechatModuleOptions): DynamicModule {
    return {
      global: true,
      module: WechatModule,
      providers: [
        {
          provide: WechatService,
          useValue: new WechatService(options),
        },
      ],
      exports: [WechatService],
    };
  }
}
