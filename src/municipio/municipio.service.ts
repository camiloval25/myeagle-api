import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ActualizarMunicipioDTO,
  CrearMunicipioDTO,
  MunicipioDTO,
} from './dtos';
import { Municipio } from './entities';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async obtenerTodos(): Promise<MunicipioDTO[]> {
    return await this.municipioRepository.find();
  }

  async obtenerPorId(municipioId: string): Promise<MunicipioDTO> {
    const municipio = await this.municipioRepository.findOne({
      id: municipioId,
    });

    if (!municipio)
      throw new BadGatewayException(
        `El municipio con id: ${municipioId} no existe en la Base de Datos`,
      );

    return municipio;
  }

  async obtenerPorCodigo(codigo: string): Promise<MunicipioDTO> {
    const municipio = await this.municipioRepository.findOne({ codigo });

    if (!municipio)
      throw new BadRequestException(
        `El código: ${codigo} no existe en la Base de Datos`,
      );

    return municipio;
  }

  async crearMunicipio(municipio: CrearMunicipioDTO): Promise<MunicipioDTO> {
    const municipioExiste = await this.municipioRepository.findOne({
      codigo: municipio.codigo,
    });

    if (municipioExiste)
      throw new BadRequestException(
        `El código del Departamento ya existe en la Base de Datos`,
      );

    const municipioCreado = this.municipioRepository.create(municipio);
    return await this.municipioRepository.save(municipioCreado);
  }

  async actualizarMunicipio(
    municipioId: string,
    municipioActualizar: ActualizarMunicipioDTO,
  ): Promise<MunicipioDTO> {
    const municipio = await this.obtenerPorId(municipioId);
    const municipioAsignado = Object.assign(municipio, municipioActualizar);
    return await this.municipioRepository.save(municipioAsignado);
  }

  async eliminarMunicipio(municipioId: string) {
    const municipio = await this.obtenerPorId(municipioId);
    return await this.municipioRepository.remove(municipio);
  }
}