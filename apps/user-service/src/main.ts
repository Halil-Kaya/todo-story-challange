import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserProto } from "grpc-types/grpc-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: UserProto.USER_PACKAGE_NAME,
      protoPath: join(__dirname, "./../../../libs/grpc-types/src/protos/user.proto"),
      url: "localhost:50050",
      loader: {
        keepCase: true,
        enums: String,
        longs: Number
      }
    }
  });
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`user-service microservice is running`);
});
