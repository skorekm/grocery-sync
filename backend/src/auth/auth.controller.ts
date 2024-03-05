import {
  Controller,
  Req,
  Res,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Public } from './public.decorator';
import { RegisterDto } from './dto/RegisterDto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { UserResponseDto } from './dto/UserResponseDto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.email);
    response.setHeader('Set-Cookie', cookie);
    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return response.send(userDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @Post('access-token')
  async getAccessToken(@Req() req: any) {
    const { cookies } = req;

    if (!cookies?.refreshToken) {
      throw new HttpException(
        'Refresh token is required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @Get('user')
  async getUser(@Req() request: RequestWithUser) {
    const { user } = request;
    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return userDto;
  }
}
