export interface DefaultError {
  errcode: number;
  errmsg: string;
}

export interface PhoneNumberResult extends DefaultError {
  phone_info: PhoneInfo;
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
