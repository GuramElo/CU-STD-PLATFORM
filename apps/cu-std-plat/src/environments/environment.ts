//replaced on the run
import { EnvironmentInterface } from '@cu-std-shared';
import { envConfig as defaultEnvConfig } from './environment.development';

export const envConfig: EnvironmentInterface = {
  ...defaultEnvConfig,
};
