import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { CreateLancheDto } from './dto/create-lanche.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  create() {
    return this.prisma.pedido.create({ data: {} });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: { ingressos: true, lanches: true },
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingressos: { include: { sessao: { include: { filme: true } } } },
        lanches: true,
      },
    });
    if (!pedido) throw new NotFoundException(`Pedido #${id} não encontrado`);
    return pedido;
  }

  remove(id: number) {
    return this.prisma.pedido.delete({ where: { id } });
  }

  async adicionarIngresso(pedidoId: number, dto: CreateIngressoDto) {
    await this.findOne(pedidoId);

    const sessao = await this.prisma.sessao.findUnique({
      where: { id: dto.sessaoId },
    });
    if (!sessao) {
      throw new NotFoundException(`Sessão #${dto.sessaoId} não encontrada`);
    }

    const valor =
      dto.tipo === 'inteira' ? dto.valorInteira : dto.valorMeia;

    const ingresso = await this.prisma.ingresso.create({
      data: {
        valorInteira: dto.valorInteira,
        valorMeia: dto.valorMeia,
        tipo: dto.tipo,
        sessaoId: dto.sessaoId,
        pedidoId,
      },
    });

    const updateData: {
      valorTotal: { increment: number };
      qtInteira?: { increment: number };
      qtMeia?: { increment: number };
    } = { valorTotal: { increment: valor } };
    if (dto.tipo === 'inteira') updateData.qtInteira = { increment: 1 };
    if (dto.tipo === 'meia') updateData.qtMeia = { increment: 1 };

    const pedido = await this.prisma.pedido.update({
      where: { id: pedidoId },
      data: updateData,
      include: { ingressos: true, lanches: true },
    });

    return { ingresso, pedido };
  }

  async removerIngresso(pedidoId: number, ingressoId: number) {
    const pedido = await this.findOne(pedidoId);

    const ingresso = pedido.ingressos.find((i) => i.id === ingressoId);
    if (!ingresso) {
      throw new NotFoundException(
        `Ingresso #${ingressoId} não pertence ao pedido #${pedidoId}`,
      );
    }

    const valor =
      ingresso.tipo === 'inteira'
        ? ingresso.valorInteira
        : ingresso.valorMeia;

    await this.prisma.ingresso.delete({ where: { id: ingressoId } });

    const updateData: {
      valorTotal: { decrement: number };
      qtInteira?: { decrement: number };
      qtMeia?: { decrement: number };
    } = { valorTotal: { decrement: valor } };
    if (ingresso.tipo === 'inteira') updateData.qtInteira = { decrement: 1 };
    if (ingresso.tipo === 'meia') updateData.qtMeia = { decrement: 1 };

    return this.prisma.pedido.update({
      where: { id: pedidoId },
      data: updateData,
      include: { ingressos: true, lanches: true },
    });
  }

  async adicionaLanche(pedidoId: number, dto: CreateLancheDto) {
    await this.findOne(pedidoId);

    const subtotal = dto.valorUnitario * dto.qtUnidade;

    const lanche = await this.prisma.lancheCombo.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        valorUnitario: dto.valorUnitario,
        qtUnidade: dto.qtUnidade,
        subtotal,
        pedidoId,
      },
    });

    const pedido = await this.prisma.pedido.update({
      where: { id: pedidoId },
      data: { valorTotal: { increment: subtotal } },
      include: { ingressos: true, lanches: true },
    });

    return { lanche, pedido };
  }

  async removerLanche(pedidoId: number, lancheId: number) {
    const pedido = await this.findOne(pedidoId);

    const lanche = pedido.lanches.find((l) => l.id === lancheId);
    if (!lanche) {
      throw new NotFoundException(
        `Lanche #${lancheId} não pertence ao pedido #${pedidoId}`,
      );
    }

    await this.prisma.lancheCombo.delete({ where: { id: lancheId } });

    return this.prisma.pedido.update({
      where: { id: pedidoId },
      data: { valorTotal: { decrement: lanche.subtotal } },
      include: { ingressos: true, lanches: true },
    });
  }
}
