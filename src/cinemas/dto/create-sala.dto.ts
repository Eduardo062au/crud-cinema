import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  numero: number;

  @ApiProperty({ example: 50, description: 'Capacidade total da sala' })
  @IsInt()
  @Min(1)
  capacidade: number;

  @ApiProperty({ example: 5, description: 'Quantidade de filas' })
  @IsInt()
  @Min(1)
  filas: number;

  @ApiProperty({ example: 10, description: 'Assentos por fila' })
  @IsInt()
  @Min(1)
  assentosPorFila: number;
}
