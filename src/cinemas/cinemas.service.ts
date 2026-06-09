import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CreateSalaDto } from './dto/create-sala.dto';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { CreateSessaoDto } from './dto/create-sessao.dto';

@Injectable()
export class CinemasService {
  constructor(private prisma: PrismaService) {}

  create(createCinemaDto: CreateCinemaDto) {
    return this.prisma.cinema.create({ data: createCinemaDto });
  }

  findAll() {
    return this.prisma.cinema.findMany({
      include: { salas: true, filmes: true, sessoes: true },
    });
  }

  async findOne(id: number) {
    const cinema = await this.prisma.cinema.findUnique({
      where: { id },
      include: {
        salas: true,
        filmes: true,
        sessoes: { include: { filme: true, sala: true } },
      },
    });
    if (!cinema) throw new NotFoundException(`Cinema #${id} não encontrado`);
    return cinema;
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return this.prisma.cinema.update({
      where: { id },
      data: updateCinemaDto,
    });
  }

  remove(id: number) {
    return this.prisma.cinema.delete({ where: { id } });
  }

  async cadastrarSala(cinemaId: number, createSalaDto: CreateSalaDto) {
    await this.findOne(cinemaId);

    const { filas, assentosPorFila, capacidade, numero } = createSalaDto;
    if (filas * assentosPorFila < capacidade) {
      throw new BadRequestException(
        'filas × assentosPorFila deve ser >= capacidade',
      );
    }

    const poltronas = Array.from({ length: filas }, () =>
      Array(assentosPorFila).fill(0),
    );

    return this.prisma.sala.create({
      data: {
        numero,
        capacidade,
        poltronas,
        cinemaId,
      },
    });
  }

  async removerSala(cinemaId: number, salaId: number) {
    const sala = await this.prisma.sala.findFirst({
      where: { id: salaId, cinemaId },
    });
    if (!sala) {
      throw new NotFoundException(
        `Sala #${salaId} não encontrada no cinema #${cinemaId}`,
      );
    }
    return this.prisma.sala.delete({ where: { id: salaId } });
  }

  async cadastrarFilme(cinemaId: number, createFilmeDto: CreateFilmeDto) {
    await this.findOne(cinemaId);

    return this.prisma.filme.create({
      data: {
        ...createFilmeDto,
        dataIniciaExibicao: new Date(createFilmeDto.dataIniciaExibicao),
        dataFinalExibicao: new Date(createFilmeDto.dataFinalExibicao),
        cinemaId,
      },
    });
  }

  async removerFilme(cinemaId: number, filmeId: number) {
    const filme = await this.prisma.filme.findFirst({
      where: { id: filmeId, cinemaId },
    });
    if (!filme) {
      throw new NotFoundException(
        `Filme #${filmeId} não encontrado no cinema #${cinemaId}`,
      );
    }
    return this.prisma.filme.delete({ where: { id: filmeId } });
  }

  async cadastrarSessao(cinemaId: number, createSessaoDto: CreateSessaoDto) {
    await this.findOne(cinemaId);

    const filme = await this.prisma.filme.findFirst({
      where: { id: createSessaoDto.filmeId, cinemaId },
    });
    if (!filme) {
      throw new NotFoundException(
        `Filme #${createSessaoDto.filmeId} não pertence ao cinema #${cinemaId}`,
      );
    }

    const sala = await this.prisma.sala.findFirst({
      where: { id: createSessaoDto.salaId, cinemaId },
    });
    if (!sala) {
      throw new NotFoundException(
        `Sala #${createSessaoDto.salaId} não pertence ao cinema #${cinemaId}`,
      );
    }

    return this.prisma.sessao.create({
      data: {
        horarioExibicao: new Date(createSessaoDto.horarioExibicao),
        filmeId: createSessaoDto.filmeId,
        salaId: createSessaoDto.salaId,
        cinemaId,
      },
      include: { filme: true, sala: true },
    });
  }

  async removerSessao(cinemaId: number, sessaoId: number) {
    const sessao = await this.prisma.sessao.findFirst({
      where: { id: sessaoId, cinemaId },
    });
    if (!sessao) {
      throw new NotFoundException(
        `Sessão #${sessaoId} não encontrada no cinema #${cinemaId}`,
      );
    }
    return this.prisma.sessao.delete({ where: { id: sessaoId } });
  }
}
