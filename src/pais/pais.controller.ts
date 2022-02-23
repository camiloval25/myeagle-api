import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActualizarPaisDTO, CrearPaisDTO, PaisDTO } from './dtos/pais.dto';
import { PaisService } from './pais.service';

@ApiTags('Paises')
@Controller('pais')
export class PaisController {
  constructor(private readonly paisesService: PaisService) {}

  @Get()
  async obtenerTodos() {
    return await this.paisesService.obtenerTodos();
  }

  @Get('/buscar/:campo/:valor')
  async buscar(@Param('campo') campo: string, @Param('valor') valor: any) {
    return await this.paisesService.buscar(campo, valor);
  }

  @Get('/id/:paisId')
  async obtenerPaisPorId(@Param('paisId') paisId: string) {
    return await this.paisesService.obtenerPorID(paisId);
  }

  @Get('/codigo/:codigo')
  async obtenerPaisPorCodigo(@Param('codigo') codigo: string) {
    return await this.paisesService.obtenerPaisPorCodigo(codigo);
  }

  @Get('/validar-codigo/:codigo')
  async validarCodigoDelPais(@Param('codigo') codigo: string) {
    return await this.paisesService.validarPaisPorCodigo(codigo);
  }

  @Post()
  async crearPais(@Body() pais: CrearPaisDTO) {
    return await this.paisesService.crearPais(pais);
  }

  @Put(':paisId')
  async actualizarPais(
    @Param('paisId') paisId: string,
    @Body() pais: ActualizarPaisDTO,
  ) {
    return await this.paisesService.actualizarPais(paisId, pais);
  }

  @Delete(':paisId')
  async eliminarPais(@Param('paisId') paisId: string) {
    return await this.paisesService.eliminarPais(paisId);
  }
}
