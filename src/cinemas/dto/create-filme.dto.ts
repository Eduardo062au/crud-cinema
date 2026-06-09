import { ApiProperty } from '@nestjs/swagger';
import { Genero } from '../../../generated/prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateFilmeDto {
  @ApiProperty({ example: 'O Poderoso Chefão' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'A saga da família Corleone...' })
  @IsString()
  @IsNotEmpty()
  sinopse: string;

  @ApiProperty({ example: '18 anos' })
  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @ApiProperty({ example: 175, description: 'Duração em minutos' })
  @IsInt()
  @Min(1)
  duracao: number;

  @ApiProperty({ example: 'Marlon Brando, Al Pacino' })
  @IsString()
  @IsNotEmpty()
  elenco: string;

  @ApiProperty({ enum: Genero, example: Genero.DRAMA })
  @IsEnum(Genero)
  genero: Genero;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  dataIniciaExibicao: string;

  @ApiProperty({ example: '2026-03-31' })
  @IsDateString()
  dataFinalExibicao: string;
}
