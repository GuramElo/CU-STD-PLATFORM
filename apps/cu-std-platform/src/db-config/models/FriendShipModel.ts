import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserModel';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn('uuid', {})
  id: string;

  @ManyToOne(() => User, (user) => user.friendConnections)
  user: User;

  @ManyToOne(() => User, (user) => user.friendConnectionsOf)
  friend: User;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
