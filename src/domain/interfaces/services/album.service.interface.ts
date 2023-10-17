import { AlbumsEntity } from '../../entities';
import { CreateAlbumDto, UpdateAlbumDto } from '../../models';

export interface IAlbumService {
  create(dto: CreateAlbumDto): Promise<AlbumsEntity>;
  getAll(): Promise<AlbumsEntity[]>;
  getOne(id: string): Promise<AlbumsEntity>;
  update(id: string, dto: UpdateAlbumDto): Promise<AlbumsEntity>;
}
