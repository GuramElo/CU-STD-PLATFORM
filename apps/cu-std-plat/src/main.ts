import { initFederation } from '@angular-architects/module-federation';
import { envConfig } from './environments/environment';
const mfeManifestPath = envConfig.isProd
  ? '/assets/mf.manifest.prod.json'
  : '/assets/mf.manifest.json';
initFederation(mfeManifestPath)
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
