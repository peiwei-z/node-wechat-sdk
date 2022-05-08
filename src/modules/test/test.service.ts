/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by: peiwei.zhu 
 * @Last Modified time: 2022-05-08 18:31:07
 */
import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
  constructor(options) {
    console.log(options);
  }
  getHello(): string {
    return "Hello Test World!";
  }
}
