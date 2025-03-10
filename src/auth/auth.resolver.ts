import { AuthService } from 'src/auth/auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login({ username, password });
  }
}
