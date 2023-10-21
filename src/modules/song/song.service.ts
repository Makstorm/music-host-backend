import {
  ISongService,
  IStorageService,
  SongEntity,
  StorageServiceTag,
  UploadSongDto,
} from '@domain';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import * as fileType from 'file-type';

@Injectable()
export class SongService implements ISongService {
  @InjectRepository(SongEntity)
  private readonly repository: Repository<SongEntity>;

  @Inject(StorageServiceTag) private readonly storageService: IStorageService;

  public async create(
    dto: UploadSongDto,
    file: Express.Multer.File,
  ): Promise<SongEntity> {
    const songEntity = new SongEntity();

    songEntity.name = dto.name;
    songEntity.albumId = dto.albumId;

    const song = await this.repository.save(songEntity);

    await this.storageService.save(file, song.id);

    return songEntity;
  }

  public async getAll(): Promise<SongEntity[]> {
    return await this.repository.find();
  }

  public async getOne(id: string): Promise<SongEntity> {
    const song = await this.repository.findOne({ where: { id } });

    if (!song) {
      throw new NotFoundException(`Song with id ${id} does not exist`);
    }
    return song;
  }

  public async update(id: string, dto: UploadSongDto): Promise<SongEntity> {
    const song = await this.getOne(id);

    const updatedSong = Object.assign(song, dto);

    return await this.repository.save(updatedSong);
  }

  public async delete(id: string): Promise<SongEntity> {
    const song = await this.getOne(id);

    await this.storageService.delete(id);

    return await this.repository.remove(song);
  }
}
