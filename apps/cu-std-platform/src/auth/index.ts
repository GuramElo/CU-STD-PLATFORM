import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

export const AuthProviders = [JwtStrategy, AuthService];
export const AuthImports = [
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60m' },
  }),
];
export const AuthControllers = [AuthController];
