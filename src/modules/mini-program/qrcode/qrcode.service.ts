/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-12 16:54:54
 */
import { Injectable } from "@nestjs/common";
import {
  CreateQRCodeOptions,
  DefaultError,
  GetQRCodeOptions,
  GetUnlimitedQRCodeOptions,
} from "src/interfaces";
import { BaseService } from "src/base.service";

@Injectable()
export class QRCodeService extends BaseService {
  /**
   * 获取小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html
   * @param data
   * @returns
   */
  public async createQRCode(
    data: CreateQRCodeOptions
  ): Promise<Buffer | DefaultError> {
    return this.requestRaw("/cgi-bin/wxaapp/createwxaqrcode", data);
  }

  /**
   * 获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.get.html
   * @param data
   * @returns
   */
  public async get(data: GetQRCodeOptions): Promise<Buffer | DefaultError> {
    return this.requestRaw("/wxa/getwxacode", data);
  }

  /**
   * 获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
   * @param data
   * @returns
   */
  public async getUnlimited(
    data: GetUnlimitedQRCodeOptions
  ): Promise<Buffer | DefaultError> {
    return this.requestRaw("/wxa/getwxacodeunlimit", data);
  }
}
