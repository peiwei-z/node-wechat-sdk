import { Controller, Get } from "@nestjs/common";
import { redisCacheInstance } from "./common";
import { MiniProgramService } from "./modules";

@Controller()
export class AppController {
  constructor(private readonly miniService: MiniProgramService) {}
  @Get("auth")
  auth() {
    // const appService = new MiniProgramService({
    //   appId: process.env.MINI_PROGRAM_APP_ID,
    //   appSecret: process.env.MINI_PROGRAM_APP_SECRET,
    //   cache: redisCacheInstance,
    // });

    return this.miniService.Auth.session("code");
  }

  @Get("send")
  sendTemplateMessage() {
    const data = {
      touser: "OPENID",
      template_id: "TEMPLATE_ID",
      page: "index",
      miniprogram_state: "developer",
      lang: "zh_CN",
      data: {
        number01: {
          value: "339208499",
        },
        date01: {
          value: "2015年01月05日",
        },
        site01: {
          value: "TIT创意园",
        },
        site02: {
          value: "广州市新港中路397号",
        },
      },
    };
    return this.miniService.SubscribeMessage.send(data);
  }
}
