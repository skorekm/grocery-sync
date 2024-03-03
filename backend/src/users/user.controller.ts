import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  async getUser(): Promise<any> {
    return { user: 'user' };
  }
}
