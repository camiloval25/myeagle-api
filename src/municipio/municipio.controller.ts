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
import { ActualizarMunicipioDTO, CrearMunicipioDTO } from './dtos';
import { MunicipioService } from './municipio.service';

@ApiTags('Municipios')
@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Get()
  async obtenerTodos() {
    return await this.municipioService.obtenerTodos();
  }

  @Get('/buscar/:campo/:valor')
  async buscar(@Param('campo') campo: string, @Param('valor') valor: any) {
    return await this.municipioService.buscar(campo, valor);
  }

  @Get('/cargar-secuencia')
  async cargarSecuencia() {
    return await this.municipioService.cargarSecuencia();
  }


  @Get('/id/:municipioId')
  async obtenerPorId(@Param('municipioId') municipioId: string) {
    return await this.municipioService.obtenerPorId(municipioId);
  }

  @Get('/codigo/:codigo')
  async obtenerPorCodigo(@Param('codigo') codigo: string) {
    return await this.municipioService.obtenerPorCodigo(codigo);
  }

  @Post()
  async crearMunicipio(@Body() municipio: CrearMunicipioDTO) {
    return await this.municipioService.crearMunicipio(municipio);
  }

  @Put(':municipioId')
  async actualizarMunicipio(
    @Param('municipioId') municipioId: string,
    @Body() municipio: ActualizarMunicipioDTO,
  ) {
    return await this.municipioService.actualizarMunicipio(
      municipioId,
      municipio,
    );
  }

  @Delete(':municipioId')
  async eliminarMunicipio(@Param('municipioId') municipioId: string) {
    return await this.municipioService.eliminarMunicipio(municipioId);
  }
}
