import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany } from 'typeorm';
import { v4 as generateUUID } from 'uuid';
import { Post } from './PostModel';
import { Comment } from './CommentModel';
import { IPreferences } from '../interfaces/UserInterfaces';
@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid', default: generateUUID() })
  id: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ nullable: true, type: 'varchar' }) // Refresh token can be null initially
  refresh_token: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences: IPreferences;

  @OneToMany(() => Post, (post) => post.author, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @ManyToMany(() => User, (user) => user.friends)
  friends: User[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
