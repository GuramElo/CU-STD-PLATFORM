import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { PostRepository } from './repositories/post.repository';
import { CommentRepository } from './repositories/comment.repository';
import { UsersController } from '../controllers/users.controller';
import { SOCIAL_MEDIA_PLATFORM_MODELS } from './models';
import { PostController } from '../controllers/posts.controller';
import { v4 as generateUUID } from 'uuid';

@Module({
  controllers: [UsersController, PostController],
  imports: [TypeOrmModule.forFeature([...SOCIAL_MEDIA_PLATFORM_MODELS])],
  providers: [UserRepository, PostRepository, CommentRepository],
  exports: [TypeOrmModule, PostRepository, CommentRepository, UserRepository],
})
export class SocialMediaPlatformModule {
  constructor() {
    Logger.log(generateUUID());
  }
}
