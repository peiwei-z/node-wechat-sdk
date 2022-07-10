import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { redisCacheInstance } from "./common";
import { JSAPIOptions, SubscribeMessageOptions } from "./common/interfaces";
import { MiniProgramService, PaymentService } from "./modules";

@Controller()
export class AppController {
  constructor(
    private readonly miniService: MiniProgramService,
    private readonly payService: PaymentService
  ) {}
  @Get("auth")
  auth(@Query() query: { code: string }) {
    return this.miniService.Auth.session(query.code);
  }

  @Post("sendTemplateMessage")
  sendTemplateMessage(@Body() data: SubscribeMessageOptions) {
    return this.miniService.SubscribeMessage.send(data);
  }

  @Get("getUnlimited")
  async getUnlimited(@Query() query: { scene: string }) {
    return this.miniService.QRCode.getUnlimited(query);
  }

  @Post("jsapi")
  async jsapi(@Body() data: JSAPIOptions) {
    return this.payService.PayService.jsapi(data);
  }

  @Get("certificates")
  async certificates(@Body() data: JSAPIOptions) {
    console.log(this.payService.PayService, 123123);
    return this.payService.PayService.httpGet("/v3/certificates", {});
  }
}
