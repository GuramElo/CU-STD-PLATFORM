import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  author: string;
}
export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  content?: string;
}
