import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateLancheDto {
  @ApiProperty({ example: 'Combo Pipoca M' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Pipoca média + refrigerante 500ml' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  @Min(0)
  valorUnitario: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  qtUnidade: number;
}
