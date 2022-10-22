import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { GrpcClients } from "grpc-types/grpc-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>(GrpcClients.AuthClient);
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`auth-service microservice is running`);
});
