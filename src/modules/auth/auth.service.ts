import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    // TODO: compare password hashes
    if (user?.hashedPassword !== password) throw new UnauthorizedException();
    return await this.generateTokensPair({ sub: user.id });
  }

  private async generateTokensPair(payload: Record<string, any>) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'secret', //TODO: to env file
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'secret', //TODO: to env file
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }
}
