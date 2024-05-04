import { UserRepository } from '../db-config/repositories/user.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../db-config/models/UserModel';
import { CreateUserDto, UpdateUserDto } from '../db-config/dtos/user.dtos';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserRepository) {}

  @Get()
  @ApiQuery({ name: 'includePosts', type: Boolean })
  @ApiQuery({ name: 'includeComments', type: Boolean })
  async findAll(
    @Query('includePosts') includePosts = 'false',
    @Query('includeComments') includeComments = 'false'
  ): Promise<User[]> {
    return await this.userService.userRepository.find({
      relations: [
        ...(JSON.parse(includePosts) ? ['posts'] : []),
        ...(JSON.parse(includeComments) ? ['comments'] : []),
      ],
    });
  }

  @Post()
  @UsePipes(new ValidationPipe()) // Enable validation for the request body
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userService.userRepository.create(
        createUserDto
      );
      await this.userService.userRepository.save(createdUser);
      return createdUser;
    } catch (err) {
      Logger.log(JSON.stringify(err?.message), JSON.stringify(err?.constraint));
      throw new HttpException(
        'Something went wrong creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @ApiQuery({ name: 'includePosts', type: Boolean })
  @ApiQuery({ name: 'includeComments', type: Boolean })
  async findOne(
    @Param('id') id: string,
    @Query('includePosts') includePosts = 'false',
    @Query('includeComments') includeComments = 'false'
  ): Promise<User> {
    return await this.userService.userRepository.findOne({
      where: { id: id },
      relations: [
        ...(JSON.parse(includePosts) ? ['posts'] : []),
        ...(JSON.parse(includeComments) ? ['comments'] : []),
      ],
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
