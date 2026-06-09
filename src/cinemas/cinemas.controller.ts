import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateSalaDto } from './dto/create-sala.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { CreateSessaoDto } from './dto/create-sessao.dto';

@ApiTags('cinemas')
@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um cinema' })
  @ApiResponse({ status: 201, description: 'Cinema criado com sucesso.' })
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemasService.create(createCinemaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cinemas' })
  findAll() {
    return this.cinemasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cinema por ID' })
  findOne(@Param('id') id: string) {
    return this.cinemasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cinema' })
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemasService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cinema' })
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(+id);
  }

  @Post(':id/salas')
  @ApiOperation({ summary: 'Cadastrar sala no cinema' })
  cadastrarSala(
    @Param('id') id: string,
    @Body() createSalaDto: CreateSalaDto,
  ) {
    return this.cinemasService.cadastrarSala(+id, createSalaDto);
  }

  @Delete(':id/salas/:salaId')
  @ApiOperation({ summary: 'Remover sala do cinema' })
  removerSala(@Param('id') id: string, @Param('salaId') salaId: string) {
    return this.cinemasService.removerSala(+id, +salaId);
  }

  @Post(':id/filmes')
  @ApiOperation({ summary: 'Cadastrar filme no cinema' })
  cadastrarFilme(
    @Param('id') id: string,
    @Body() createFilmeDto: CreateFilmeDto,
  ) {
    return this.cinemasService.cadastrarFilme(+id, createFilmeDto);
  }

  @Delete(':id/filmes/:filmeId')
  @ApiOperation({ summary: 'Remover filme do cinema' })
  removerFilme(@Param('id') id: string, @Param('filmeId') filmeId: string) {
    return this.cinemasService.removerFilme(+id, +filmeId);
  }

  @Post(':id/sessoes')
  @ApiOperation({ summary: 'Cadastrar sessão no cinema' })
  cadastrarSessao(
    @Param('id') id: string,
    @Body() createSessaoDto: CreateSessaoDto,
  ) {
    return this.cinemasService.cadastrarSessao(+id, createSessaoDto);
  }

  @Delete(':id/sessoes/:sessaoId')
  @ApiOperation({ summary: 'Remover sessão do cinema' })
  removerSessao(
    @Param('id') id: string,
    @Param('sessaoId') sessaoId: string,
  ) {
    return this.cinemasService.removerSessao(+id, +sessaoId);
  }
}
