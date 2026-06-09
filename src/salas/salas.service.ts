import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservarPoltronaDto } from './dto/reservar-poltrona.dto';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) throw new NotFoundException(`Sala #${id} não encontrada`);
    return sala;
  }

  async reservarPoltrona(id: number, dto: ReservarPoltronaDto) {
    const sala = await this.findOne(id);
    const poltronas = sala.poltronas as number[][];

    const { fila, numero } = dto;
    if (fila < 0 || fila >= poltronas.length) {
      throw new BadRequestException('Fila inválida');
    }
    if (numero < 0 || numero >= poltronas[fila].length) {
      throw new BadRequestException('Assento inválido');
    }
    if (poltronas[fila][numero] === 1) {
      throw new BadRequestException('Poltrona já reservada');
    }

    poltronas[fila][numero] = 1;

    return this.prisma.sala.update({
      where: { id },
      data: { poltronas },
    });
  }

  async calcularCapacidade(id: number) {
    const sala = await this.findOne(id);
    const poltronas = sala.poltronas as number[][];

    const assentos = poltronas.flat();
    const disponiveis = assentos.filter((a) => a === 0).length;
    const reservadas = assentos.filter((a) => a === 1).length;

    return {
      id: sala.id,
      capacidade: sala.capacidade,
      disponiveis,
      reservadas,
    };
  }
}
