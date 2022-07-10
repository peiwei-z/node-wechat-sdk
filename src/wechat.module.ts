import { Module } from "@nestjs/common";
import { AppController } from "./wechat.controller";
import { MiniProgramModule, PaymentModule } from "./modules";

@Module({
  imports: [
    // MiniProgramModule.forRoot({
    //   appId: "your app id",
    //   appSecret: "your secret",
    // }),
    MiniProgramModule.forRootAsync({
      useFactory: () => ({
        appId: process.env.MINI_PROGRAM_APP_ID,
        appSecret: process.env.MINI_PROGRAM_APP_SECRET,
      }),
    }),
    PaymentModule.forRootAsync({
      useFactory: () => ({
        appId: process.env.MINI_PROGRAM_APP_ID,
        mchId: process.env.MCH_ID,
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
        serialNo: process.env.SERIAL_NO,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
