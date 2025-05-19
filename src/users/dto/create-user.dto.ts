import { IsEmail, IsString, IsOptional } from 'class-validator';
import { PasswordComplexity } from 'src/auth/validators/password.validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @PasswordComplexity()
  password: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
