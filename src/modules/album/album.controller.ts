import {
  AlbumModel,
  AlbumServiceTag,
  CreateAlbumDto,
  IAlbumService,
  UpdateAlbumDto,
} from '@domain';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AlbumControler')
@Controller('album')
export class AlbumController {
  @Inject(AlbumServiceTag) private readonly service: IAlbumService;

  @ApiResponse({ type: AlbumModel })
  @Post()
  public async create(@Body() dto: CreateAlbumDto): Promise<AlbumModel> {
    const entitty = await this.service.create(dto);
    return AlbumModel.formEntity(entitty);
  }

  @ApiResponse({ type: AlbumModel })
  @Get()
  public async getAll(): Promise<AlbumModel[]> {
    const entities = await this.service.getAll();
    return entities.map((entity) => AlbumModel.formEntity(entity));
  }

  @ApiResponse({ type: AlbumModel })
  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumModel> {
    const entity = await this.service.getOne(id);
    return AlbumModel.formEntity(entity);
  }

  @ApiResponse({ type: AlbumModel })
  @Put('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    const entity = await this.service.update(id, dto);
    return AlbumModel.formEntity(entity);
  }
}
