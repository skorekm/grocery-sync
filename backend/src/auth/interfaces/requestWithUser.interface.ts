import { RequestHandler } from '@nestjs/common/interfaces';
import { User } from '../../users/user.schema';

export interface RequestWithUser extends RequestHandler {
  user: User;
}
