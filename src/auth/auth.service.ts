import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthResponse, RegisterInput, User } from 'src/graphql';

interface AuthServiceClient {
  login(data: { username: string; password: string }): Observable<AuthResponse>;
  register(data: RegisterInput): Observable<AuthResponse>;
  forgotPassword(data: { id: string; password: string }): Observable<User>;
  getUser(data: { id: string }): Observable<User>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('UserService');
  }

  async login(data: {
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    return await firstValueFrom(this.authService.login(data));
  }

  async register(data: RegisterInput): Promise<AuthResponse> {
    return await firstValueFrom(this.authService.register(data));
  }

  async forgotPassword(data: { id: string; password: string }): Promise<User> {
    return await firstValueFrom(this.authService.forgotPassword(data));
  }

  async getUser(id: string): Promise<User> {
    return await firstValueFrom(this.authService.getUser({ id }));
  }
}
