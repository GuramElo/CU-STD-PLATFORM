import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeEntryComponent } from './components/home-entry/home-entry.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeEntryComponent,
      },
    ],
  },
];
