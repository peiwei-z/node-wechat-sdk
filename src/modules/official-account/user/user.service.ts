/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:57:23
 */
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";
import {
  DefaultResponse,
  UserInfoOptions
} from "src/common/interfaces";

@Injectable()
export class UserService extends BaseService {
  /**
   * 获取用户基本信息（UnionID）
   * @see https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
   * @param data
   * @returns
   */
  public async info(
    data: UserInfoOptions
  ): Promise<DefaultResponse> {
    return this.httpPost("/cgi-bin/user/info", data);
  }
}
