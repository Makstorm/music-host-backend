import { BadRequestException, Injectable } from '@nestjs/common';

import { IStorageService } from '@domain';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService implements IStorageService {
  private S3: S3Client;

  public constructor(private readonly configService: ConfigService) {
    this.S3 = new S3Client({
      region: 'auto',
      endpoint: `https://${this.configService.getOrThrow(
        'ACCOUNT_ID',
      )}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.getOrThrow('ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('SECRET_ACCESS_KEY'),
      },
    });
  }

  public async save(
    uploadedFile: Express.Multer.File,
    fileId: string,
  ): Promise<void> {
    try {
      await this.S3.send(
        new PutObjectCommand({
          Body: uploadedFile.buffer,
          Bucket: 'music-host',
          Key: fileId,
          ContentType: uploadedFile.mimetype,
        }),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async delete(fileId: string): Promise<void> {
    try {
      await this.S3.send(
        new DeleteObjectCommand({ Bucket: 'music-host', Key: fileId }),
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
