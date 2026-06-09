import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  @ApiProperty({ example: 'CineMax Center' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Av. Paulista, 1000 - São Paulo' })
  @IsString()
  @IsNotEmpty()
  endereco: string;
}
