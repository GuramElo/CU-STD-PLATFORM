import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { FormEntryContainerComponent } from './components/form-entry-container/form-entry-container.component';

export const appRoutes: Route[] = [{
component: AppComponent,
  children: [
    {
      path: '',
      component: FormEntryContainerComponent
    }
  ]
}];
