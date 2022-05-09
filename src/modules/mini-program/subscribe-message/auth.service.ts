/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 19:29:41
 */
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base.service";

@Injectable()
export class AuthService extends BaseService {
  public async send(code: string) {
    return code;
  }
}
