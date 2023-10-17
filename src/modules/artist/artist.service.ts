import {
  ArtistEntity,
  CreateArtistDto,
  IArtistService,
  UpdateArtistDto,
} from '@domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService implements IArtistService {
  @InjectRepository(ArtistEntity)
  private readonly rerpository: Repository<ArtistEntity>;

  public async create(dto: CreateArtistDto): Promise<ArtistEntity> {
    const artistEntity = new ArtistEntity();

    artistEntity.name = dto.name;
    artistEntity.biography = dto.biography;
    artistEntity.genre = dto.genre;

    return await this.rerpository.save(artistEntity);
  }
  public async getAll(): Promise<ArtistEntity[]> {
    return await this.rerpository.find();
  }
  public async getOne(id: string): Promise<ArtistEntity> {
    const artist = await this.rerpository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} does not exist`);
    }
    return artist;
  }

  public async update(id: string, dto: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = await this.getOne(id);

    const updatedArtist = Object.assign(artist, dto);

    return await this.rerpository.save(updatedArtist);
  }
}
