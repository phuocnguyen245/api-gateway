import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import {
  AuthResponse,
  ChangePasswordInput,
  RegisterInput,
  User,
} from 'src/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwt: JwtService,
  ) {}

  @Query()
  async getUser(@Args('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const response = await this.authService.login({ username, password });
    const accessToken = await this.jwt.signAsync(response);
    return {
      ...response,
      access_token: accessToken,
    };
  }

  @Mutation()
  async register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    const response = await this.authService.register(input);
    const accessToken = await this.jwt.signAsync(response);
    return {
      ...response,
      access_token: accessToken,
    };
  }

  @Mutation()
  async forgotPassword(
    @Args('id') id: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.authService.forgotPassword({ id, password });
  }

  @Mutation()
  async changePassword(
    @Args('id') id: string,
    @Args('input') input: ChangePasswordInput,
  ): Promise<User> {
    return this.authService.forgotPassword({ id, password: input.newPassword });
  }
}
