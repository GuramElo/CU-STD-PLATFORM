import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../models/UserModel';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    public readonly dataSource: DataSource
  ) {
    // this.dataSource.
  }
}
