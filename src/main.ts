import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './grpc-client/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  console.log('🚀 API Gateway is running on port 3000');
}
bootstrap();
