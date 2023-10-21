import { SongEntity } from 'src/domain/entities';
import { UploadSongDto } from '../../models';

export interface ISongService {
  create(dto: UploadSongDto, file: Express.Multer.File): Promise<SongEntity>;
  getAll(): Promise<SongEntity[]>;
  getOne(id: string): Promise<SongEntity>;
  update(id: string, dto: UploadSongDto): Promise<SongEntity>;
  delete(id: string): Promise<SongEntity>;
}
