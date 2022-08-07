/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-10 14:25:59
 */
import { Injectable } from "@nestjs/common";
import Crypto, { KeyObject } from "crypto";
import queryString from "query-string";
import { CipherGCMTypes } from "src/common/constants";
import { CertificateInfo } from "src/common/interfaces";
import {
  createPublicKey,
  getTimestamp,
  isOutdated,
  randomString,
  signWithRSASha256,
  verifyWithRSASha256,
} from "../../../common";
import {
  RequestPayload,
  GenerateAuthorizationTokenPayload,
  GeneratePaymentPayload,
  VerifyResponseSignaturePayload,
  PaymentCredentials,
  CipherData,
} from "../../../common/types";
import { ApplicationService } from "src/application.service";
import { BaseService as Base } from "../../../base.service";
@Injectable()
export class BaseService extends Base {
  protected app: ApplicationService;
  protected count: number;
  protected credentials: PaymentCredentials;

  constructor(app: ApplicationService) {
    super(app);
    this.app = app;
    this.credentials = this.app.getCredentials();
  }

  /**
   * 生成微信支付 V3 Token
   */
  public generateAuthorizationToken(
    privateKey: Buffer,
    payload: GenerateAuthorizationTokenPayload
  ): string {
    const toBeSignedStr = `${payload.method}\n${payload.url}\n${payload.timestamp}\n${payload.nonce}\n${payload.body}\n`;
    const signature = signWithRSASha256(privateKey, toBeSignedStr, "base64");

    return signature;
  }

  /**
   * 获取微信支付 V3 Token
   */
  public getAuthorizationToken(
    method: string,
    url: string,
    body?: string
  ): string {
    const { mchId, serialNo } = this.credentials;
    const schema = "WECHATPAY2-SHA256-RSA2048";
    const timestamp = getTimestamp().toString();
    const nonce = randomString(32);

    const signature = this.generateAuthorizationToken(
      this.credentials.privateKey,
      {
        method,
        url,
        timestamp,
        nonce,
        body: body || "",
      }
    );
    return `${schema} mchid="${mchId}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${serialNo}"`;
  }

  /**
   * 生成微信支付JSAPI签名
   */
  public generatePaySign(
    privateKey: Buffer,
    payload: GeneratePaymentPayload
  ): string {
    const toBeSignedStr = `${payload.appId}\n${payload.timestamp}\n${payload.nonce}\n${payload.body}\n`;
    const signature = signWithRSASha256(privateKey, toBeSignedStr, "base64");

    return signature;
  }

  /**
   * 获取微信支付JSAPI签名
   */
  public getPaySign(prepayId: string) {
    const timestamp = getTimestamp().toString();
    const nonce = randomString();
    const pkg = `prepay_id=${prepayId}`;
    const signType = "RSA";
    const signature = this.generatePaySign(this.credentials.privateKey, {
      appId: this.credentials.appId,
      timestamp,
      nonce,
      body: pkg,
    });
    return {
      timeStamp: timestamp,
      nonceStr: nonce,
      package: pkg,
      signType,
      paySign: signature,
    };
  }

  /**
   * 验证微信支付返回签名
   */
  public verifyResponseSignature(
    publicKey: KeyObject,
    payload: VerifyResponseSignaturePayload,
    signature: string
  ): boolean {
    const verifiedStr = `${payload.timestamp}\n${payload.nonce}\n${payload.body}\n`;
    return verifyWithRSASha256(publicKey, verifiedStr, signature, "base64");
  }

  /**
   *  解密方法
   */
  public decrypt(apiV3Key: string, data: CipherData): string {
    const algorithm = CipherGCMTypes[data.algorithm];

    if (!algorithm) {
      throw new Error("Unsupported algorithm");
    }

    const buf = Buffer.from(data.ciphertext, "base64");
    const text = buf.slice(0, buf.length - 16);
    const authTag = buf.slice(buf.length - 16);

    const decipher = Crypto.createDecipheriv(algorithm, apiV3Key, data.nonce, {
      authTagLength: 16,
    });

    decipher.setAuthTag(authTag);

    if (data.associated_data) {
      decipher.setAAD(Buffer.from(data.associated_data, "utf8"), {
        plaintextLength: text.length,
      });
    }

    const plaintext = Buffer.concat([
      decipher.update(text),
      decipher.final(),
    ]).toString("utf8");

    return plaintext;
  }

  /**
   *  解密敏感数据
   */
  public decryptData<T>(data: CipherData): T {
    const result = this.decrypt(this.credentials.apiV3Key, data);

    return JSON.parse(result);
  }

  /**
   *  获取平台证书详细信息
   */
  public getCertificateInfo(): CertificateInfo | null {
    const { certs, serialNo } = this.credentials;
    const certificate = certs.find(
      (item: CertificateInfo) => item.serial_no === serialNo
    );

    if (certificate) {
      const outdated = isOutdated((certificate as CertificateInfo).expire_time);
      if (!outdated) {
        return certificate as CertificateInfo;
      }
    }
    return null;
  }

  /**
   *  获取平台证书列表
   * @see https://pay.weixin.qq.com/wiki/doc/apiv3/wechatpay/wechatpay5_1.shtml
   * @returns
   */
  public async getCertificates(): Promise<CertificateInfo[]> {
    const ret = await this.httpGet("/v3/certificates", {});
    let certificates = [];
    if (ret.code === 0) {
      certificates = ret.data.data;
      certificates.map((item) => {
        const { algorithm, ciphertext, nonce, associated_data } =
          item.encrypt_certificate;

        const plaintext = this.decrypt(this.credentials.apiV3Key, {
          algorithm,
          ciphertext,
          nonce,
          associated_data,
        });
        const publicKey = createPublicKey(plaintext);

        item.encrypt_certificate.plaintext = plaintext;
        item.encrypt_certificate.publicKey = publicKey;
      });
    }
    return certificates;
  }

  async request(url: string, payload: RequestPayload): Promise<any> {
    let fetchUrl = `${this.app.domain}${url}`;
    if (payload?.params && Object.keys(payload.params).length) {
      fetchUrl = `${fetchUrl}?${queryString.stringify(payload.params)}`;
    }

    const token = this.getAuthorizationToken(
      payload.method,
      url,
      JSON.stringify(payload.body)
    );
    payload.headers = { Authorization: token };
    const response = await this.httpRequest(fetchUrl, payload);
    const ret = await response.json();
    const headers = response.headers;

    if (this.app.needVerify && this.credentials.certs.length > 0) {
      const certificate = this.getCertificateInfo();
      if (!certificate) {
        throw new Error("cert not found");
      }

      const verifyResult = this.verifyResponseSignature(
        certificate.encrypt_certificate.publicKey,
        {
          timestamp: headers["wechatpay-timestamp"],
          nonce: headers["wechatpay-nonce"],
          body: ret,
        },
        headers["wechatpay-signature"]
      );
      if (!verifyResult) {
        return {
          code: "VERIFY_FAIL",
          message: "微信返回结果签名验证失败",
          data: null,
        };
      }
    }

    console.log(ret, "----------response----------");
    if (response.status !== 200 && ret?.code) {
      return { ...ret, data: null };
    }
    return { code: 0, message: "", data: ret };
  }

  async httpGet(url: string, params: object): Promise<any> {
    return this.request(url, {
      params,
      method: "GET",
    });
  }

  async httpPost(url: string, data: object): Promise<any> {
    return this.request(url, {
      body: data,
      method: "POST",
    });
  }
}
