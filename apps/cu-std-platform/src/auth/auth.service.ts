import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { createTransport } from 'nodemailer';
import { UserRepository } from '../db-config/repositories/user.repository';
import { CreateUserDto } from '../db-config/dtos/user.dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.userRepository.findOne({
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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    const newUser = await this.usersService.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    await this.sendVerificationEmail(newUser.email, otp);
    // Store OTP in database or a cache with an expiration time

    return newUser;
  }

  async sendVerificationEmail(email: string, otp: string) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    // Retrieve and check OTP from database or cache
    // Assuming you retrieve it correctly and compare:
    // if (otp === storedOtp) {
    //   await this.usersService.markEmailAsConfirmed(email);
    //   return true;
    // }
    return false;
  }
}
