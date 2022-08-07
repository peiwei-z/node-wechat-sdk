import { NestFactory } from "@nestjs/core";
import { WechatModule } from "./wechat.module";

async function bootstrap() {
  const app = await NestFactory.create(WechatModule);
  await app.listen(3000);
}
bootstrap();
