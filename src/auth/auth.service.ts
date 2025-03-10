import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface AuthServiceClient {
  login(data: { username: string; password: string }): Observable<{
    id: string;
    name: string;
    email: string;
  }>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('UserService');
  }

  async login(data: { username: string; password: string }): Promise<{
    id: string;
    name: string;
    email: string;
  }> {
    return await firstValueFrom(this.authService.login(data));
  }
}
