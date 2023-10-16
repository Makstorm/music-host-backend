import { ArtistEntity, CreateArtistDto, IArtistService } from '@domain';
import { Injectable } from '@nestjs/common';
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
    return this.rerpository.findOne({ where: { id } });
  }
}
