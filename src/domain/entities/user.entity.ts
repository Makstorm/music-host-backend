import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  public email: string;

  @Column()
  public userName: string;

  @Column()
  public passwordHash: string;

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  public playlists: PlaylistEntity[];
}
