import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {
  SOCIAL_MEDIA_PLATFORM_CONTROLLERS,
  SOCIAL_MEDIA_PLATFORM_REPOS,
} from '../db-config/social-media-platform.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { QueryFailedFilter } from '../handlers/custom-ecxeption-handler.filter';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { generateORMProvider } from '../db-config/functions/generateORMProvider.function';
import { MessagingModule } from '../messaging/messaging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOCIAL_MEDIA_PLATFORM_MODELS } from '../db-config/models';
import { AuthControllers, AuthImports, AuthProviders } from '../auth';
import { WebsocketService } from '../shared/signalling.service';

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
          fileSize: 25 * 1024 * 1024, //25mb
        },
      }),
    }),
    generateORMProvider(),
    TypeOrmModule.forFeature([...SOCIAL_MEDIA_PLATFORM_MODELS]),
    MessagingModule,
    ...AuthImports,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: QueryFailedFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RateLimiterGuard,
    // },
    ...SOCIAL_MEDIA_PLATFORM_REPOS,
    ...AuthProviders,
    WebsocketService,
  ],
  controllers: [...SOCIAL_MEDIA_PLATFORM_CONTROLLERS, ...AuthControllers],
})
export class AppModule {}
