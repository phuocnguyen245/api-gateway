import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { UserService } from './user.service';

@Module({
  imports: [GrpcClientModule],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
