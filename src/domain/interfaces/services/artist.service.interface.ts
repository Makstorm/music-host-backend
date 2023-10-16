import { ArtistEntity } from '../../entities';
import { CreateArtistDto } from '../../models';

export interface IArtistService {
  create(dto: CreateArtistDto): Promise<ArtistEntity>;
  getAll(): Promise<ArtistEntity[]>;
  getOne(id: string): Promise<ArtistEntity>;
}