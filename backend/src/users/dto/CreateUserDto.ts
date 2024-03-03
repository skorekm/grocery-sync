import { IsEmail, IsMongoId, IsString } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
