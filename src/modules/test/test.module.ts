/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by: peiwei.zhu 
 * @Last Modified time: 2022-05-08 18:37:25
 */
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { constants } from "../../common";
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {
  public static register(options: any): DynamicModule {
    return {
      module: TestModule,
      providers: [
        {
          provide: TestService,
          useValue: new TestService(options),
        },
      ],
      exports: [TestService],
    };
  }

  public static forRootAsync(options: any): DynamicModule {
    const providers: Provider[] = [];
    if (options.useFactory) {
      providers.push({
        provide: constants.TEST_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }
    providers.push({
      provide: TestService,
      inject: [constants.TEST_MODULE_OPTIONS],
      useFactory: (opt: any) => {
        return new TestService(opt);
      },
    });
    return {
      module: TestModule,
      imports: options.imports,
      providers,
      exports: [TestService],
    };
  }
}
