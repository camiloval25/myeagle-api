import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Departamento } from 'src/departamento/entities';
import { Usuario } from 'src/usuario/entities/usuarios.entity';

export class MunicipioDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  departamentoId: Departamento;

  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  sigla: string;

  @IsBoolean()
  favorito: boolean;

  @IsString()
  usuarioCreacion: Usuario;

  @IsString()
  @IsOptional()
  usuarioModificacion: Usuario;

  @IsString()
  @IsOptional()
  equipoCreacion: string;

  @IsString()
  @IsOptional()
  equipoModificacion: string;

  @IsDate()
  fechaCreacion: Date;

  @IsDate()
  @IsOptional()
  fechaModificacion: Date;
}

export class CrearMunicipioDTO extends PartialType(
  OmitType(MunicipioDTO, [
    'id',
    'usuarioModificacion',
    'equipoModificacion',
    'fechaCreacion',
    'fechaModificacion',
  ] as const),
) {}

export class ActualizarMunicipioDTO extends PartialType(MunicipioDTO) {}
