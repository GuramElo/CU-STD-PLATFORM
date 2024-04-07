import { inject, Injectable } from '@angular/core';
import { ENV_TOKEN_SHARED, EnvironmentInterface } from './';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public readonly config: EnvironmentInterface = inject(ENV_TOKEN_SHARED);
}
