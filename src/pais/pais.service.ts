import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarPaisDTO, CrearPaisDTO, PaisDTO } from './dtos/pais.dto';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisesRepository: Repository<Pais>,
  ) {}

  async obtenerTodos(): Promise<PaisDTO[]> {
    return this.paisesRepository.find();
  }

  async buscar(campo: string, valor: any): Promise<PaisDTO[]> {
    return await this.paisesRepository.find({ [campo]: valor });
  }

  async obtenerPorID(paisId: string): Promise<PaisDTO> {
    const pais = await this.paisesRepository.findOne({ id: paisId });
    if (!pais)
      throw new BadRequestException(
        `El paisId: ${paisId} no existe en la Base de Datos`,
      );
    return pais;
  }

  async obtenerPaisPorCodigo(codigo: string): Promise<PaisDTO> {
    const pais = await this.paisesRepository.findOne({ codigo });
    if (!pais)
      throw new BadRequestException(
        `El código: ${codigo} no existe en la Base de Datos `,
      );

    return pais;
  }

  async validarPaisPorCodigo(codigo: string): Promise<PaisDTO> {
    return await this.paisesRepository.findOne({ codigo });
  }

  async crearPais(pais: CrearPaisDTO): Promise<PaisDTO> {
    const paisExiste = await this.paisesRepository.findOne({
      codigo: pais.codigo,
    });

    if (paisExiste)
      throw new BadRequestException(
        'El Código del país ya existe en la Base de Datos',
      );

    const paisCreado = this.paisesRepository.create(pais);
    return await this.paisesRepository.save(paisCreado);
  }

  async actualizarPais(
    paisId: string,
    paisActualizado: ActualizarPaisDTO,
  ): Promise<PaisDTO> {
    const pais = await this.obtenerPorID(paisId);
    const paisAsignado = Object.assign(pais, paisActualizado);
    return await this.paisesRepository.save(paisAsignado);
  }

  async eliminarPais(paisId: string): Promise<PaisDTO> {
    const pais = await this.obtenerPorID(paisId);
    return await this.paisesRepository.remove(pais);
  }
}
