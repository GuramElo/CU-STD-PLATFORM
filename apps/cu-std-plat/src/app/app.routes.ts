import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { CuLayoutComponent } from '../components/cu-layout/cu-layout.component';
export const appRoutes: Route[] = [
  {
    path: '',
    component: CuLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'cu-std-home',
            exposedModule: './Routes',
          }).then((f) => f['appRoutes']),
      },
      {
        path: 'forms',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'cu-std-forms',
            exposedModule: './Routes',
          }).then((f) => f['appRoutes']),
      },
      {
        path: 'ocr',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'cu-std-ocr',
            exposedModule: './Routes',
          }).then((f) => f['appRoutes']),
      },
    ],
  },
];
