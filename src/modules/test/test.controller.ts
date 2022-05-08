/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by: peiwei.zhu 
 * @Last Modified time: 2022-05-08 18:27:11
 */
import { Controller, Get } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }
}
