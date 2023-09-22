/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-06 14:58:06
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-07-09 22:27:17
 */
export class Exception extends Error {
  details: object;
  constructor(message, details) {
    super(message);
    this.message = message;
    this.details = details;
  }
}
