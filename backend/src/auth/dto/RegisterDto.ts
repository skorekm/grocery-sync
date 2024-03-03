import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsMongoId, IsString } from 'class-validator';

export class RegisterDto {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;
}
