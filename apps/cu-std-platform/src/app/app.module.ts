import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaPlatformModule } from '../db-config/social-media-platform.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { QueryFailedFilter } from '../handlers/custom-ecxeption-handler.filter';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    RateLimiterModule.register({
      points: 10, // Number of points
      duration: 60, // Per second
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
        limits: {
          fileSize: 25 * 1024 * 1024, //mb
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'jigar',
      password: 'mysecretpassword',
      database: 'jigar',
      synchronize: true,
      autoLoadEntities: true,
    }),
    SocialMediaPlatformModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
