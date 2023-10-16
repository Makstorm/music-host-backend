import {
  ArtistEntity,
  ArtistServiceTag,
  CreateArtistDto,
  IArtistService,
} from '@domain';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ArtistController')
@Controller('artist')
export class ArtistController {
  @Inject(ArtistServiceTag) private readonly service: IArtistService;

  @Post()
  public async create(@Body() dto: CreateArtistDto): Promise<ArtistEntity> {
    return await this.service.create(dto);
  }

  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    return await this.service.getOne(id);
  }

  @Get()
  public async getAll(): Promise<ArtistEntity[]> {
    return await this.service.getAll();
  }
}
