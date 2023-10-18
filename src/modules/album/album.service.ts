import {
  AlbumsEntity,
  CreateAlbumDto,
  IAlbumService,
  UpdateAlbumDto,
} from '@domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService implements IAlbumService {
  @InjectRepository(AlbumsEntity)
  private readonly repository: Repository<AlbumsEntity>;

  public async create(dto: CreateAlbumDto): Promise<AlbumsEntity> {
    const albumEntity = new AlbumsEntity();

    albumEntity.name = dto.name;
    albumEntity.artistId = dto.artistId;

    return await this.repository.save(albumEntity);
  }

  public async getAll(): Promise<AlbumsEntity[]> {
    return await this.repository.find();
  }
  public async getOne(id: string): Promise<AlbumsEntity> {
    const album = await this.repository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} does not exist`);
    }

    return album;
  }

  public async update(id: string, dto: UpdateAlbumDto): Promise<AlbumsEntity> {
    const album = await this.getOne(id);

    const updatedAlbum = Object.assign(album, dto);

    return await this.repository.save(updatedAlbum);
  }
}
