import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Pais } from 'src/pais/entities/pais.entity';
import { Usuario } from 'src/usuario/entities/usuarios.entity';

export class DepartamentoDTO {
  @IsUUID('4')
  @IsOptional()
  id: string;

  @IsString()
  paisId: Pais;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

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

export class CrearDepartamentoDTO extends PartialType(OmitType(DepartamentoDTO, [
  'id',
  'usuarioModificacion',
  'equipoModificacion',
  'fechaCreacion',
  'fechaModificacion',
] as const)) {}

export class ActualizarDepartamentoDTO extends PartialType(DepartamentoDTO) {}
