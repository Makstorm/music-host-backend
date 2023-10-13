import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstarct.entity';
import { AlbumsEntity } from './album.entity';

@Entity('artists')
export class ArtistEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column()
  public biography: string;

  @Column()
  public genre: string;

  @OneToMany(() => AlbumsEntity, (album) => album.artist)
  public albums: AlbumsEntity[];
}
