import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrearUsuarioDTO } from './dtos';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() usuario: CrearUsuarioDTO) {
    return await this.usuarioService.crearUsuario(usuario);
  }
}
