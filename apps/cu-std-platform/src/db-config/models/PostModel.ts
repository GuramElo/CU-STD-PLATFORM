import { v4 as generateUUID } from 'uuid';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './UserModel';
import { Comment } from './CommentModel';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string; // HTML content

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts) // User who created the post
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post) // Comments on the post
  comments: Comment[];
}
