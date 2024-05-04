import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PostRepository } from '../db-config/repositories/post.repository';
import { Post as PostModel } from '../db-config/models/PostModel';
import { CreatePostDto, UpdatePostDto } from '../db-config/dtos/post.dtos';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { UserRepository } from '../db-config/repositories/user.repository';
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostRepository,
    private readonly userService: UserRepository
  ) {}

  @Get()
  async findAll(): Promise<PostModel[]> {
    return await this.postService.postRepository.find();
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    const author = await this.userService.userRepository.findOne({
      where: {
        id: createPostDto.author,
      },
    });
    const { author: authorId, ...post } = createPostDto;
    Object.assign(post, {
      author,
    });
    // const author = await
    // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const hello = await this.postService.postRepository.create(
      post as Partial<PostModel>
    );
    await this.postService.postRepository.save(hello);
    Logger.log(JSON.stringify(hello));
    return hello;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.postRepository.findOne({
      where: { id: id },
    });
  }

  @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<UpdateResult> {
    return await this.postService.postRepository.update(
      {
        id: id,
      },
      updatePostDto
    );
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  @HttpCode(204) // Indicate no content response after deletion
  async remove(@Param('id') id: string) {
    return await this.postService.postRepository.delete({
      id: id,
    });
  }
}
