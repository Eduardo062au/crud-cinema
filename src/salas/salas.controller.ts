import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SalasService } from './salas.service';
import { ReservarPoltronaDto } from './dto/reservar-poltrona.dto';

@ApiTags('salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sala por ID' })
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(+id);
  }

  @Post(':id/reservar-poltrona')
  @ApiOperation({ summary: 'Reservar poltrona na sala' })
  reservarPoltrona(
    @Param('id') id: string,
    @Body() dto: ReservarPoltronaDto,
  ) {
    return this.salasService.reservarPoltrona(+id, dto);
  }

  @Get(':id/capacidade')
  @ApiOperation({ summary: 'Calcular capacidade disponível da sala' })
  calcularCapacidade(@Param('id') id: string) {
    return this.salasService.calcularCapacidade(+id);
  }
}
