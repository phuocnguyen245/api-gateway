import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface UserGrpcService {
  getUser(data: { id: string }): Promise<any>;
  login(data: { username: string; password: string }): Promise<any>;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserGrpcService>('UserService');
  }

  async getUser(id: string) {
    return await firstValueFrom(await this.userService.getUser({ id }));
  }

  async login(username: string, password: string) {
    return await firstValueFrom(
      await this.userService.login({ username, password }),
    );
  }
}
