import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageServiceTag } from '@domain';

@Module({
  providers: [{ provide: StorageServiceTag, useClass: StorageService }],
  exports: [StorageServiceTag],
})
export class StorageModule {}
