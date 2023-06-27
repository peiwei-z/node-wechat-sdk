/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:57:23
 */
import { Body, Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import {
  CustomMenuOptions,
  DefaultResponse,
} from "src/common/interfaces";

@Injectable()
export class MenuService extends BaseService {
  /**
   * 查询菜单
   * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Querying_Custom_Menus.html
   * @param data
   * @returns
   */
  public async getCurrentSelfMenuInfo(): Promise<DefaultResponse> {
    return this.httpPost("/cgi-bin/get_current_selfmenu_info", {});
  }

   /**
   * 创建菜单
   * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
   * @param data
   * @returns
   */
   public async create(@Body() data: CustomMenuOptions): Promise<DefaultResponse> {
    return this.httpPost("/cgi-bin/menu/create", data);
  }
}
