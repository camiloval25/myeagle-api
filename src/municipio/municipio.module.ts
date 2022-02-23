import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  providers: [MunicipioService],
  controllers: [MunicipioController],
  exports: [MunicipioService],
})
export class MunicipioModule {}
