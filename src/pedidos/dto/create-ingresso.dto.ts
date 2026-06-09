import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, Min } from 'class-validator';

export class CreateIngressoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  sessaoId: number;

  @ApiProperty({ example: 40.0 })
  @IsNumber()
  @Min(0)
  valorInteira: number;

  @ApiProperty({ example: 20.0 })
  @IsNumber()
  @Min(0)
  valorMeia: number;

  @ApiProperty({ example: 'inteira', enum: ['inteira', 'meia'] })
  @IsIn(['inteira', 'meia'])
  tipo: 'inteira' | 'meia';
}
