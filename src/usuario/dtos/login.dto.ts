import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UsuarioDTO } from './usuario.dto';

export class UsuarioLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UsuarioLogueadoDTO extends PartialType(UsuarioDTO) {}
