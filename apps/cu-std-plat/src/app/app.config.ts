import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ENV_TOKEN_SHARED } from '@cu-std-shared';
import { envConfig } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: envConfig.isProd,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: ENV_TOKEN_SHARED,
      useValue: envConfig,
    },
    provideRouter(appRoutes),
    { provide: NZ_ICONS, useValue: icons },
    provideAnimations(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
