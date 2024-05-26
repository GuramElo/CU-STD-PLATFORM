import {
  Body,
  ConflictException,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../db-config/dtos/user.dtos';
import { User } from '../db-config/models/UserModel';
import { UserRepository } from '../db-config/repositories/user.repository';
import { MessagingService } from '../messaging/messaging.service';
import { AuthService } from './auth.service';
import { UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserRepository,
    private readonly messagingService: MessagingService,
    private readonly authService: AuthService
  ) {}
  @Post('register')
  @UsePipes(new ValidationPipe()) // Enable validation for the request body
  async register(@Body() createUserDto: CreateUserDto): Promise<UpdateResult> {
    const userCacheInDb = await this.userService.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (
      createUserDto.otpCode &&
      userCacheInDb.otpCode === createUserDto.otpCode
    ) {
      try {
        const updateResult = await this.userService.userRepository.update(
          {
            username: createUserDto.username,
          },
          {
            isActive: true,
            otpCode: null,
          }
        );
        return updateResult;
      } catch (err) {
        Logger.log(
          JSON.stringify(err?.message),
          JSON.stringify(err?.constraint)
        );
        throw new HttpException(
          'Something went wrong creating user',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } else {
      throw new HttpException(
        'Something went wrong creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Post('pre-register')
  @UsePipes(new ValidationPipe()) // Enable validation for the request body
  async preRegister(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const otp = this.messagingService.generateRandomString(6);
      void this.messagingService.sendMail$({
        to: createUserDto.email,
        subject: 'OTP from CukBook',
        html: `Your Oto: <b>${otp} </b>`,
      });
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const createdUser = await this.userService.userRepository.create({
        ...createUserDto,
        isActive: false,
        otpCode: otp,
        password: hashedPassword,
      });
      await this.userService.userRepository.save(createdUser);
      setTimeout(async () => {
        try {
          const userEdition = await this.userService.userRepository.update(
            {
              username: createUserDto.username,
            },
            {
              otpCode: null,
            }
          );
        } catch (err) {
          console.log(err);
        }
      }, 120 * 1000);
      return createdUser;
    } catch (err) {
      if (err.code === '23505') {
        Logger.log(
          JSON.stringify(err?.message),
          JSON.stringify(err?.constraint),
          JSON.stringify(err?.detail)
        );
        throw new ConflictException(err?.detail);
      }
      Logger.log(JSON.stringify(err?.message), JSON.stringify(err?.constraint));
      throw new HttpException(
        'Something went wrong creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Post('sign-in')
  @UsePipes(new ValidationPipe()) // Enable validation for the request body
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    try {
      return this.authService.login(user);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
