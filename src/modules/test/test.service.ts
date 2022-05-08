/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by: peiwei.zhu 
 * @Last Modified time: 2022-05-08 23:55:21
 */
import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
  constructor(options: any) {
    console.log(options);
  }
  getHello(): string {
    return "Hello Test World!";
  }
}
