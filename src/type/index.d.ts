import { Request } from 'express';
import { User } from 'src/graphql';

export interface RequestWithUser extends Request {
  user: User;
}
