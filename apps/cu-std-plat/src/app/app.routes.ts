import { Route } from '@angular/router';
import { LayoutContainerComponent } from '../components/layout/layout-container.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
export const appRoutes: Route[] = [{
  component: LayoutContainerComponent,
  children: [{
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'cu-std-home',
        exposedModule: './Routes'
      }).then((f) => f.appRoutes)
  },
    {
      path: 'forms',
      loadChildren: () =>
        loadRemoteModule({
          type: 'manifest',
          remoteName: 'cu-std-forms',
          exposedModule: './Routes'
        }).then((f) => f.appRoutes)
    }
  ]
}];
