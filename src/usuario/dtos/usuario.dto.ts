import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class UsuarioDTO {
  @IsUUID('4')
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  primerNombre: string;

  @IsString()
  @IsOptional()
  segundoNombre: string;

  @IsString()
  primerApellido: string;

  @IsString()
  @IsOptional()
  segundoApellido: string;

  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @IsDate()
  fechaCreacion: Date;
}
