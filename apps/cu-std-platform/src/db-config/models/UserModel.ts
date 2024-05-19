import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Post } from './PostModel';
import { Comment } from './CommentModel';
import { IPreferences } from '../interfaces/UserInterfaces';
import { Friendship } from './FriendShipModel';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true, type: 'varchar', length: 50 })
  username: string;

  @Index()
  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ nullable: true, type: 'varchar' }) // Refresh token can be null initially
  refresh_token: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences: IPreferences;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.author, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Friendship, (friendship) => friendship.user)
  friendConnections: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.friend)
  friendConnectionsOf: Friendship[];
}
