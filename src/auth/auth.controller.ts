import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioDecorator } from 'src/common/decorators/user.decorator';
import { UsuarioDTO, UsuarioLoginDTO } from 'src/usuario/dtos';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Body() login: UsuarioLoginDTO,
    @UsuarioDecorator() usuario: UsuarioDTO,
  ) {
    return this.authService.login(usuario);
  }
}
