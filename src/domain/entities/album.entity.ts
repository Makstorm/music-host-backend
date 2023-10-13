import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { ArtistEntity } from './artist.entity';
import { SongEntity } from './song.entity';

@Entity('albums')
export class AlbumsEntity extends AbstractEntity {
  @Column()
  public name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums)
  @JoinColumn({ name: 'artist_id' })
  public artist: ArtistEntity;

  @Column({ name: 'artist_id' })
  public artistId: string;

  @OneToMany(() => SongEntity, (song) => song.album)
  public songs: SongEntity[];
}
