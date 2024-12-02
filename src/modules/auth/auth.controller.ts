import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, loginResponse } from './dto/login.dto';
import { Request, Response } from 'express';
import { RegisterUserDto } from '@/modules/auth/dto/register.dto';
import { AuthGuard } from '@/guards/auth.guard';

@ApiTags('Auth endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() { email, password }: RegisterUserDto) {
    return this.authService.register({
      email,
      password,
    });
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse(loginResponse)
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login({
      email,
      password,
    });
    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const token = request.cookies['refreshToken'];

    const { accessToken, refreshToken } = await this.authService.refresh(token);
    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Refresh token' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
  }
}
