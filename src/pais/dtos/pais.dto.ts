import { PartialType, OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Usuario } from 'src/usuario/entities/usuarios.entity';

export class PaisDTO {
  @IsUUID('4')
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  sigla: string;

  @IsBoolean()
  @IsOptional()
  favorito: boolean;

  @IsString()
  usuarioCreacion: Usuario;

  @IsOptional()
  usuarioModificacion: Usuario;

  @IsString()
  equipoCreacion: string;

  @IsString()
  @IsOptional()
  equipoModificacion: string;

  @IsDate()
  @IsOptional()
  fechaCreacion: Date;

  @IsDate()
  @IsOptional()
  fechaModificacion: Date;
}

export class CrearPaisDTO extends PartialType(
  OmitType(PaisDTO, [
    'id',
    'usuarioModificacion',
    'equipoModificacion',
    'fechaCreacion',
    'fechaModificacion',
  ] as const),
) {}

export class ActualizarPaisDTO extends PartialType(CrearPaisDTO) {}