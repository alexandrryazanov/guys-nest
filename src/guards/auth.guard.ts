import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT, JWT_SECRET_KEY, MY_USER_ID } from '@/constants';
import { DecodedPayload, TokenType } from '@/types/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (
      this.configService.get(ENVIRONMENT) === 'local' &&
      this.configService.get(MY_USER_ID)
    ) {
      request['userId'] = this.configService.get(MY_USER_ID);
      return true;
    }

    const header = request.headers['authorization']; // Bearer ,dkdfockkeoc,e
    const token = header?.split(' ')?.[1];

    if (!token) throw new UnauthorizedException('No token in headers');

    let decoded: DecodedPayload;
    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(JWT_SECRET_KEY),
      });

      request['userId'] = decoded.sub;
    } catch (e) {
      throw new UnauthorizedException('Error when token decoding');
    }

    if (decoded.type !== TokenType.ACCESS) {
      throw new UnauthorizedException('Incorrect token type');
    }

    return true;
  }
}
