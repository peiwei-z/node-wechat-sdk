/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:01:18
 */
import { Injectable } from "@nestjs/common";
import { ApplicationService } from "src/application.service";
import {
  WeChatCredentials,
  WechatModuleOptions,
} from "../../common/types";
import { SubscribeMessageService } from "./message/subscribe-message.service";
import { UserService } from "./user/user.service";
import { MenuService } from "./menu/menu.service";
import { TemplateMessageService } from "./message/template-message.service";

@Injectable()
export class OfficialAccountService extends ApplicationService {
  public subscribeMessage: SubscribeMessageService;
  public templateMessage: TemplateMessageService
  public user: UserService;
  public menu: MenuService;

  constructor(options: WechatModuleOptions) {
    super(options);
    this.appId = options.appId;
    this.appSecret = options.appSecret;

    this.domain = "https://api.weixin.qq.com";
    this.cacheKeyPrefix = "wechat:official:account:access_token";
    this.tokenPath = "/cgi-bin/token";

    this.registerProviders();
  }

  getCredentials(): WeChatCredentials {
    return {
      appid: this.appId,
      secret: this.appSecret,
      grant_type: "client_credential",
    };
  }

  registerProviders(): void {
    if (!this.subscribeMessage) {
      this.offsetSet("subscribeMessage", (app: ApplicationService) => {
        return new SubscribeMessageService(app);
      });
    }

    if (!this.templateMessage) {
      this.offsetSet("templateMessage", (app: ApplicationService) => {
        return new TemplateMessageService(app);
      });
    }

    if (!this.user) {
      this.offsetSet("user", (app: ApplicationService) => {
        return new UserService(app);
      });
    }

    if (!this.menu) {
      this.offsetSet("menu", (app: ApplicationService) => {
        return new MenuService(app);
      });
    }
  }
}
