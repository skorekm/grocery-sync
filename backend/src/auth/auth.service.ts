import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { RegisterDto } from './dto/RegisterDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainStringPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainStringPassword, user.password);

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(registrationData: RegisterDto) {
    const hashedPassword = await this.hashPassword(registrationData.password);
    try {
      const user = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      const userDto = plainToInstance(RegisterDto, user, {
        excludeExtraneousValues: true,
      });

      return {
        user: userDto,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    plainStringPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainStringPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtToken(email: string) {
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=360000`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
