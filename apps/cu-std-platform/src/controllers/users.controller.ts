import { UserRepository } from '../db-config/repositories/user.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../db-config/models/UserModel';
import { CreateUserDto, UpdateUserDto } from '../db-config/dtos/user.dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserRepository) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.userRepository.find({
      relations: ['posts', 'comments'],
    });
  }
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @Post()
  @UsePipes(new ValidationPipe()) // Enable validation for the request body
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.userRepository.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.userRepository.findOne({
      where: { id: id },
    });
  }

  @Patch(':id')
  // @UseGuards(AuthGuard('jwt')) // Add JWT authentication guard
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userEdition = await this.userService.userRepository.update(
      {
        id: id,
      },
      updateUserDto
    );
    if (!userEdition.affected) {
      throw new NotFoundException();
    }
    return userEdition;
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // Indicate successful deletion with no content response
  async remove(@Param('id') id: string) {
    const userDeletion = await this.userService.userRepository.delete({
      id: id,
    });
    if (!userDeletion.affected) {
      throw new NotFoundException();
    }
    return userDeletion;
  }
}
