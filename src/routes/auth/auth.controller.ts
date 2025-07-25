import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto'
import { TransformInterceptor } from 'src/shared/interceptor/transform.interceptor'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseInterceptors(TransformInterceptor)
  // @SerializeOptions({ type: RegisterBodyDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    console.log('onRegister...')

    return new RegisterResDTO(await this.authService.register(body))
  }
  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    console.log('onLogin...')
    return new LoginResDTO(await this.authService.login(body))
  }
}
