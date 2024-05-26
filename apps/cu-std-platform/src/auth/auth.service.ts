import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../db-config/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.userRepository.findOne({
      where: { username },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const signed_token = this.jwtService.sign(payload);
    await this.usersRepository.userRepository.update(
      {
        username: user.username,
      },
      {
        refresh_token: signed_token,
      }
    );

    return {
      access_token: signed_token,
    };
  }
}
