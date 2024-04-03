import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { CameraOcrComponent } from './components/camera-ocr/camera-ocr.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: CameraOcrComponent,
      },
    ],
  },
];
