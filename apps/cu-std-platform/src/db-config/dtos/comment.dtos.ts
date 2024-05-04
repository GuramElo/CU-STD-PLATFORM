import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  content: string;
}
export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  content?: string;
}
