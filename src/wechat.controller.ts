/*
 * @Author: zpw
 * @Date: 2022-11-12 21:45:00
 * @LastEditors: zpw
 * @LastEditTime: 2023-09-22 11:46:35
 * @FilePath: /node-wechat-sdk/src/wechat.controller.ts
 * @Description:
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { redisCacheInstance } from './common';
import {
  CreateQRCodeOptions,
  CustomMenuOptions,
  CustomMessageOptions,
  H5PayOptions,
  JSAPIOptions,
  SubscribeMessageOptions,
  UserInfoOptions,
} from './common/interfaces';
import Config from './config';
import {
  MiniProgramService,
  OfficialAccountService,
  PaymentService,
} from './modules';

@Controller()
export class WechatController {
  private readonly miniService: MiniProgramService;
  private readonly payService: PaymentService;
  private readonly officialAccountService: OfficialAccountService;

  readonly options = {
    appId: Config.MINI_PROGRAM_APP_ID,
    appSecret: Config.MINI_PROGRAM_APP_SECRET,
    mchId: Config.MCH_ID,
    privateKey: Config.PRIVATE_KEY,
    serialNo: Config.SERIAL_NO,
    apiV3Key: Config.API_V3_KEY,
    cache: redisCacheInstance,
  };

  readonly officialAccountOption = {
    appId: Config.OFFICIAL_ACCOUNT_APP_ID,
    appSecret: Config.OFFICIAL_ACCOUNT_APP_SECRET,
    mchId: Config.MCH_ID,
    privateKey: Config.PRIVATE_KEY,
    serialNo: Config.SERIAL_NO,
    apiV3Key: Config.API_V3_KEY,
    cache: redisCacheInstance,
  };
  constructor() {
    this.miniService = new MiniProgramService(this.options);
    this.payService = new PaymentService(this.options);
    this.officialAccountService = new OfficialAccountService(
      this.officialAccountOption,
    );
  }

  @Get('auth')
  auth(@Query() query: { code: string }) {
    return this.miniService.auth.getSession(query.code);
  }

  @Post('sendTemplateMessage')
  sendTemplateMessage(@Body() data: SubscribeMessageOptions) {
    return this.officialAccountService.subscribeMessage.send(data);
    // return this.miniService.subscribeMessage.send(data);
  }

  @Get('getUserInfo')
  user(@Query() data: UserInfoOptions) {
    return this.officialAccountService.user.info(data);
  }

  @Get('getUnlimited')
  async getUnlimited(@Query() query: { scene: string }) {
    return this.miniService.qrcode.getUnlimited(query);
  }

  @Post('jsapi')
  async jsapi(@Body() data: JSAPIOptions) {
    return this.payService.pay.jsapi(data);
  }

  @Get('certificates')
  async certificates(@Body() data: JSAPIOptions) {
    return this.payService.pay.httpGet('/v3/certificates', {});
  }

  @Post('h5')
  async h5(@Body() data: H5PayOptions) {
    return this.payService.pay.h5(data);
  }

  @Get('getCurrentSelfMenuInfo')
  async getCurrentSelfMenuInfo() {
    return this.officialAccountService.menu.getCurrentSelfMenuInfo();
  }

  @Post('createMenu')
  async createMenu(@Body() data: CustomMenuOptions) {
    return this.officialAccountService.menu.create(data);
  }

  @Post('oauth2')
  async oauth2(@Body() data: { code: string }) {
    return this.officialAccountService.oauth.oauth2(data.code);
  }

  @Post('getQRCode')
  async getQRCode(@Body() data: CreateQRCodeOptions) {
    return this.officialAccountService.qrCode.createQRCode(data);
  }

  @Post('sendCustomMessage')
  async sendCustomMessage(@Body() data: CustomMessageOptions) {
    return this.officialAccountService.customMessage.send(data);
  }

  @Get('getOAuth2UserInfo')
  getOAuth2UserInfo(@Query() data: { openid: string }) {
    return this.officialAccountService.oauth.getUserInfo(data.openid);
  }
}
