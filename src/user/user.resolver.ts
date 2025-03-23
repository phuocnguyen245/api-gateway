import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUser')
  async getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }
}
