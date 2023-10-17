import {
  ArtistModel,
  ArtistServiceTag,
  CreateArtistDto,
  IArtistService,
  UpdateArtistDto,
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

@ApiTags('ArtistController')
@Controller('artist')
export class ArtistController {
  @Inject(ArtistServiceTag) private readonly service: IArtistService;

  @ApiResponse({ type: ArtistModel })
  @Post()
  public async create(@Body() dto: CreateArtistDto): Promise<ArtistModel> {
    const entitty = await this.service.create(dto);
    return ArtistModel.formEntity(entitty);
  }

  @ApiResponse({ type: ArtistModel })
  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistModel> {
    const entity = await this.service.getOne(id);
    return ArtistModel.formEntity(entity);
  }

  @ApiResponse({ type: [ArtistModel] })
  @Get()
  public async getAll(): Promise<ArtistModel[]> {
    const entities = await this.service.getAll();
    return entities.map((entity) => ArtistModel.formEntity(entity));
  }

  @ApiResponse({ type: ArtistModel })
  @Put('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    const entity = await this.service.update(id, dto);
    return ArtistModel.formEntity(entity);
  }
}
