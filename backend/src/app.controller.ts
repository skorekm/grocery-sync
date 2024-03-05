import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('hello')
  getHello() {
    return 'Hello World!';
  }
}
