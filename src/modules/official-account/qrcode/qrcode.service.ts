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
  QRCodeOptions,
} from 'src/common/interfaces';
import { BaseService } from 'src/base.service';

@Injectable()
export class QRCodeService extends BaseService {
  /**
   * 创建二维码ticket，用于生成带参数的二维码
   * @see https://developers.weixin.qq.com/doc/service/api/qrcode/qrcodes/api_createqrcode.html
   * @param data
   * @returns
   */
  public async createQRCode(data: CreateQRCodeOptions): Promise<DefaultDto> {
    return this.httpPost('/cgi-bin/qrcode/create', data);
  }

  /**
   * 通过ticket换取二维码
   * @see https://developers.weixin.qq.com/doc/service/api/qrcode/qrcodes/api_createqrcode.html
   * @param data
   * @returns
   */
  public async showQRCode(data: QRCodeOptions): Promise<Buffer | DefaultDto> {
    return this.httpGet('https://mp.weixin.qq.com/cgi-bin/showqrcode', data);
  }

  /**
   * 获取带参数的二维码
   * @see https://developers.weixin.qq.com/doc/service/api/qrcode/qrcodes/api_createqrcode.html
   * @param data
   * @returns
   */
  public async getQRCode(
    data: CreateQRCodeOptions,
  ): Promise<Buffer | DefaultDto> {
    const ret = await this.createQRCode(data);
    if (ret.code !== 0) {
      return ret;
    }
    return this.showQRCode({ ticket: encodeURI(ret.data.ticket) });
  }
}
