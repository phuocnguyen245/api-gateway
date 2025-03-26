import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import { jwtConstants } from './constants';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Tạo GqlExecutionContext từ ExecutionContext
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext<{ req: Request }>().req;

    // Lấy token từ header Authorization
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new GraphQLError('UNAUTHORIZED', {
        extensions: {
          code: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        userId: string;
      }>(token, {
        secret: jwtConstants.secret,
      });

      req['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('UNAUTHORIZED', {
        extensions: {
          code: HttpStatus.UNAUTHORIZED,
        },
      });
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
