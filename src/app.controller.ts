import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MiniProgramService } from "./modules";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): any {
    const appService = new MiniProgramService({
      appId: "123",
      appSecret: "321",
    });

    return appService.Auth.session("code");
  }
}
