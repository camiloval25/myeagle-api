import { OmitType } from '@nestjs/swagger';
import { UsuarioDTO } from './usuario.dto';

export class CrearUsuarioDTO extends OmitType(UsuarioDTO, [
  'id',
  'fechaCreacion',
] as const) {}
