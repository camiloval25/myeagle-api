import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUsuarioDTO, UsuarioDTO } from './dtos';
import { Usuario } from './entities/usuarios.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async obtenerUsuarioPorID(usuarioId: string): Promise<UsuarioDTO> {
    return this.usuarioRepository.findOne({ id: usuarioId });
  }

  async obtenerUsuarioPorEmail(email: string): Promise<UsuarioDTO> {
    return this.usuarioRepository
      .createQueryBuilder('usuarios')
      .where({ email })
      .addSelect('usuarios.password')
      .getOne();
  }

  async crearUsuario(usuario: CrearUsuarioDTO): Promise<UsuarioDTO> {
    const usuarioCreacion = this.usuarioRepository.create(usuario);
    const usuarioCreado = await this.usuarioRepository.save(usuarioCreacion);

    delete usuarioCreado.password;
    return usuarioCreado;
  }
}
