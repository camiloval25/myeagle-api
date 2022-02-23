import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartamentoService } from './departamento.service';
import {
  ActualizarDepartamentoDTO,
  CrearDepartamentoDTO,
} from './dtos/departamento.dto';

@ApiTags('Departamentos')
@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Get()
  async obtenerTodos() {
    return await this.departamentoService.obtenerTodos();
  }

  @Get('/buscar/:campo/:valor')
  async buscar(@Param('campo') campo: string, @Param('valor') valor: any) {
    return await this.departamentoService.buscar(campo, valor);
  }

  @Get('/id/:departamentoId')
  async obtenerDepartamentoPorID(
    @Param('departamentoId') departamentoId: string,
  ) {
    return await this.departamentoService.obtenerPorID(departamentoId);
  }

  @Get('/codigo/:codigo')
  async obtenerDepartamentoPorCodigo(@Param('codigo') codigo: string) {
    return await this.departamentoService.obtenerPorCodigo(codigo);
  }

  @Post()
  async crearDepartamento(@Body() departamento: CrearDepartamentoDTO) {
    return await this.departamentoService.crearDepartamento(departamento);
  }

  @Put(':departamentoId')
  async actualizarDepartamento(
    @Param('departamentoId') departamentoId: string,
    @Body() departamento: ActualizarDepartamentoDTO,
  ) {
    return await this.departamentoService.actualizarDepartamento(
      departamentoId,
      departamento,
    );
  }

  @Delete(':departamentoId')
  async eliminarDepartamento(@Param('departamentoId') departamentoId: string) {
    return await this.departamentoService.eliminarDepartamento(departamentoId);
  }
}
