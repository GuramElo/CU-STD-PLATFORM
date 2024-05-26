import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(6)
  otpCode: string;
}
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @MaxLength(150)
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(6)
  otpCode: string;
}
export class LoginUserDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(150)
  username?: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password?: string;
}
