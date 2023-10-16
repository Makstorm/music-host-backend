import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { PlaylistEntity } from './playlist.entity';
import { RoleType } from 'src/core';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  public email: string;

  @Column()
  public userName: string;

  @Column()
  public passwordHash: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  public role: RoleType;

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  public playlists: PlaylistEntity[];
}
