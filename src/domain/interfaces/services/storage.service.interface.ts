export interface IStorageService {
  save(file: Express.Multer.File, songId: string): Promise<void>;
  delete(fileId: string): Promise<void>;
}
