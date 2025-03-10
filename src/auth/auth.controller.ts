import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('UserService', 'login')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: { username: string; password: string }) {
    try {
      return await this.authService.login({
        username: signInDto.username,
        password: signInDto.password,
      });
    } catch (error) {
      throw error;
    }
  }
}
