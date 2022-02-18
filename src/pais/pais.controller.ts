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
import { ActualizarPaisDTO, PaisDTO } from './dtos/pais.dto';
import { PaisService } from './pais.service';

@ApiTags('Paises')
@Controller('pais')
export class PaisController {
  constructor(private readonly paisesService: PaisService) {}

  @Get()
  async obtenerTodos() {
    return await this.paisesService.obtenerTodos();
  }

  @Get('/id/:paisId')
  async obtenerPaisPorId(@Param('paisId') paisId: string) {
    return await this.paisesService.obtenerPorID(paisId);
  }

  @Get('/codigo/:codigo')
  async obtenerPaisPorCodigo(@Param('codigo') codigo: string) {
    return await this.paisesService.obtenerPaisPorCodigo(codigo);
  }

  @Post()
  async crearPais(@Body() pais: PaisDTO) {
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
