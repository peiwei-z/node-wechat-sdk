import type { KeyObject } from "crypto";

export interface DefaultResponse {
  errcode?: number;
  errmsg?: string;
  code?: number;
  message?: string;
  data?: any;
}

export interface AccessTokenResponse extends DefaultResponse {
  access_token: string; // toekn
  expires_in: number; // token过期时间
  refresh_token?: string; // 刷新token
  openid?: string;
  scope?: string;
  is_snapshotuser?: number;
  unionid?: string;
}

export interface AuthSessionResponse extends DefaultResponse {
  openid: string;

  session_key: string;

  unionid?: string;
}

export interface PhoneInfo {
  phoneNumber: string; //	用户绑定的手机号（国外手机号会有区号）
  purePhoneNumber: string; //	没有区号的手机号
  countryCode: string; // 区号
  watermark: Watermark; // 数据水印
}

export interface Watermark {
  appid: string; //	小程序appid
  timestamp: number; //	用户获取手机号操作的时间戳
}

export interface PhoneNumberResponse extends DefaultResponse {
  phone_info: PhoneInfo;
}

export interface JSAPIResponse {
  prepay_id: string;
}

interface Certificate {
  algorithm: string;
  nonce: string;
  associated_data: string;
  ciphertext: string;
  plaintext: string;
  publicKey: KeyObject;
}
export interface CertificateInfo {
  serial_no: string;
  effective_time: string;
  expire_time: string;
  encrypt_certificate: Certificate;
}

export interface DecryptNotifyData {
  transaction_id: string;
  amount: {
    payer_total: number;
    total: number;
    currency: string;
    payer_currency: string;
  };
  mchid: string;
  trade_state: string;
  bank_type: string;
  promotion_detail: object[];
  success_time: string;
  payer: {
    openid: string;
  };
  out_trade_no: string;
  appid: string;
  trade_state_desc: string;
  trade_type: string;
  attach: string;
  scene_info: {
    device_id: string;
  };
}

export interface H5PaymentResponse {
  h5_url: string;
}

export interface CustomMenuOptions {
  button: object[], 
  sub_button: object[], 
  type: string,
  name: string,
  key: string,
  url: string,
  media_id: string,
  appid: string,
  pagepath: string,
  article_id: string,
}