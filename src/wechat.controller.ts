import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { redisCacheInstance } from "./common";
import {
  H5PayOptions,
  JSAPIOptions,
  SubscribeMessageOptions,
} from "./common/interfaces";
import Config from "./config";
import { MiniProgramService, PaymentService } from "./modules";

@Controller()
export class WechatController {
  private readonly miniService: MiniProgramService;
  private readonly payService: PaymentService;

  readonly options = {
    appId: Config.MINI_PROGRAM_APP_ID,
    appSecret: Config.MINI_PROGRAM_APP_SECRET,
    mchId: Config.MCH_ID,
    privateKey: Config.PRIVATE_KEY,
    serialNo: Config.SERIAL_NO,
    apiV3Key: Config.API_V3_KEY,
    cache: redisCacheInstance,
  };
  constructor() {
    this.miniService = new MiniProgramService(this.options);
    this.payService = new PaymentService(this.options);
  }
  @Get("auth")
  auth(@Query() query: { code: string }) {
    return this.miniService.auth.getSession(query.code);
  }

  @Post("sendTemplateMessage")
  sendTemplateMessage(@Body() data: SubscribeMessageOptions) {
    return this.miniService.subscribeMessage.send(data);
  }

  @Get("getUnlimited")
  async getUnlimited(@Query() query: { scene: string }) {
    return this.miniService.qrcode.getUnlimited(query);
  }

  @Post("jsapi")
  async jsapi(@Body() data: JSAPIOptions) {
    return this.payService.pay.jsapi(data);
  }

  @Get("certificates")
  async certificates(@Body() data: JSAPIOptions) {
    return this.payService.pay.httpGet("/v3/certificates", {});
  }

  @Post("h5")
  async h5(@Body() data: H5PayOptions) {
    return this.payService.pay.h5(data);
  }
}
