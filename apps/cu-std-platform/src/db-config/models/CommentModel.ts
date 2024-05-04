import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as generateUUID } from 'uuid';
import { User } from './UserModel';
import { Post } from './PostModel';

@Entity()
export class Comment {
  @PrimaryColumn({ type: 'uuid', default: generateUUID() })
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments) // Post this comment belongs to
  post: Post;
}
