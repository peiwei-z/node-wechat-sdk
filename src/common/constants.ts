export const WECHAT_MODULE_CONFIG = "WechatModuleConfig";

export enum Algorithm {
  AEAD_AES_256_GCM = "AEAD_AES_256_GCM",
}

export enum CipherCCMTypes {
  AES_128_CCM = "aes-128-ccm",
  AES_192_CCM = "aes-192-ccm",
  AES_256_CCM = "aes-256-ccm",
  CHACHA_20_POLY_1305 = "chacha20-poly1305",
}

export enum CipherGCMTypes {
  AES_128_GCM = "aes-128-gcm",
  AES_192_GCM = "aes-192-gcm",
  AEAD_AES_256_GCM = "aes-256-gcm",
}
