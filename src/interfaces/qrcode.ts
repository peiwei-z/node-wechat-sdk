/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 18:42:34
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-12 15:50:43
 */

export interface QRCodeOptions {
  scene?: string; //	是	最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
  page?: string; // 主页	否	页面 page，例如 pages/index/index，根路径前不要填加 /，不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
  check_path?: boolean; //	true	否	检查 page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但 page 有数量上限（60000个）请勿滥用
  env_version?: string; //	"release"	否	要打开的小程序版本。正式版为 release，体验版为 trial，开发版为 develop
  auto_color?: boolean; // false	否	自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
  line_color?: Object; //	{"r":0,"g":0,"b":0}	否	auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
  is_hyaline?: boolean; //	false	否	是否需要透明底色，为 true 时，生成透明底色的小程序
  width?: number; //	430	否	二维码的宽度，单位 px，最小 280px，最大 1280px
}

export interface CreateQRCodeOptions extends QRCodeOptions {
  path: string; // 是	扫码进入的小程序页面路径，最大长度 128 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
}

export interface GetUnlimitedQRCodeOptions extends QRCodeOptions {
  scene: string; //	是	最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
}

export interface GetQRCodeOptions extends QRCodeOptions {
  path: string; // 是	扫码进入的小程序页面路径，最大长度 128 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
}