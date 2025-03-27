import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import {
  AuthResponse,
  ChangePasswordBody,
  RegisterBody,
  User,
} from 'src/graphql';
import { RequestWithUser } from 'src/type';
import { AuthGuard } from './auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const response = await this.authService.login({ username, password });
    const accessToken = await this.jwt.signAsync(response);
    const refreshToken = await this.jwt.signAsync(response, {
      secret: this.configService.get('token.refreshSecret'),
      expiresIn: '7d',
    });
    return {
      ...response,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Mutation()
  async register(@Args('body') body: RegisterBody): Promise<AuthResponse> {
    const response = await this.authService.register(body);
    const accessToken = await this.jwt.signAsync(response);
    const refreshToken = await this.jwt.signAsync(response, {
      secret: this.configService.get('token.refreshSecret'),
      expiresIn: '2d',
    });
    return {
      ...response,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Query()
  @UseGuards(AuthGuard)
  async getUser(
    @Context('req') req: RequestWithUser,
    @Args('id') id: string,
  ): Promise<User> {
    const { id: authUserId, role } = req.user;
    let userId = authUserId;
    if (role !== 'user') {
      userId = id;
    }
    return this.authService.getUser(userId);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async forgotPassword(
    @Context('req') req: RequestWithUser,
    @Args('password') password: string,
  ): Promise<User> {
    const { id } = req.user;
    return this.authService.forgotPassword({ id, password });
  }

  @Mutation()
  async changePassword(
    @Context('req') req: RequestWithUser,
    @Args('body') body: ChangePasswordBody,
  ): Promise<User> {
    const { id } = req.user;
    return this.authService.forgotPassword({ id, password: body.newPassword });
  }
}
