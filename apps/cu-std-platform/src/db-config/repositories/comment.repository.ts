import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../models/CommentModel';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    public readonly commentRepository: Repository<Comment>,
    public readonly dataSource: DataSource
  ) {
    // this.dataSource.
  }
}
