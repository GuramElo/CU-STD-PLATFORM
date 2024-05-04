import { Logger, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaPlatformModule } from '../db-config/social-media-platform.module';
import { SOCIAL_MEDIA_PLATFORM_MODELS } from '../db-config/models';

@Module({
  imports: [
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
      database: 'cu_std-platform',
      entities: [...SOCIAL_MEDIA_PLATFORM_MODELS],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SocialMediaPlatformModule,
  ],
})
export class AppModule {
  constructor() {
    Logger.log(`asdasdasd`);
  }
}
//
