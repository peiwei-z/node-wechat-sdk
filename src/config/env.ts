/*
 * @Author: peiwei.zhu
 * @Date: 2022-05-08 18:26:14
 * @Last Modified by: peiwei.zhu
 * @Last Modified time: 2022-05-09 19:17:09
 */
import path from "path";
import dotenv from "dotenv";

const envPath = `${__dirname}/../..`;

let dotenvOutput: dotenv.DotenvConfigOutput = {};
dotenvOutput = dotenv.config({
  path: path.resolve(`${envPath}/.env`),
});

const { parsed } = dotenvOutput;
export default {
  ...parsed,
  ...process.env,
};
