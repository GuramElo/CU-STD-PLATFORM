import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentRepository } from '../db-config/repositories/comment.repository';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from '../db-config/dtos/comment.dtos';
import { Comment } from '../db-config/models/CommentModel';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PostRepository } from '../db-config/repositories/post.repository';
import { UserRepository } from '../db-config/repositories/user.repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentRepository,
    private readonly postService: PostRepository,
    private readonly userService: UserRepository
  ) {}

  // Create a new comment
  @Post()
  // @UseGuards(AuthGuard('jwt')) // Assuming JWT authentication
  @UsePipes(new ValidationPipe())
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    const { authorId, postId, ...comment } = createCommentDto;
    const [author, post] = await Promise.all([
      this.userService.userRepository.findOne({
        where: {
          id: authorId,
        },
      }),
      this.postService.postRepository.findOne({
        where: {
          id: postId,
        },
      }),
    ]);
    if (!author) {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    }
    if (!post) {
      throw new HttpException('No such post', HttpStatus.NOT_FOUND);
    }
    Object.assign(comment, {
      author,
      post,
    });
    const createdEntry = this.commentService.commentRepository.create(
      comment as Partial<Comment>
    );
    await this.commentService.commentRepository.save(createdEntry);
    return createdEntry;
  }

  // Get all comments (possibly with filtering/pagination)
  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.commentService.commentRepository.find();
  }

  // Get a comment by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return await this.commentService.commentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  // Update a comment by ID
  @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResult> {
    return await this.commentService.commentRepository.update(
      id,
      updateCommentDto
    );
  }

  // Delete a comment by ID
  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.commentService.commentRepository.delete({
      id,
    });
  }
}
