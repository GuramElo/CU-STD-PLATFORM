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
      host: 'db', // Use the Docker service name as the host
      port: 5432, // Use the internal Docker port for PostgreSQL
      username: 'jigar',
      password: 'mysecretpassword',
      database: 'mydb', // Ensure this matches the DB name given in Docker Compose
      synchronize: true,
      autoLoadEntities: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 8080,
    //   username: 'jigar',
    //   password: 'mysecretpassword',
    //   database: 'jigar',
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
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
