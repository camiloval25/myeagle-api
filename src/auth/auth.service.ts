import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioLogueadoDTO } from 'src/usuario/dtos';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UsuarioLogueadoDTO> {
    const usuario = await this.usuarioService.obtenerUsuarioPorEmail(email);
    if (usuario && usuario.password === password) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: UsuarioLogueadoDTO) {
    const payload = { sub: usuario.id };
    return { id: usuario.id, accessToken: this.jwtService.sign(payload) };
  }
}
