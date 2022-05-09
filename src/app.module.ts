import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MiniProgramModule, MiniProgramService } from "./modules";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
