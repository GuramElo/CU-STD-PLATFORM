import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../models/PostModel';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    public readonly postRepository: Repository<Post>,
    public readonly dataSource: DataSource
  ) {
    // this.dataSource.
  }
}
