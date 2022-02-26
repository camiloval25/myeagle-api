import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodigoSecuenciaDTO } from 'src/common/dtos/codigo-secuencia';
import { Repository } from 'typeorm';
import {
  ActualizarDepartamentoDTO,
  CrearDepartamentoDTO,
  DepartamentoDTO,
} from './dtos/departamento.dto';
import { Departamento } from './entities';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async obtenerTodos(): Promise<DepartamentoDTO[]> {
    return await this.departamentoRepository.find({ loadRelationIds: true });
  }

  async buscar(campo: string, valor: any): Promise<DepartamentoDTO[]> {
    return await this.departamentoRepository.find({ [campo]: valor });
  }

  
  async cargarSecuencia(): Promise<CodigoSecuenciaDTO> {
    const maximoCodigo = await this.departamentoRepository.createQueryBuilder('departamentos')
      .select('MAX(departamentos.codigo)', 'codigo')
      .getRawOne()

    const validarTipoCodigo = parseInt(maximoCodigo.codigo);
    if(!validarTipoCodigo) {
      return {codigo: '1'}
    }

    const codigoIncrementado = validarTipoCodigo + 1
    return {codigo: codigoIncrementado.toString()};
  }

  async obtenerPorID(departamentoId: string): Promise<DepartamentoDTO> {
    const departamento = await this.departamentoRepository.findOne(
      {
        id: departamentoId,
      },
      { loadRelationIds: true },
    );

    if (!departamento)
      throw new BadRequestException(
        `El departamentoId: ${departamentoId} no existe en la Base de Datos`,
      );

    return departamento;
  }

  async obtenerPorCodigo(codigo: string): Promise<DepartamentoDTO> {
    const departamento = await this.departamentoRepository.findOne(
      {
        codigo,
      },
      { loadRelationIds: true },
    );

    if (!departamento)
      throw new BadRequestException(
        `El código: ${codigo} no existe en la Base de Datos`,
      );

    return departamento;
  }

  async crearDepartamento(
    departamento: CrearDepartamentoDTO,
  ): Promise<DepartamentoDTO> {
    const departamentoExiste = await this.departamentoRepository.findOne({
      codigo: departamento.codigo,
    });

    if (departamentoExiste)
      throw new BadRequestException(
        `El código del Departamento ya existe en la Base de Datos`,
      );

    const departamentoCreado = this.departamentoRepository.create(departamento);
    return await this.departamentoRepository.save(departamentoCreado);
  }

  async actualizarDepartamento(
    departamentoId: string,
    departamentoActualizar: ActualizarDepartamentoDTO,
  ): Promise<DepartamentoDTO> {
    const departamento = await this.obtenerPorID(departamentoId);
    const departamentoAsignado = Object.assign(
      departamento,
      departamentoActualizar,
    );
    return await this.departamentoRepository.save(departamentoAsignado);
  }

  async eliminarDepartamento(departamentoId: string): Promise<DepartamentoDTO> {
    const departamento = await this.obtenerPorID(departamentoId);
    return await this.departamentoRepository.remove(departamento);
  }
}
