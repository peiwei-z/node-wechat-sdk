import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MiniProgramModule } from "./modules";

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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
