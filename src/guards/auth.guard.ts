import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    const token = header?.split(' ')?.[1];

    if (!token) throw new UnauthorizedException('No token in headers');

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });
      request['userId'] = decoded.sub;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Error when token decoding');
    }
  }
}
