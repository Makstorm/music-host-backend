import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {
  SongModel,
  SongServiceTag,
  UpdateSongDto,
  UploadSongDto,
} from '@domain';
import { ISongService } from 'src/domain/interfaces/services/song.service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';

@ApiTags('SongController')
@Controller('song')
export class SongController {
  @Inject(SongServiceTag) private readonly service: ISongService;

  @ApiResponse({ type: SongModel })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
          description: 'Song name',
          example: 'Do I Wanna Know?',
        },
        albumId: {
          type: 'string',
          description: 'Belonging album',
          example: randomUUID(),
        },
      },
    },
  })
  public async create(
    @Body() dto: UploadSongDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /\.(mp3|mpeg|m4a|mpga)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<SongModel> {
    const entity = await this.service.create(dto, file);
    return SongModel.formEntity(entity);
  }

  @ApiResponse({ type: [SongModel] })
  @Get()
  public async getAll(): Promise<SongModel[]> {
    const entityArray = await this.service.getAll();
    return entityArray.map((entity) => SongModel.formEntity(entity));
  }

  @ApiResponse({ type: SongModel })
  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SongModel> {
    const entity = await this.service.getOne(id);
    return SongModel.formEntity(entity);
  }

  @ApiResponse({ type: SongModel })
  @Put()
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSongDto,
  ): Promise<SongModel> {
    const entity = await this.service.update(id, dto);
    return SongModel.formEntity(entity);
  }

  @ApiResponse({ type: SongModel })
  @Delete('/:id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SongModel> {
    const entity = await this.service.delete(id);
    return SongModel.formEntity(entity);
  }
}
