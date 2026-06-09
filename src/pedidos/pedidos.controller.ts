import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PedidosService } from './pedidos.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { CreateLancheDto } from './dto/create-lanche.dto';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  create() {
    return this.pedidosService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pedido' })
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }

  @Post(':id/ingressos')
  @ApiOperation({ summary: 'Adicionar ingresso ao pedido' })
  adicionarIngresso(
    @Param('id') id: string,
    @Body() dto: CreateIngressoDto,
  ) {
    return this.pedidosService.adicionarIngresso(+id, dto);
  }

  @Delete(':id/ingressos/:ingressoId')
  @ApiOperation({ summary: 'Remover ingresso do pedido' })
  removerIngresso(
    @Param('id') id: string,
    @Param('ingressoId') ingressoId: string,
  ) {
    return this.pedidosService.removerIngresso(+id, +ingressoId);
  }

  @Post(':id/lanches')
  @ApiOperation({ summary: 'Adicionar lanche combo ao pedido' })
  adicionaLanche(@Param('id') id: string, @Body() dto: CreateLancheDto) {
    return this.pedidosService.adicionaLanche(+id, dto);
  }

  @Delete(':id/lanches/:lancheId')
  @ApiOperation({ summary: 'Remover lanche combo do pedido' })
  removerLanche(
    @Param('id') id: string,
    @Param('lancheId') lancheId: string,
  ) {
    return this.pedidosService.removerLanche(+id, +lancheId);
  }
}
