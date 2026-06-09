import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateSessaoDto {
  @ApiProperty({ example: '2026-06-15T19:30:00.000Z' })
  @IsDateString()
  horarioExibicao: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  filmeId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  salaId: number;
}
