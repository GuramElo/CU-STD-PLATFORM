import { InjectionToken } from '@angular/core';
import { EnvironmentInterface } from './interfaces';

export const ENV_TOKEN_SHARED: InjectionToken<EnvironmentInterface> =
  new InjectionToken('ENV_TOKEN_SHARED');
