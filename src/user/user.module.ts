import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { UserService } from './user.service';

@Module({
  imports: [GrpcClientModule],
  providers: [UserResolver, UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
