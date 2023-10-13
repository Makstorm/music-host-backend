import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { UserEntity } from './user.entity';

@Entity('playlists')
export class PlaylistEntity extends AbstractEntity {
  @Column()
  public name: string;

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @Column({ name: 'user_id' })
  public userId: string;
}
