import { ArtistEntity } from '../../entities';
import { CreateArtistDto, UpdateArtistDto } from '../../models';

export interface IArtistService {
  create(dto: CreateArtistDto): Promise<ArtistEntity>;
  getAll(): Promise<ArtistEntity[]>;
  getOne(id: string): Promise<ArtistEntity>;
  update(id: string, dto: UpdateArtistDto): Promise<ArtistEntity>;
}
