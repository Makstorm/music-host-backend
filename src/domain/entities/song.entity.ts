import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { AlbumsEntity } from './album.entity';

@Entity('songs')
export class SongEntity extends AbstractEntity {
  @Column()
  public name: string;

  @ManyToOne(() => AlbumsEntity, (album) => album.songs)
  @JoinColumn({ name: 'album_id' })
  public album: AlbumsEntity;

  @Column({ name: 'album_id' })
  public albumId: string;
}
