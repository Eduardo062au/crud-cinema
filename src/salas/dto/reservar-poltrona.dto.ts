import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class ReservarPoltronaDto {
  @ApiProperty({ example: 0, description: 'Índice da fila (começa em 0)' })
  @IsInt()
  @Min(0)
  fila: number;

  @ApiProperty({ example: 3, description: 'Número do assento na fila (começa em 0)' })
  @IsInt()
  @Min(0)
  numero: number;
}
