/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 20:58:12
 */
import { Injectable } from '@nestjs/common';
import {
  CreateQRCodeOptions,
  DefaultDto,
  GetQRCodeOptions,
  GetUnlimitedQRCodeOptions,
} from 'src/common/interfaces';
import { BaseService } from 'src/base.service';

@Injectable()
export class QRCodeService extends BaseService {
  /**
   * 获取小程序二维码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html
   * @param data
   * @returns
   */
  public async createQRCode(
    data: CreateQRCodeOptions,
  ): Promise<Buffer | DefaultDto> {
    return this.httpPost('/cgi-bin/wxaapp/createwxaqrcode', data);
  }

  /**
   * 获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.get.html
   * @param data
   * @returns
   */
  public async get(data: GetQRCodeOptions): Promise<Buffer | DefaultDto> {
    return this.httpPost('/wxa/getwxacode', data);
  }

  /**
   * 获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制
   * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
   * @param data
   * @returns
   */
  public async getUnlimited(
    data: GetUnlimitedQRCodeOptions,
  ): Promise<Buffer | DefaultDto> {
    return this.httpPost('/wxa/getwxacodeunlimit', data);
  }
}
