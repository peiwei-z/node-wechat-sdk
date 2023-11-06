/*
 * @Author: zpw
 * @Date: 2022-11-12 21:45:00
 * @LastEditors: zpw 
 * @LastEditTime: 2023-10-27 15:59:14
 * @FilePath: /node-wechat-sdk/src/common/interfaces/dto.ts
 * @Description:
 */
import type { KeyObject } from 'crypto';

export interface DefaultDto {
  errcode?: number;
  errmsg?: string;
  code?: number;
  message?: string;
  data?: any;
}

export interface AccessTokenDto extends DefaultDto {
  access_token: string; // toekn
  expires_in: number; // token过期时间
  refresh_token?: string; // 刷新token
  openid?: string;
  scope?: string;
  is_snapshotuser?: number;
  unionid?: string;
}

export interface AuthSessionDto extends DefaultDto {
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

export interface UserInfoDto {
  openid: string;
  nickname: string;
  sex: number;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  privilege: string[];
  unionid: string;
}

export interface Watermark {
  appid: string; //	小程序appid
  timestamp: number; //	用户获取手机号操作的时间戳
}

export interface PhoneNumberDto extends DefaultDto {
  phone_info: PhoneInfo;
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

export interface H5PaymentDto {
  h5_url: string;
}

export interface JSAPIDto {
  prepay_id: string;
}

export interface RefundDto {
  refund_id: string;
  out_refund_no: string;
  transaction_id: string;
  channel: string; // ORIGINAL: 原路退款 BALANCE: 退回到余额 OTHER_BALANCE: 原账户异常退到其他余额账户 OTHER_BANKCARD: 原银行卡异常退到其他银行卡
  user_received_account: string;
  success_time?: string; // 格式为YYYY-MM-DDTHH:mm:ss+TIMEZONE 例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日13点29分35秒。
  create_time: string;
  status: string; // SUCCESS: 退款成功 CLOSED: 退款关闭 PROCESSING: 退款处理中 ABNORMAL: 退款异常
  funds_account?: string; // UNSETTLED: 未结算资金 AVAILABLE: 可用余额 UNAVAILABLE: 不可用余额 OPERATION: 运营户 BASIC: 基本账户（含可用余额和不可用余额） ECNY_BASIC: 数字人民币基本账户
  amount: {
    total: number; // 【订单金额】订单总金额，单位为分
    refund: number; // 【退款金额】 退款标价金额，单位为分，可以做部分退款
    from?: {
      account: string; // 【出资账户类型】 出资账户类型 AVAILABLE: 可用余额 UNAVAILABLE: 不可用余额
      amount: number; //【出资金额】 对应账户出资金额，单位为分
    };
    payer_total: number; // 【用户支付金额】 现金支付金额，单位为分，只能为整数
    payer_refund: number; // 【用户退款金额】 退款给用户的金额，单位为分，不包含所有优惠券金额
    settlement_refund: number; // 应结退款金额】 去掉非充值代金券退款金额后的退款金额，单位为分，退款金
    settlement_total: number; // 【应结订单金额】 应结订单金额=订单金额-免充值代金券金额，应结订单金额<=订单金额，单位为分
    discount_refund: number; // 【优惠退款金额】 优惠退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠，单位为分
    currency: string; // 【退款币种】 符合ISO 4217标准的三位字母代码，目前只支持人民币：CNY。
    refund_fee?: number; // 【手续费退款金额】 手续费退款金额，单位为分
  };
  promotion_detail?: [
    {
      promotion_id: string; // 【券ID】 券或者立减优惠id
      scope: string; // 【优惠范围】 优惠范围 GLOBAL: 全场优惠类型 SINGLE: 单品优惠类型
      type: string; // 【优惠类型】 优惠类型 COUPON: 代金券类型，需要走结算资金的充值型代金券 DISCOUNT: 优惠券类型，不走结算资金的免充值型优惠券
      amount: number;
      refund_amount: number;
      goods_detail?: [
        {
          merchant_goods_id: string;
          wechatpay_goods_id?: string;
          goods_name?: string;
          unit_price: number;
          refund_amount: number;
          refund_quantity: number;
        },
      ];
    },
  ];
}
