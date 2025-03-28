import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    GrpcClientModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, AuthResolver],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
